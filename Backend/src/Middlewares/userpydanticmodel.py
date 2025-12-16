
from pydantic import BaseModel, EmailStr, constr, Field
from typing import Optional
from enum import Enum
from uuid import UUID


class UserRole(str, Enum):
	patient = "patient"
	doctor = "doctor"
	admin = "admin"

class UserOAuthRegister(BaseModel):
	email: EmailStr
	name: Optional[str] = None
	profile_image: Optional[str] = None
	role: Optional[UserRole] = None

class UserRegister(BaseModel):
	name: str = Field("John Mubatiza", example="John Mubatiza")
	email: EmailStr = Field("user@doctor.com", example="user@doctor.com")
	phone: Optional[str] = Field("+250788888777", example="+250788888777")
	address: Optional[str] = Field("KN 123 St", example="KN 123 St")
	password: constr(min_length=6) = Field("Doctor#250", example="Doctor#250")
	role: UserRole = Field("patient", example="patient")
	profile_image: Optional[str] = Field("https://example.com/profile.jpg", example="https://example.com/profile.jpg")
	specialization: Optional[str] = Field("General Medicine", example="General Medicine")
	license_number: Optional[str] = Field("DOC123456", example="DOC123456")

class UserEdit(BaseModel):
	name: Optional[str] = None
	phone: Optional[str] = None
	address: Optional[str] = None
	profile_image: Optional[str] = None
	specialization: Optional[str] = None
	license_number: Optional[str] = None

class UserLogin(BaseModel):
	email: EmailStr = Field(..., example="admin@clinichub.com")
	password: str = Field(..., example="Admin#250")