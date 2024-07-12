from datetime import datetime
from pydantic import BaseModel, conint, constr
from typing import List, Optional


class SmartphoneBase(BaseModel):
    name: constr(max_length=200)
    model_phone: constr(max_length=200)
    color: constr(max_length=100)
    processor: constr(max_length=200)
    ram_capacity: conint(ge=1, le=128)
    memory_capacity: conint(ge=1, le=1024)
    battery_capacity: conint(ge=1000, le=10000)
    release_year: conint(ge=2000, le=2100)
    guarantee: constr(max_length=100)
    manufacturer_country: constr(max_length=100)
    description: constr(max_length=500)
    quantity: conint(ge=0)
    price: conint(ge=0)
    is_verified: bool
    images: List[str]


class SmartphoneCreate(SmartphoneBase):
    pass


class SmartphoneUpdate(BaseModel):
    name: str
    model_phone: str
    color: str
    processor: str
    ram_capacity: int
    memory_capacity: int
    battery_capacity: int
    release_year: int
    guarantee: str
    manufacturer_country: str
    description: str
    quantity: int
    price: int
    is_verified: bool
    images: List[str]


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
