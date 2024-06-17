from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.database import get_async_session

from src.smartphone.models import Smartphone as SmartphoneModel
from src.smartphone.schemas import SmartphoneCreate, ResponseModel, SingleSmartphoneResponseModel

router = APIRouter(
    prefix="/smartphones",
    tags=["Smartphone"]
)


@router.get("/", response_model=ResponseModel)
async def get_smartphones(session: AsyncSession = Depends(get_async_session)):
    try:
        query = await session.execute(select(SmartphoneModel))
        all_smartphones = query.scalars().all()
        return {
            "status": "success",
            "data": all_smartphones,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })


@router.post("/add", response_model=SingleSmartphoneResponseModel)
async def add_smartphone(new_smartphone: SmartphoneCreate, session: AsyncSession = Depends(get_async_session)):
    try:
        new_smartphone_obj = SmartphoneModel(**new_smartphone.dict())
        session.add(new_smartphone_obj)
        await session.commit()
        await session.refresh(new_smartphone_obj)
        return {
            "status": "success",
            "data": new_smartphone_obj,
            "details": None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail={
            "status": "error",
            "data": None,
            "details": str(e)
        })
