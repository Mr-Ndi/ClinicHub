from pydantic import BaseModel, EmailStr, constr, Field
from typing import Optional
from enum import Enum
from uuid import UUID

class UserRole(str, Enum):
	patient = "patient"
	doctor = "doctor"
	admin = "admin"

class UserRegister(BaseModel):
	name: str
	email: EmailStr
	phone: Optional[str] = None
	address: Optional[str] = None
	password: constr(min_length=6)
	role: UserRole
	profile_image: Optional[str] = None
	specialization: Optional[str] = None
	license_number: Optional[str] = None

class UserEdit(BaseModel):
	name: Optional[str] = None
	phone: Optional[str] = None
	address: Optional[str] = None
	profile_image: Optional[str] = None
	specialization: Optional[str] = None
	license_number: Optional[str] = None
