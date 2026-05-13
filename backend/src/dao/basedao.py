from typing import TypeVar, Generic

from fastapi import HTTPException, UploadFile
from loguru import logger
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from starlette import status

from src.api.servicesS3.services import ImageService
from src.core.base import Base
from src.dao.models import Category

T = TypeVar("T", bound=Base)


class BaseDao(Generic[T]):
    model: type[T]

    def __init__(self, session: AsyncSession):
        self._session = session

    async def add(self, filters: BaseModel):
        try:
            filter_dict = filters.model_dump(exclude_unset=True)
            self._session.add(self.model(**filter_dict))
            await self._session.commit()
            logger.info(f"Данные в {self.model.__name__} добавлены успешно")
        except SQLAlchemyError as e:
            logger.error(f"❌ Ошибка SQLAlchemy в {self.model.__name__}: {e}")
            raise RuntimeError(f"Ошибка при работе с базой данных: {e}")
        except Exception as e:
            logger.error(f"Ошибка добавления в таблицу {self.model}: {e}")

    async def get_admin(self, filters: BaseModel | None = None):
        try:
            filter_dict = filters.model_dump(exclude_unset=True) if filters else {}
            query = select(self.model).filter_by(**filter_dict)
            result = await self._session.execute(query)
            logger.info(f"Данные из {self.model.__name__} с параметрами {filters} получены успешно")
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Ошибка получения данных из {self.model.__name__}: {e}")
            return None

    async def get_product_by_id_and_delete(self, product_id: int):
        try:
            query = select(self.model).where(self.model.id == product_id)
            result = await self._session.execute(query)
            product = result.scalar_one_or_none()  # ← Получаем объект!
            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Продукт с ID {product_id} не найден"
                )
                # 2. Сохраняем данные для ответа и удаления
            image_url = product.image_url
            # 3. Удаляем изображение из S3 (если есть)
            image_service = ImageService()
            image_deleted = await image_service.delete_image(image_url)

            if image_url and not image_deleted:
                # Логируем, но не прерываем удаление из БД
                logger.warning(f"Не удалось удалить изображение для продукта {product_id}: {image_url}")

            await self._session.delete(product)
            await self._session.commit()

            return product

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Ошибка удаления продукта ID {product_id}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка удаления: {str(e)}"
            )

    async def update_product_by_id(self, product_id: int, name: str = None, description: str = None,
                                   price: float = None, category_id: int = None, image: UploadFile = None):
        try:
            query = select(self.model).where(self.model.id == product_id)
            result = await self._session.execute(query)
            product = result.scalar_one_or_none()

            if not product:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Продукт с ID {product_id} не найден"
                )

            # 2. Сохраняем старые данные для ответа (как в удалении)
            product_name = product.name
            old_image_url = product.image_url

            # 3. Обновляем текстовые поля
            if name is not None:
                product.name = name
            if description is not None:
                product.description = description
            if price is not None:
                product.price = price
            if category_id is not None:
                product.category_id = category_id

            # 4. Обновляем изображение, если загружено новое (как в удалении)
            if image:
                image_service = ImageService()
                if old_image_url:
                    await image_service.delete_image(old_image_url)

                # Загружаем новое изображение
                image_url = await image_service.upload_product_image(image, product.category_id)
                if image_url:
                    product.image_url = image_url

            # 5. Сохраняем изменения (как в удалении - commit)
            await self._session.commit()
            await self._session.refresh(product)

            # 6. Возвращаем результат (как в удалении)
            return {
                "message": f"Продукт '{product_name}' успешно обновлен",
                "product": {
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "category_id": product.category_id,
                    "image_url": product.image_url
                }
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Ошибка обновления продукта ID {product_id}: {e}")
            await self._session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка обновления: {str(e)}"
            )

    async def get_all(self, ):
        try:
            query = select(self.model)
            result = await self._session.execute(query)
            logger.info(f"Данные из {self.model.__name__} получены успешно")
            contents = result.scalars().all()
            return contents
        except Exception as e:
            logger.error(f"Ошибка получения данных из таблицы {self.model}: {e}")
            return None

    async def get_products_by_category_name(self, filters: BaseModel):
        try:
            filter_dict = filters.model_dump(exclude_unset=True)
            category_query = select(Category).where(Category.name == filter_dict["name"])
            category_result = await self._session.execute(category_query)
            category = category_result.scalar_one_or_none()

            if not category:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Категория '{filter_dict["name"]}' не найдена"
                )

            # ✅ Убеждаемся, что category.id - это int
            category_id = int(category.id)  # Принудительное преобразование

            # Получаем продукты
            products_query = (
                select(self.model)
                .where(self.model.category_id == category_id)  # Используем преобразованное значение
                .offset(filter_dict["offset"])
                .limit(filter_dict["limit"])
            )

            products_result = await self._session.execute(products_query)
            products = products_result.scalars().all()

            # Получаем общее количество
            count_query = (
                select(func.count())
                .select_from(self.model)
                .where(self.model.category_id == category_id)
            )
            count_result = await self._session.execute(count_query)
            total = count_result.scalar()

            return {
                "products": products,
                "total": total,
                "offset": filter_dict["offset"],
                "limit": filter_dict["limit"],
                "has_more": filter_dict["offset"] + filter_dict["limit"] < total
            }

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Ошибка получения продуктов: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Ошибка: {str(e)}"
            )

    async def get_category_by_name(self, filters: BaseModel | None = None):
        try:
            filter_dict = filters.model_dump(exclude_unset=True) if filters else {}
            query = select(self.model).options(selectinload(self.model.products)).filter_by(**filter_dict)
            result = await self._session.execute(query)
            result = result.scalar_one_or_none()
            logger.info(f"Данные из {self.model.__name__} получены успешно")
            return result.products
        except Exception as e:
            logger.error(f"Ошибка получения данных из таблицы {self.model}: {e}")
            return []


