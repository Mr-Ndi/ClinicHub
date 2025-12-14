
from src.Models.billingmodel import Billing
from uuid import uuid4
from datetime import datetime

def create_billing(db, billing: dict):
	bill = Billing(
		id=uuid4(),
		patient_id=billing.get("patient_id"),
		appointment_id=billing.get("appointment_id"),
		amount=billing.get("amount"),
		status=billing.get("status", "Pending"),
		date=billing.get("date", datetime.utcnow()),
		description=billing.get("description")
	)
	db.add(bill)
	db.commit()
	db.refresh(bill)
	return bill

def get_billing(db, billing_id: str):
	return db.query(Billing).filter(Billing.id == billing_id).first()

def update_billing(db, billing_id: str, billing: dict):
	bill = db.query(Billing).filter(Billing.id == billing_id).first()
	if not bill:
		return None
	for field, value in billing.items():
		setattr(bill, field, value)
	db.commit()
	db.refresh(bill)
	return bill

def delete_billing(db, billing_id: str):
	bill = db.query(Billing).filter(Billing.id == billing_id).first()
	if not bill:
		return None
	db.delete(bill)
	db.commit()
	return bill

def list_billings(db):
	return db.query(Billing).all()
