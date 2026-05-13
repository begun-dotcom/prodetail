from typing import List, Optional

from starlette import status
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from src.api.routers.schemas import TokenResponse, LoginRequest, AdminLogin, AddProduct, CategorySchemas, \
    CategoryNameSchemas, ProductResponse
from src.api.routers.utils import get_current_user, create_access_token
from src.api.servicesS3.services import ImageService
from src.core.database import SessionDep
from src.dao.dao import UserDao, ProductDao, CategoryDao


admin_router = APIRouter(prefix="/api", tags=["Admin"])

@admin_router.get("/admin/verify")
async def verify_auth(current_user = Depends(get_current_user)):
    return {
        "valid": True,
        "user": {
            "username": current_user.login,
            "role": current_user.role,

        }
    }



@admin_router.post("/admin/login", response_model=TokenResponse)
async def login(request: LoginRequest, session : SessionDep):
    try:
        user = await UserDao(session=session).get_admin(AdminLogin(login=request.username,
                                                                   password = request.password))
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неверный логин или пароль"
            )
        user_role = user.role
        user_login = user.login
        # Создаем токен
        token, expires_at = create_access_token(
            data={"sub": user_login, "role": user_role}
        )

        return TokenResponse(
            token=token,
            username=user_login,
            role=user_role,  # <-- Используйте полученную роль
            expires_at=expires_at.isoformat()
        )
    except HTTPException:
        raise
    except Exception as e:
        print(f"Ошибка при входе: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Внутренняя ошибка сервера"
        )

@admin_router.post("/admin/products")
async def add_product(session : SessionDep, name: str = Form(...), description: str = Form(...),price: float = Form(...),
                       category_id : int = Form(...), image: UploadFile = File(None), current_user = Depends(get_current_user)):
    try:
        if current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещен. Требуются права администратора"
            )
        image_url = ''
        if image and image.size > 0:
            image_service = ImageService()
            image_url = await image_service.upload_product_image(image, category_id)
            if not image_url:
                raise HTTPException(400, "Не удалось загрузить изображение")
        add_new_product = AddProduct(name=name,description=description, price=price,
                                 category_id = category_id, image_url=image_url)
        await ProductDao(session=session).add(add_new_product)
        return {
            "message": "Продукт успешно создан"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка сервера: {str(e)}"
        )


@admin_router.get("/admin/category", response_model=List[CategorySchemas])
async def get_category(session : SessionDep):
    try:
        category = await CategoryDao(session=session).get_all()
        return category
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка сервера: {str(e)}"
        )

@admin_router.get("/admin/category/{name}", response_model=List[ProductResponse])
async def get_category(name : str, session : SessionDep):
    try:
        category = await CategoryDao(session=session).get_category_by_name(CategoryNameSchemas(name=name))
        return category

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка сервера: {str(e)}"
        )


@admin_router.delete("/admin/products/{product_id}")
async def delete_product(product_id: int,session: SessionDep,current_user = Depends(get_current_user)
):

    try:
        if current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещен. Требуются права администратора"
            )
        product_delete = await ProductDao(session=session).get_product_by_id_and_delete(product_id=product_id)
        return {"message": f"Продукт '{product_delete.name}' успешно удален"}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка удаления: {str(e)}"
        )


@admin_router.put("/admin/products/{product_id}")
async def update_product(
        product_id: int,
        session: SessionDep,
        current_user = Depends(get_current_user),
        name: Optional[str] = Form(None),
        description: Optional[str] = Form(None),
        price: Optional[float] = Form(None),
        category_id: Optional[int] = Form(None),
        image: Optional[UploadFile] = File(None),
):
    try:
        if current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Доступ запрещен. Требуются права администратора"
            )
        result = await ProductDao(session=session).update_product_by_id(
            product_id=product_id,
            name=name,
            description=description,
            price=price,
            category_id=category_id,
            image=image
        )

        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Ошибка обновления: {str(e)}")