from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import uuid

Base = declarative_base()

class Billing(Base):
    __tablename__ = "billings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    appointment_id = Column(UUID(as_uuid=True), ForeignKey("appointments.id"), nullable=True)
    amount = Column(Float, nullable=False)
    status = Column(String, nullable=False, default="Pending")
    date = Column(DateTime, default=datetime.utcnow)
    description = Column(String, nullable=True)
