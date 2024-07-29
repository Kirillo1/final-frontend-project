from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, MetaData, ARRAY, Boolean
from sqlalchemy.dialects.postgresql import ARRAY

from src.database import Base

metadata = MetaData()

accessories = Table(
    "accessory",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("phone_model", String, nullable=False),
    Column("description", String, nullable=False),
    Column("color", String, nullable=False),
    Column("guarantee", String, nullable=False),
    Column("manufacturer_country", String, nullable=False),
    Column("quantity", Integer, nullable=False),
    Column("price", Integer, nullable=False),
    Column("images", ARRAY(String), nullable=False),
    Column("is_verified", Boolean, default=False),
    Column("created_at", TIMESTAMP, default=datetime.utcnow),
)


class Accessory(Base):
    __tablename__ = "accessory"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    phone_model = Column(String, nullable=False)
    description = Column(String, nullable=False)
    color = Column(String, nullable=False)
    guarantee = Column(String, nullable=False)
    manufacturer_country = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)
    images = Column(ARRAY(String), nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
