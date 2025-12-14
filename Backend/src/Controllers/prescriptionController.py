
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.prescriptionservices import (
	create_prescription,
	get_prescription,
	update_prescription,
	delete_prescription,
	list_prescriptions
)

def create_prescription_controller(db: Session, prescription: dict):
	presc = create_prescription(db, prescription)
	if not presc:
		raise HTTPException(status_code=400, detail="Prescription creation failed")
	return presc

def get_prescription_controller(db: Session, prescription_id: str):
	presc = get_prescription(db, prescription_id)
	if not presc:
		raise HTTPException(status_code=404, detail="Prescription not found")
	return presc

def update_prescription_controller(db: Session, prescription_id: str, prescription: dict):
	updated = update_prescription(db, prescription_id, prescription)
	if not updated:
		raise HTTPException(status_code=404, detail="Prescription not found")
	return updated

def delete_prescription_controller(db: Session, prescription_id: str):
	deleted = delete_prescription(db, prescription_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Prescription not found")
	return {"message": "Prescription deleted"}

def list_prescriptions_controller(db: Session):
	return list_prescriptions(db)
