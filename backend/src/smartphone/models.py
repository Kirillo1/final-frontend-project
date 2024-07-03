from datetime import datetime
from sqlalchemy import Table, Column, Integer, String, TIMESTAMP, MetaData
from src.database import Base

metadata = MetaData()

smartphone = Table(
    "smartphone",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("model_phone", String, nullable=False),
    Column("price", Integer, nullable=False),
    Column("created_at", TIMESTAMP, default=datetime.utcnow),
)

class Smartphone(Base):
    __tablename__ = "smartphone"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    model_phone = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)
