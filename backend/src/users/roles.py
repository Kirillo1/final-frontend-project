from fastapi import APIRouter, Depends, status

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from typing import List

from .schemas import RoleCreate, RoleRead
from .models import Role

from src.database import get_async_session

router = APIRouter()


@router.post("/", response_model=RoleRead, status_code=status.HTTP_201_CREATED)
async def create_role(role: RoleCreate, db: AsyncSession = Depends(get_async_session)):
    db_role = Role(name=role.name, permissions=role.permissions)
    db.add(db_role)
    await db.commit()
    await db.refresh(db_role)
    return db_role


@router.get("/", response_model=List[RoleRead])
async def read_roles(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_async_session)):
    result = await db.execute(select(Role).offset(skip).limit(limit))
    roles = result.scalars().all()
    return roles
