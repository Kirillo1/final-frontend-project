from datetime import datetime
from pydantic import BaseModel


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
