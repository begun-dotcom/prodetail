from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, relationship, mapped_column

from src.core.base import Base


class User(Base):
    login: Mapped[str]
    password: Mapped[str]
    role: Mapped[str]

    def __repr__(self) -> str:
        return f"User(login={self.login}, role={self.role})"


class Category(Base):
    name: Mapped[str]
    products: Mapped[List["Product"]] = relationship(
        back_populates="category",
        cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Category(name={self.name})"


class Product(Base):
    name: Mapped[str]
    description: Mapped[str]
    price: Mapped[float]
    image_url: Mapped[str | None]
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    category: Mapped["Category"] = relationship(back_populates="products")


    def __repr__(self) -> str:
        return f"Product(name={self.name}, price={self.price})"

