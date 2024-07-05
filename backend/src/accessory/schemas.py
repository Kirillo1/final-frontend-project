from datetime import datetime
from pydantic import BaseModel, conint, constr
from typing import List, Optional


class AccessoryBase(BaseModel):
    name: str
    model_phone: str
    description: str
    color: str
    guarantee: str
    manufacturer_country: str
    quantity: conint(ge=0)
    price: conint(ge=0)
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
