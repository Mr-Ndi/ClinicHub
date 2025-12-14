
from src.Models.medicalrecordmodel import MedicalRecord
from uuid import uuid4
from datetime import datetime

def create_medicalrecord(db, record: dict):
	rec = MedicalRecord(
		id=uuid4(),
		patient_id=record.get("patient_id"),
		doctor_id=record.get("doctor_id"),
		type=record.get("type"),
		title=record.get("title"),
		date=record.get("date", datetime.utcnow()),
		details=record.get("details")
	)
	db.add(rec)
	db.commit()
	db.refresh(rec)
	return rec

def get_medicalrecord(db, record_id: str):
	return db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()

def update_medicalrecord(db, record_id: str, record: dict):
	rec = db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()
	if not rec:
		return None
	for field, value in record.items():
		setattr(rec, field, value)
	db.commit()
	db.refresh(rec)
	return rec

def delete_medicalrecord(db, record_id: str):
	rec = db.query(MedicalRecord).filter(MedicalRecord.id == record_id).first()
	if not rec:
		return None
	db.delete(rec)
	db.commit()
	return rec

def list_medicalrecords(db):
	return db.query(MedicalRecord).all()
