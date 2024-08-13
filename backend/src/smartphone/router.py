from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from src.database import get_async_session

from src.users.models import User
from src.smartphone.models import Smartphone as SmartphoneModel
from src.smartphone.schemas import (SmartphoneCreate, ResponseModel,
                                    SingleSmartphoneResponseModel, SmartphoneUpdate,
                                    SmartphoneVerifyStatusUpdate)


router = APIRouter()


@router.get("/", response_model=ResponseModel)
async def read_smartphones(skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_async_session)):
    try:
        result = await db.execute(select(SmartphoneModel).offset(skip).limit(limit))
        smartphones = result.scalars().all()
        return {
            "status": "success",
            "data": smartphones,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.get("/{smartphone_id}", response_model=ResponseModel)
async def get_smartphone(smartphone_id: int, db: AsyncSession = Depends(get_async_session)):
    try:
        query = select(SmartphoneModel).where(
            SmartphoneModel.id == smartphone_id)
        result = await db.execute(query)
        smartphone = result.scalar_one_or_none()

        if smartphone is None:
            raise HTTPException(status_code=404, detail="Smartphone not found")

        return {
            "status": "success",
            "data": [smartphone],
            "details": None
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.post("/add", response_model=SingleSmartphoneResponseModel, status_code=status.HTTP_201_CREATED)
async def create_smartphone(smartphone: SmartphoneCreate, db: AsyncSession = Depends(get_async_session)):
    try:
        user = await db.execute(select(User).where(User.id == smartphone.user_id))
        user = user.scalar_one_or_none()
        print(smartphone.user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")

        db_smartphone = SmartphoneModel(
            name=smartphone.name,
            phone_model=smartphone.phone_model,
            color=smartphone.color,
            processor=smartphone.processor,
            ram_capacity=smartphone.ram_capacity,
            memory_capacity=smartphone.memory_capacity,
            battery_capacity=smartphone.battery_capacity,
            release_year=smartphone.release_year,
            guarantee=smartphone.guarantee,
            manufacturer_country=smartphone.manufacturer_country,
            description=smartphone.description,
            quantity=smartphone.quantity,
            price=smartphone.price,
            images=smartphone.images,
            user_id=smartphone.user_id
        )
        db.add(db_smartphone)
        await db.commit()
        await db.refresh(db_smartphone)
        return {
            "status": "success",
            "data": db_smartphone,
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

        updated_data = updated_smartphone.dict(exclude_unset=True)

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
                setattr(smartphone, key, value)

        await session.commit()
        await session.refresh(smartphone)

        return {
            "status": "success",
            "data": smartphone,
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


@router.put("/{smartphone_id}/verify", response_model=SingleSmartphoneResponseModel)
async def update_smartphone_verification_status(
    smartphone_id: int,
    update_data: SmartphoneVerifyStatusUpdate,
    session: AsyncSession = Depends(get_async_session)
):
    try:
        query = select(SmartphoneModel).where(
            SmartphoneModel.id == smartphone_id)
        result = await session.execute(query)
        smartphone = result.scalar_one_or_none()

        if smartphone is None:
            raise HTTPException(status_code=404, detail="Smartphone not found")

        # Обновление только статуса is_verified
        smartphone.is_verified = update_data.is_verified

        await session.commit()
        await session.refresh(smartphone)

        return {
            "status": "success",
            "data": smartphone,
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
