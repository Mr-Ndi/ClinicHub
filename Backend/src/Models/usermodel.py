from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
import enum
from uuid import UUID
from datetime import datetime

Base = declarative_base()

class UserRole(enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    password = Column(String, nullable=True)
    role = Column(Enum(UserRole), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    profile_image = Column(String, nullable=True)
    specialization = Column(String, nullable=True)
    license_number = Column(String, nullable=True)
    oauth_provider = Column(String, nullable=True)
    oauth_provider_id = Column(String, nullable=True)