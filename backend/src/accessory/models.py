from datetime import datetime
from sqlalchemy import Column, Integer, String, TIMESTAMP
from src.database import declarative_base

Base = declarative_base()


class Accessory(Base):
    __tablename__ = "accessories"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    model_phone = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
