from datetime import datetime
from pydantic import BaseModel

from typing import List, Optional


class AccessoryBase(BaseModel):
    name: str
    model_phone: str
    price: int


class AccessoryCreate(AccessoryBase):
    pass


class AccessoryUpdate(BaseModel):
    name: Optional[str] = None
    model_phone: Optional[str] = None
    price: Optional[int] = None


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
