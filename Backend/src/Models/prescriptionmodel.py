
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from src.Models.usermodel import Base

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    medication = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, nullable=False, default="Active")
    notes = Column(String, nullable=True)
