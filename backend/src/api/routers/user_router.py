from fastapi import APIRouter, HTTPException
from starlette import status

from src.api.routers.schemas import CategoryWithPage
from src.core.database import SessionDep
from src.dao.dao import ProductDao

user_router = APIRouter(prefix="/api", tags=["User"])

@user_router.get("/product_page")
async def get_product_by_id(session : SessionDep,category:str, page: int = 1, limit: int = 15 ):
    try:
        offset = (page - 1) * limit
        product = await ProductDao(session=session).get_products_by_category_name(CategoryWithPage(name = category, offset=offset, limit=limit))
        page = (page - 1) * limit
        return {
            "items": product.get("products"),
            "total": product.get("total"),
            "page": page,
            "pages": (product.get("total") + limit - 1) // limit
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка сервера: {str(e)}"
        )



