
from sqlalchemy import Column, String, Integer, Float, Date
from sqlalchemy.ext.declarative import declarative_base
import uuid
from sqlalchemy.dialects.postgresql import UUID

from src.Models.usermodel import Base

class StockItem(Base):
    __tablename__ = "stock_items"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    category = Column(String, nullable=True)
    quantity = Column(Integer, nullable=False, default=0)
    unit = Column(String, nullable=True)
    supplier = Column(String, nullable=True)
    cost_per_unit = Column(Float, nullable=True, default=0.0)
    expiry_date = Column(Date, nullable=True)
    location = Column(String, nullable=True)
    description = Column(String, nullable=True)
    min_stock_level = Column(Integer, nullable=False, default=0)
