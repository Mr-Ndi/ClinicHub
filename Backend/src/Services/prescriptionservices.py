
from src.Models.prescriptionmodel import Prescription
from uuid import uuid4
from datetime import datetime

def create_prescription(db, prescription: dict):
	presc = Prescription(
		id=uuid4(),
		patient_id=prescription.get("patient_id"),
		doctor_id=prescription.get("doctor_id"),
		medication=prescription.get("medication"),
		dosage=prescription.get("dosage"),
		duration=prescription.get("duration"),
		date=prescription.get("date", datetime.utcnow()),
		status=prescription.get("status", "Active"),
		notes=prescription.get("notes")
	)
	db.add(presc)
	db.commit()
	db.refresh(presc)
	return presc

def get_prescription(db, prescription_id: str):
	return db.query(Prescription).filter(Prescription.id == prescription_id).first()

def update_prescription(db, prescription_id: str, prescription: dict):
	presc = db.query(Prescription).filter(Prescription.id == prescription_id).first()
	if not presc:
		return None
	for field, value in prescription.items():
		setattr(presc, field, value)
	db.commit()
	db.refresh(presc)
	return presc

def delete_prescription(db, prescription_id: str):
	presc = db.query(Prescription).filter(Prescription.id == prescription_id).first()
	if not presc:
		return None
	db.delete(presc)
	db.commit()
	return presc

def list_prescriptions(db):
	return db.query(Prescription).all()
