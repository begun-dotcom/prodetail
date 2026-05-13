from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from src.config import setting
from src.dao.models import User, Category

URL = setting.DATABASE_URL

async_engine = create_async_engine(url=URL,echo=True,future=True)

async_session_maker = async_sessionmaker(bind=async_engine, class_=AsyncSession)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

SessionDep = Annotated[AsyncSession, Depends(get_db)]


async def create_admin_if_not_exists():
    try:
        async with async_session_maker() as session:
            result = await session.execute(
                select(User).where(User.role == "admin")
            )
            admin = result.scalar_one_or_none()

            if not admin:
                admin = User(
                    login="admin",
                    password="Qwerty",  # В реальности хешируйте!
                    role="admin"
                )
                session.add(admin)
                await session.commit()
                print("✅ Создан администратор через ORM")
            else:
                print("ℹ️ Администратор уже существует")
    except Exception as e:
        print(f"Ошибка в create_admin_if_not_exists: {e}")


async def create_categories_if_not_exists():
    try:
        categories = ["Питбайки", "Электровелосипеды", "Запчасти"]
        async with async_session_maker() as session:
            for cat_name in categories:
                result = await session.execute(
                    select(Category).where(Category.name == cat_name)
                )
                category = result.scalar_one_or_none()

                if not category:
                    session.add(Category(name=cat_name))
                    print(f"✅ Создана категория: {cat_name}")

            await session.commit()
            print("✅ Все категории созданы")
    except Exception as e:
        print(f"Ошибка в create_categories_if_not_exists: {e}")
