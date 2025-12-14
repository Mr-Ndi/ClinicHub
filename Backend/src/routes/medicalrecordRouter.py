from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.medicalrecordController import (
	create_medicalrecord_controller,
	get_medicalrecord_controller,
	update_medicalrecord_controller,
	delete_medicalrecord_controller,
	list_medicalrecords_controller
)
from src.Utils.db import get_db

medicalrecordRouter = APIRouter(prefix="/api/medical-records", tags=["MedicalRecords"])

@medicalrecordRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_medicalrecord(record: dict = Body(...), db: Session = Depends(get_db)):
	return create_medicalrecord_controller(db, record)

@medicalrecordRouter.get("/{record_id}")
def get_medicalrecord(record_id: str, db: Session = Depends(get_db)):
	return get_medicalrecord_controller(db, record_id)

@medicalrecordRouter.put("/{record_id}")
def update_medicalrecord(record_id: str, record: dict = Body(...), db: Session = Depends(get_db)):
	return update_medicalrecord_controller(db, record_id, record)

@medicalrecordRouter.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_medicalrecord(record_id: str, db: Session = Depends(get_db)):
	return delete_medicalrecord_controller(db, record_id)

@medicalrecordRouter.get("/")
def list_medicalrecords(db: Session = Depends(get_db)):
	return list_medicalrecords_controller(db)
