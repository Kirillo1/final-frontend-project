from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from src.database import get_async_session

from src.accessory.models import Accessory as AccessoryModel
from src.accessory.schemas import (AccessoryCreate, ResponseModel,
                                    SingleAccessoryResponseModel, AccessoryUpdate)


router = APIRouter()


@router.get("/", response_model=ResponseModel)
async def read_accessories(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_async_session)):
    try:
        result = await db.execute(select(AccessoryModel).offset(skip).limit(limit))
        accessories = result.scalars().all()
        return {
            "status": "success",
            "data": accessories,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.post("/add", response_model=SingleAccessoryResponseModel, status_code=status.HTTP_201_CREATED)
async def create_accessory(accessory: AccessoryCreate, db: AsyncSession = Depends(get_async_session)):
    try:
        db_accessory = AccessoryModel(
            name=accessory.name, model_phone=accessory.model_phone,
            color=accessory.color, description=accessory.description,
            guarantee=accessory.guarantee, manufacturer_country=accessory.manufacturer_country,
            quantity=accessory.quantity, price=accessory.price, images=accessory.images
        )
        db.add(db_accessory)
        await db.commit()
        await db.refresh(db_accessory)
        return {
            "status": "success",
            "data": db_accessory,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.delete("/{accessory_id}", response_model=ResponseModel)
async def delete_accessory(accessory_id: int, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(AccessoryModel).where(
            AccessoryModel.id == accessory_id)
        result = await session.execute(query)
        accessory = result.scalar_one_or_none()

        if accessory is None:
            raise HTTPException(status_code=404, detail="Accessory not found")

        await session.execute(delete(AccessoryModel).where(AccessoryModel.id == accessory_id))
        await session.commit()

        return {
            "status": "success",
            "data": [],
            "details": f"Аксессуар с Id:{accessory_id} удален"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.put("/{accessory_id}", response_model=SingleAccessoryResponseModel)
async def update_accessory(accessory_id: int, updated_accessory: AccessoryUpdate, session: AsyncSession = Depends(get_async_session)):
    try:
        query = select(AccessoryModel).where(
            AccessoryModel.id == accessory_id)
        result = await session.execute(query)
        accessory = result.scalar_one_or_none()

        if accessory is None:
            raise HTTPException(status_code=404, detail="Accessory not found")

        updated_data = updated_accessory.dict(exclude_unset=True)

        invalid_fields = {key: value for key, value in updated_data.items() if value in [
            None, "", 0]}

        if invalid_fields:
            invalid_fields_list = ', '.join(invalid_fields.keys())
            raise HTTPException(
                status_code=400,
                detail=f"The following fields cannot be empty or zero: {invalid_fields_list}"
            )

        for key, value in updated_data.items():
            if value not in [None, "", 0]:
                setattr(accessory, key, value)

        await session.commit()
        await session.refresh(accessory)

        return {
            "status": "success",
            "data": accessory,
            "details": None
        }
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })
