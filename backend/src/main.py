from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware

from src.api.routers.admin_router import admin_router
from src.api.routers.user_router import user_router
from src.config import setting
from src.core.base import Base
from src.core.database import async_engine, create_admin_if_not_exists, \
    create_categories_if_not_exists
from src.dao.models import User, Category,Product


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    await create_admin_if_not_exists()
    await create_categories_if_not_exists()
    yield

app = FastAPI(lifespan=lifespan)


app.add_middleware(
    CORSMiddleware,
    allow_origins=setting.cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)


app.include_router(router=admin_router)
app.include_router(router=user_router)


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)