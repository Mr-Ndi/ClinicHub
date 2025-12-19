from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.billingController import (
	create_billing_controller,
	get_billing_controller,
	update_billing_controller,
	delete_billing_controller,
	list_billings_controller
)
from src.Utils.db import get_db
from src.Middlewares.userpydanticmodel import BillingCreate, BillingUpdate

billingRouter = APIRouter(prefix="/api/billing", tags=["Billing"])

@billingRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_billing(billing: BillingCreate, db: Session = Depends(get_db)):
	"""
	Create a new billing record.
	Requires patient_id, amount, and optionally appointment_id.
	"""
	billing_dict = {
		"patient_id": billing.patient_id,  # Pydantic converts string to UUID object
		"appointment_id": billing.appointment_id,  # Can be None
		"amount": billing.amount,
		"status": billing.status,
		"description": billing.description
	}
	return create_billing_controller(db, billing_dict)

@billingRouter.get("/{billing_id}")
def get_billing(billing_id: str, db: Session = Depends(get_db)):
	return get_billing_controller(db, billing_id)

@billingRouter.put("/{billing_id}")
def update_billing(billing_id: str, billing: BillingUpdate, db: Session = Depends(get_db)):
	"""
	Update an existing billing record.
	All fields are optional - only provided fields will be updated.
	"""
	billing_dict = billing.to_dict()
	return update_billing_controller(db, billing_id, billing_dict)

@billingRouter.delete("/{billing_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_billing(billing_id: str, db: Session = Depends(get_db)):
	return delete_billing_controller(db, billing_id)

@billingRouter.get("/")
def list_billings(db: Session = Depends(get_db)):
	return list_billings_controller(db)
