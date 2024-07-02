from pydantic import BaseModel
from typing import Optional, List

from fastapi_users import schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    username: str
    role_id: int
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    username: str
    email: str
    password: str
    role_id: int
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    

class RoleCreate(BaseModel):
    name: str
    permissions: Optional[List[str]] = []


class RoleRead(BaseModel):
    id: int
    name: str
    permissions: List[str]

    class Config:
        orm_mode = True
