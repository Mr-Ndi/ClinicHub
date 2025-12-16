from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.prescriptionController import (
	create_prescription_controller,
	get_prescription_controller,
	update_prescription_controller,
	delete_prescription_controller,
	list_prescriptions_controller
)
from src.Utils.db import get_db

prescriptionRouter = APIRouter(prefix="/api/prescriptions", tags=["Prescriptions"])

@prescriptionRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_prescription(prescription: dict = Body(...), db: Session = Depends(get_db)):
	return create_prescription_controller(db, prescription)

@prescriptionRouter.get("/{prescription_id}")
def get_prescription(prescription_id: str, db: Session = Depends(get_db)):
	return get_prescription_controller(db, prescription_id)

@prescriptionRouter.put("/{prescription_id}")
def update_prescription(prescription_id: str, prescription: dict = Body(...), db: Session = Depends(get_db)):
	return update_prescription_controller(db, prescription_id, prescription)

@prescriptionRouter.delete("/{prescription_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_prescription(prescription_id: str, db: Session = Depends(get_db)):
	return delete_prescription_controller(db, prescription_id)

@prescriptionRouter.get("/")
def list_prescriptions(db: Session = Depends(get_db)):
	return list_prescriptions_controller(db)
