from datetime import datetime
from pydantic import BaseModel, conint, constr
from typing import List, Optional


class AccessoryBase(BaseModel):
    name: constr(max_length=200)
    model_phone: constr(max_length=200)
    description: constr(max_length=500)
    color: constr(max_length=100)
    guarantee: constr(max_length=100)
    manufacturer_country: constr(max_length=100)
    quantity: conint(ge=0)
    price: conint(ge=0)
    is_verified: bool
    images: List[str]


class AccessoryCreate(AccessoryBase):
    pass


class AccessoryUpdate(BaseModel):
    name: Optional[str] = None
    model_phone: Optional[str] = None
    description: Optional[str] = None
    color: Optional[str] = None
    guarantee: Optional[str] = None
    manufacturer_country: Optional[str] = None
    quantity: Optional[int] = None
    price: Optional[int] = None
    is_verified: Optional[bool] = None
    images: Optional[List[str]] = None


class Accessory(AccessoryBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class ResponseModel(BaseModel):
    status: str
    data: List[Accessory]
    details: Optional[str]


class SingleAccessoryResponseModel(BaseModel):
    status: str
    data: Accessory
    details: Optional[str]

    class Config:
        orm_mode = True
