from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_async_session
from .schemas import UserRead
from .models import User
from .base_config import fastapi_users, get_user_manager

from .manager import UserManager
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get("/me", response_model=UserRead)
async def read_me(user: User = Depends(fastapi_users.current_user())):
    return user


@router.post("/auth/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    # Логика аннулирования токена
    # Например, удалите токен из базы данных или пометьте его как отозванный
    # В этом примере предполагается, что функция revoke_token аннулирует токен
    success = revoke_token(token)
    if not success:
        raise HTTPException(status_code=400, detail="Logout failed")
    return {"detail": "Successfully logged out"}


@router.get("/auth/all-users", response_model=List[UserRead])
async def get_all_users(
    user_manager: UserManager = Depends(get_user_manager),
    session: AsyncSession = Depends(get_async_session)
):
    users = await user_manager.get_all_users(session)
    return users
