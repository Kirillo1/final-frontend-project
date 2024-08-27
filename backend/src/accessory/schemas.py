from datetime import datetime
from pydantic import BaseModel, conint, constr
from typing import List, Optional


class AccessoryBase(BaseModel):
    name: constr(max_length=200)
    phone_model: constr(max_length=200)
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


class AccessoryVerifyStatusUpdate(BaseModel):
    is_verified: bool


class AccessoryUpdate(BaseModel):
    name: str
    phone_model: str
    description: str
    color: str
    guarantee: str
    manufacturer_country: str
    quantity: int
    price: int
    is_verified: bool
    images: List[str]


class Accessory(AccessoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ResponseModel(BaseModel):
    status: str
    data: List[Accessory]
    details: Optional[str]


class SingleAccessoryResponseModel(BaseModel):
    status: str
    data: Accessory
    details: Optional[str]

    class Config:
        from_attributes = True
