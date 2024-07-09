from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, MetaData, ARRAY, Boolean
from sqlalchemy.dialects.postgresql import ARRAY

from src.database import Base

metadata = MetaData()

smartphone = Table(
    "smartphone",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("model_phone", String, nullable=False),
    Column("color", String, nullable=False),
    Column("processor", String, nullable=False),
    Column("ram_capacity", Integer, nullable=False),
    Column("memory_capacity", Integer, nullable=False),
    Column("battery_capacity", Integer, nullable=False),
    Column("release_year", Integer, nullable=False),
    Column("guarantee", String, nullable=False),
    Column("manufacturer_country", String, nullable=False),
    Column("description", String, nullable=False),
    Column("quantity", Integer, nullable=False),
    Column("price", Integer, nullable=False),
    Column("images", ARRAY(String), nullable=False),
    Column("is_verified", Boolean, default=False),
    Column("created_at", TIMESTAMP, default=datetime.utcnow),
)


class Smartphone(Base):
    __tablename__ = "smartphone"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    model_phone = Column(String, nullable=False)
    color = Column(String, nullable=False)
    processor = Column(String, nullable=False)
    ram_capacity = Column(Integer, nullable=False)
    memory_capacity = Column(Integer, nullable=False)
    battery_capacity = Column(Integer, nullable=False)
    release_year = Column(Integer, nullable=False)
    guarantee = Column(String, nullable=False)
    manufacturer_country = Column(String, nullable=False)
    description = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    images = Column(ARRAY(String), nullable=False)
    price = Column(Integer, nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
