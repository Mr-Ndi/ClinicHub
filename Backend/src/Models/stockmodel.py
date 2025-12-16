
from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
import uuid
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()

class StockItem(Base):
    __tablename__ = "stock_items"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False, default=0)
    unit = Column(String, nullable=True)
    description = Column(String, nullable=True)
