from datetime import datetime
from pydantic import BaseModel

from typing import List, Optional


class SmartphoneBase(BaseModel):
    name: str
    model_phone: str
    price: int


class SmartphoneCreate(SmartphoneBase):
    pass


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
