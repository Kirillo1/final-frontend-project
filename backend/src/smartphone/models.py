from datetime import datetime
from sqlalchemy import MetaData, Table, Column, Integer, String, TIMESTAMP, ForeignKey


metadata = MetaData()

smartphones = Table(
    "smartphones",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("model_phone", String, nullable=False),
    Column("price", Integer, nullable=False),
    Column("created_at", TIMESTAMP, default=datetime.utcnow)
)


