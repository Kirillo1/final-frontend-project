from pydantic import BaseModel
from typing import Optional, List

from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    phone_number: str
    first_name: str
    last_name: str
    company_name: str
    role: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        from_attributes = True


class UserCreate(schemas.BaseUserCreate):
    phone_number: str
    first_name: str
    last_name: str
    company_name: str
    role: str
    email: str
    password: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False


class UserUpdate(schemas.BaseUserUpdate):
    pass

