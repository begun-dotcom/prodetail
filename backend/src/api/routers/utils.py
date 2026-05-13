from src.api.routers.schemas import AdminLog
from src.config import setting
from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, status, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt

from src.core.database import SessionDep
from src.dao.dao import UserDao

SECRET_KEY = setting.SECRET_KEY
ALGORITHM = setting.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
security = HTTPBearer()


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return None
        return payload
    except jwt.PyJWTError:
        return None

async def get_current_user(session : SessionDep,
                     credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный токен. Авторизируйтесь заново"
        )
    username = payload.get("sub")
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден"
        )
    user = await UserDao(session=session).get_admin(AdminLog(login=username))

    if not user:
        raise HTTPException(401, "Пользователь не найден")

    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    # 1. Берем данные пользователя
    to_encode = data.copy()

    # 2. Устанавливаем время жизни токена (24 часа)
    #expire = datetime.utcnow() + timedelta(hours=24)
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    # 3. Добавляем время истечения в токен
    to_encode.update({"exp": expire})

    # 4. Создаем JWT токен
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, expire