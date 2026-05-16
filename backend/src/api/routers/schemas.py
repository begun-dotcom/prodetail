from datetime import datetime
from typing import Optional

from pydantic import BaseModel, computed_field


class TokenResponse(BaseModel):
    token: str
    username: str
    role: str          # <-- Поле обязательно
    expires_at: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str

class AdminLog(BaseModel):
    login: str

class AdminLogin(BaseModel):
    login: str
    password: str


class CategorySchemas(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class CategoryNameSchemas(BaseModel):
    name: str

class ProductUpdateSchema(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None

class CategoryWithPage(BaseModel):
    name : str
    offset : int
    limit: int

class ProductResponse(BaseModel):
    """Схема для ответа с данными продукта"""
    id: int
    name: str
    description: str
    price: float
    category_id: int
    image_url: Optional[str] = None
    created: datetime
    updated: datetime

    class Config:
        from_attributes = True

class AddProduct(BaseModel):
    name: str
    description: str
    price: float
    category_id : int
    image_url : str


CATEGORY_NAMES = {
    "moto": "Мототехника",
    "electro": "Электротехника",
    "spare": "Автозапчасти",
    "quadro": "Квадроциклы",
    "computer": "Компьютеры",
    "service": "Автосервис",
}


class CategoryOut(BaseModel):
    id: int
    name: str

    @computed_field
    @property
    def display_name(self) -> str:
        return CATEGORY_NAMES.get(self.name, self.name)