from datetime import datetime
from typing import Optional

from pydantic import BaseModel


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


