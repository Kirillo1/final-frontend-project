from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from typing import List

from src.database import get_async_session

from src.smartphone.models import Smartphone as SmartphoneModel
from src.smartphone.schemas import SmartphoneCreate, Smartphone

router = APIRouter(
    prefix="/smartphones",
    tags=["Smartphone"]
)


@router.get("/", response_model=List[Smartphone])
async def get_smartphones(session: AsyncSession = Depends(get_async_session)):
    query = await session.execute(select(SmartphoneModel))
    all_smartphones = query.scalars().all()
    return all_smartphones


@router.post("/add", response_model=Smartphone)
async def add_smartphone(new_smartphone: SmartphoneCreate, session: AsyncSession = Depends(get_async_session)):
    new_smartphone_obj = SmartphoneModel(**new_smartphone.dict())
    session.add(new_smartphone_obj)
    await session.commit()
    await session.refresh(new_smartphone_obj)
    return new_smartphone_obj
