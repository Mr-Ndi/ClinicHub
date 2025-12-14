
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.billingservices import (
	create_billing,
	get_billing,
	update_billing,
	delete_billing,
	list_billings
)

def create_billing_controller(db: Session, billing: dict):
	bill = create_billing(db, billing)
	if not bill:
		raise HTTPException(status_code=400, detail="Billing creation failed")
	return bill

def get_billing_controller(db: Session, billing_id: str):
	bill = get_billing(db, billing_id)
	if not bill:
		raise HTTPException(status_code=404, detail="Billing not found")
	return bill

def update_billing_controller(db: Session, billing_id: str, billing: dict):
	updated = update_billing(db, billing_id, billing)
	if not updated:
		raise HTTPException(status_code=404, detail="Billing not found")
	return updated

def delete_billing_controller(db: Session, billing_id: str):
	deleted = delete_billing(db, billing_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Billing not found")
	return {"message": "Billing deleted"}

def list_billings_controller(db: Session):
	return list_billings(db)
