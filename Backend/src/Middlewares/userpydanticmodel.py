
from pydantic import BaseModel, EmailStr, constr, Field, field_validator, ConfigDict
from typing import Optional
from enum import Enum
from uuid import UUID
from datetime import date


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

class StockItemCreate(BaseModel):
	"""Pydantic model for creating stock items - accepts camelCase from frontend"""
	model_config = ConfigDict(
		populate_by_name=True,  # Allow both camelCase and snake_case
		json_schema_extra={
			"example": {
				"itemName": "Pracetamol500mg",
				"category": "Medication",
				"quantity": 200,
				"unit": "units",
				"minStockLevel": 20,
				"costPerUnit": 500,
				"expiryDate": "2026-12-12",
				"supplier": "Kagabo",
				"location": "Nyabihu",
				"description": "Hard workers"
			}
		}
	)
	
	itemName: str = Field(..., alias="itemName", description="Item name")
	category: str = Field(..., description="Item category")
	quantity: int = Field(..., ge=0, description="Stock quantity")
	unit: str = Field(..., description="Unit of measurement")
	minStockLevel: int = Field(..., alias="minStockLevel", ge=0, description="Minimum stock level")
	costPerUnit: float = Field(..., alias="costPerUnit", ge=0, description="Cost per unit")
	expiryDate: Optional[str] = Field(None, alias="expiryDate", description="Expiry date (YYYY-MM-DD, DD/MM/YYYY, etc.)")
	supplier: Optional[str] = Field(None, description="Supplier name")
	location: Optional[str] = Field(None, description="Storage location")
	description: Optional[str] = Field(None, description="Item description")
	
	def to_dict(self) -> dict:
		"""Convert to dictionary with snake_case keys for backend processing"""
		return {
			"name": self.itemName,
			"category": self.category,
			"quantity": self.quantity,
			"unit": self.unit,
			"min_stock_level": self.minStockLevel,
			"cost_per_unit": self.costPerUnit,
			"expiry_date": self.expiryDate,
			"supplier": self.supplier,
			"location": self.location,
			"description": self.description
		}

class StockItemUpdate(BaseModel):
	"""Pydantic model for updating stock items"""
	model_config = ConfigDict(populate_by_name=True)
	
	itemName: Optional[str] = Field(None, alias="itemName")
	category: Optional[str] = None
	quantity: Optional[int] = Field(None, ge=0)
	unit: Optional[str] = None
	minStockLevel: Optional[int] = Field(None, alias="minStockLevel", ge=0)
	costPerUnit: Optional[float] = Field(None, alias="costPerUnit", ge=0)
	expiryDate: Optional[str] = Field(None, alias="expiryDate")
	supplier: Optional[str] = None
	location: Optional[str] = None
	description: Optional[str] = None
	
	def to_dict(self) -> dict:
		"""Convert to dictionary with snake_case keys, excluding None values"""
		result = {}
		if self.itemName is not None:
			result["name"] = self.itemName
		if self.category is not None:
			result["category"] = self.category
		if self.quantity is not None:
			result["quantity"] = self.quantity
		if self.unit is not None:
			result["unit"] = self.unit
		if self.minStockLevel is not None:
			result["min_stock_level"] = self.minStockLevel
		if self.costPerUnit is not None:
			result["cost_per_unit"] = self.costPerUnit
		if self.expiryDate is not None:
			result["expiry_date"] = self.expiryDate
		if self.supplier is not None:
			result["supplier"] = self.supplier
		if self.location is not None:
			result["location"] = self.location
		if self.description is not None:
			result["description"] = self.description
		return result

class BillingCreate(BaseModel):
	"""Pydantic model for creating billing records"""
	model_config = ConfigDict(
		json_schema_extra={
			"example": {
				"patient_id": "123e4567-e89b-12d3-a456-426614174000",
				"appointment_id": "123e4567-e89b-12d3-a456-426614174001",
				"amount": 150.00,
				"status": "Pending",
				"description": "Consultation fee"
			}
		}
	)
	
	patient_id: UUID = Field(..., description="Patient UUID")
	appointment_id: Optional[UUID] = Field(None, description="Appointment UUID (optional)")
	amount: float = Field(..., ge=0, description="Billing amount (must be >= 0)")
	status: str = Field(default="Pending", description="Billing status (e.g., Pending, Paid, Cancelled)")
	description: Optional[str] = Field(None, description="Billing description")

class BillingUpdate(BaseModel):
	"""Pydantic model for updating billing records"""
	patient_id: Optional[UUID] = Field(None, description="Patient UUID")
	appointment_id: Optional[UUID] = Field(None, description="Appointment UUID")
	amount: Optional[float] = Field(None, ge=0, description="Billing amount (must be >= 0)")
	status: Optional[str] = Field(None, description="Billing status")
	description: Optional[str] = Field(None, description="Billing description")
	
	def to_dict(self) -> dict:
		"""Convert to dictionary, excluding None values"""
		result = {}
		if self.patient_id is not None:
			result["patient_id"] = self.patient_id  # Keep as UUID object
		if self.appointment_id is not None:
			result["appointment_id"] = self.appointment_id  # Keep as UUID object
		if self.amount is not None:
			result["amount"] = self.amount
		if self.status is not None:
			result["status"] = self.status
		if self.description is not None:
			result["description"] = self.description
		return result