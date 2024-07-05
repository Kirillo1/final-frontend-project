from datetime import datetime
from pydantic import BaseModel, conint, constr
from typing import List, Optional


class SmartphoneBase(BaseModel):
    name: str
    model_phone: str
    color: str
    processor: str
    ram_capacity: conint(ge=1, le=128)
    memory_capacity: conint(ge=1, le=1024)
    battery_capacity: conint(ge=1000, le=10000)
    release_year: conint(ge=2000, le=2100)
    guarantee: str
    manufacturer_country: str
    quantity: conint(ge=0)
    price: conint(ge=0)
    images: List[str]


class SmartphoneCreate(SmartphoneBase):
    pass


class SmartphoneUpdate(BaseModel):
    name: Optional[str] = None
    model_phone: Optional[str] = None
    color: Optional[str] = None
    processor: Optional[str] = None
    ram_capacity: Optional[int] = None
    memory_capacity: Optional[int] = None
    battery_capacity: Optional[int] = None
    release_year: Optional[int] = None
    guarantee: Optional[str] = None
    manufacturer_country: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[int] = None
    images: Optional[List[str]] = None


class Smartphone(SmartphoneBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class ResponseModel(BaseModel):
    status: str
    data: List[Smartphone]
    details: Optional[str]


class SingleSmartphoneResponseModel(BaseModel):
    status: str
    data: Smartphone
    details: Optional[str]

    class Config:
        orm_mode = True
