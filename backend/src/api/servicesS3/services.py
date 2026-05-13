import asyncio
import io
import uuid

from urllib.parse import urlparse
import certifi
from PIL import Image
import boto3
from botocore.client import Config
from fastapi import UploadFile, HTTPException
from loguru import logger

from src.config import setting


class ImageService:
    def __init__(self):
        self.MAX_SIZE = (1200, 1200)
        self.QUALITY = 85
        self.ALLOWED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif']
        self.public_url = setting.get_url_s3
        self.bucket_name = setting.BUCKET_NAME
        self.client = boto3.client(
                's3',
                endpoint_url=setting.ENDPOINT_URL,
                aws_access_key_id=setting.ACCESS_KEY,
                aws_secret_access_key=setting.SECRET_KEY_S3,
                region_name=setting.S3_REGION,  # ← Ваш регион
                config=Config(
                    signature_version='s3v4',
                    s3={'addressing_style': 'path'}
                ),
                verify=certifi.where()
                # ← для продакшн
                # verify=False
                # для разработки
            )


    async def upload_product_image(self, image: UploadFile, category_id: int) -> str | None:
        """Загрузка изображения в Selectel S3 с оптимизацией"""
        try:
            if not image or not image.filename:
                return None

            # Проверка формата
            file_ext = self._get_file_extension(image.filename)
            if file_ext not in self.ALLOWED_FORMATS:
                raise HTTPException(
                    status_code=400,
                    detail=f"Неподдерживаемый формат. Разрешены: {', '.join(self.ALLOWED_FORMATS)}"
                )

            # Оптимизация изображения
            optimized_data = await self._optimize_image(await image.read())

            # Генерация имени файла
            filename = f"products/{category_id}/{uuid.uuid4()}.webp"

            # Загрузка в S3 (синхронная операция в потоке)
            await asyncio.to_thread(
                self.client.put_object,
                Bucket=self.bucket_name,
                Key=filename,
                Body=optimized_data,
                ContentType='image/webp',
                Metadata={
                    'category-id': str(category_id),
                    'original-name': image.filename
                }
            )

            # Формируем URL
            return f"{setting.BUCKET_UUID}/{filename}"


        except HTTPException:
            raise
        except Exception as e:
            print(f"Ошибка загрузки в S3: {e}")
            return None

    async def _optimize_image(self, image_data: bytes) -> bytes:
        """Оптимизирует изображение"""
        try:
            # Открываем изображение
            pil_image = Image.open(io.BytesIO(image_data))

            # Конвертируем в RGB (для прозрачности)
            if pil_image.mode in ('RGBA', 'P'):
                pil_image = pil_image.convert('RGB')

            # Уменьшаем размер
            if pil_image.width > self.MAX_SIZE[0] or pil_image.height > self.MAX_SIZE[1]:
                pil_image.thumbnail(self.MAX_SIZE, Image.Resampling.LANCZOS)

            # Сохраняем в WebP
            output = io.BytesIO()
            pil_image.save(output, format='WEBP', quality=self.QUALITY, method=6, optimize=True)
            output.seek(0)

            return output.getvalue()

        except Exception as e:
            print(f"Ошибка оптимизации: {e}")
            raise

    def _get_file_extension(self, filename: str) -> str:
        """Получает расширение файла"""
        return '.' + filename.split('.')[-1].lower() if '.' in filename else ''


    def extract_key_from_url(self, image_url: str) -> str | None:
        try:
            parsed = urlparse(image_url)
            key = parsed.path.lstrip('/')
            return key if key else None
        except Exception as e:
            logger.error(f"Ошибка извлечения key из URL: {e}")
            return None

    async def delete_image(self, image_url: str) -> bool:
        if not image_url:
            logger.info("Нет URL изображения для удаления")
            return True
        try:
            key = self.extract_key_from_url(image_url)
            if not key:
                logger.warning(f"Не удалось извлечь key из URL: {image_url}")
                return False
            import asyncio
            await asyncio.to_thread(
                self.client.delete_object,
                Bucket=self.bucket_name,
                Key=key
            )
            logger.info(f"✅ Изображение удалено: {key}")
            return True

        except Exception as e:
            logger.error(f"Ошибка удаления изображения из S3: {e}")
            return False