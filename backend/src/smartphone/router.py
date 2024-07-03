from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from src.database import get_async_session

from src.smartphone.models import Smartphone as SmartphoneModel
from src.smartphone.schemas import (SmartphoneCreate, ResponseModel,
                                    SingleSmartphoneResponseModel, SmartphoneUpdate)


router = APIRouter()


@router.get("/", response_model=ResponseModel)
async def read_roles(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_async_session)):
    try:
        result = await db.execute(select(SmartphoneModel).offset(skip).limit(limit))
        roles = result.scalars().all()
        return {
            "status": "success",
            "data": roles,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.post("/add", response_model=SingleSmartphoneResponseModel, status_code=status.HTTP_201_CREATED)
async def create_role(role: SmartphoneCreate, db: AsyncSession = Depends(get_async_session)):
    try:
        db_role = SmartphoneModel(
            name=role.name, model_phone=role.model_phone, price=role.price)
        db.add(db_role)
        await db.commit()
        await db.refresh(db_role)
        return {
            "status": "success",
            "data": db_role,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.delete("/{smartphone_id}", response_model=ResponseModel)
async def delete_smartphone(smartphone_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(SmartphoneModel).where(
            SmartphoneModel.id == smartphone_id)
        result = await session.execute(query)
        smartphone = result.scalar_one_or_none()

        if smartphone is None:
            raise HTTPException(status_code=404, detail="Smartphone not found")

        await session.execute(delete(SmartphoneModel).where(SmartphoneModel.id == smartphone_id))
        await session.commit()

        return {
            "status": "success",
            "data": [],
            "details": f"Смартфон с Id:{smartphone_id} удален"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.put("/{smartphone_id}", response_model=SingleSmartphoneResponseModel)
async def update_smartphone(smartphone_id: int, updated_smartphone: SmartphoneUpdate, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(SmartphoneModel).where(
            SmartphoneModel.id == smartphone_id)
        result = await session.execute(query)
        smartphone = result.scalar_one_or_none()

        if smartphone is None:
            raise HTTPException(status_code=404, detail="Smartphone not found")

        for key, value in updated_smartphone.dict(exclude_unset=True).items():
            setattr(smartphone, key, value)

        await session.commit()
        await session.refresh(smartphone)

        return {
            "status": "success",
            "data": smartphone,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })
