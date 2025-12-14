
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.admincrudservices import (
	list_doctors,
	create_doctor,
	update_doctor,
	delete_doctor,
	list_patients,
	create_patient,
	update_patient,
	delete_patient
)

def list_doctors_controller(db: Session):
	return list_doctors(db)

def create_doctor_controller(db: Session, doctor: dict):
	doc = create_doctor(db, doctor)
	if not doc:
		raise HTTPException(status_code=400, detail="Doctor creation failed")
	return doc

def update_doctor_controller(db: Session, doctor_id: str, doctor: dict):
	updated = update_doctor(db, doctor_id, doctor)
	if not updated:
		raise HTTPException(status_code=404, detail="Doctor not found")
	return updated

def delete_doctor_controller(db: Session, doctor_id: str):
	deleted = delete_doctor(db, doctor_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Doctor not found")
	return {"message": "Doctor deleted"}

def list_patients_controller(db: Session):
	return list_patients(db)

def create_patient_controller(db: Session, patient: dict):
	pat = create_patient(db, patient)
	if not pat:
		raise HTTPException(status_code=400, detail="Patient creation failed")
	return pat

def update_patient_controller(db: Session, patient_id: str, patient: dict):
	updated = update_patient(db, patient_id, patient)
	if not updated:
		raise HTTPException(status_code=404, detail="Patient not found")
	return updated

def delete_patient_controller(db: Session, patient_id: str):
	deleted = delete_patient(db, patient_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Patient not found")
	return {"message": "Patient deleted"}
