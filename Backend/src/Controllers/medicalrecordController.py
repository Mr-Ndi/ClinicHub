
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.medicalrecordservices import (
	create_medicalrecord,
	get_medicalrecord,
	update_medicalrecord,
	delete_medicalrecord,
	list_medicalrecords
)

def create_medicalrecord_controller(db: Session, record: dict):
	rec = create_medicalrecord(db, record)
	if not rec:
		raise HTTPException(status_code=400, detail="Medical record creation failed")
	return rec

def get_medicalrecord_controller(db: Session, record_id: str):
	rec = get_medicalrecord(db, record_id)
	if not rec:
		raise HTTPException(status_code=404, detail="Medical record not found")
	return rec

def update_medicalrecord_controller(db: Session, record_id: str, record: dict):
	updated = update_medicalrecord(db, record_id, record)
	if not updated:
		raise HTTPException(status_code=404, detail="Medical record not found")
	return updated

def delete_medicalrecord_controller(db: Session, record_id: str):
	deleted = delete_medicalrecord(db, record_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Medical record not found")
	return {"message": "Medical record deleted"}

def list_medicalrecords_controller(db: Session):
	return list_medicalrecords(db)
