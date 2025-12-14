from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.adminController import (
	list_doctors_controller,
	create_doctor_controller,
	update_doctor_controller,
	delete_doctor_controller,
	list_patients_controller,
	create_patient_controller,
	update_patient_controller,
	delete_patient_controller
)
from src.Utils.db import get_db

adminRouter = APIRouter(prefix="/api/admin", tags=["Admin"])

# Doctor CRUD
@adminRouter.get("/doctors")
def list_doctors(db: Session = Depends(get_db)):
	return list_doctors_controller(db)

@adminRouter.post("/doctors", status_code=status.HTTP_201_CREATED)
def create_doctor(doctor: dict = Body(...), db: Session = Depends(get_db)):
	return create_doctor_controller(db, doctor)

@adminRouter.put("/doctors/{doctor_id}")
def update_doctor(doctor_id: str, doctor: dict = Body(...), db: Session = Depends(get_db)):
	return update_doctor_controller(db, doctor_id, doctor)

@adminRouter.delete("/doctors/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doctor(doctor_id: str, db: Session = Depends(get_db)):
	return delete_doctor_controller(db, doctor_id)

# Patient CRUD
@adminRouter.get("/patients")
def list_patients(db: Session = Depends(get_db)):
	return list_patients_controller(db)

@adminRouter.post("/patients", status_code=status.HTTP_201_CREATED)
def create_patient(patient: dict = Body(...), db: Session = Depends(get_db)):
	return create_patient_controller(db, patient)

@adminRouter.put("/patients/{patient_id}")
def update_patient(patient_id: str, patient: dict = Body(...), db: Session = Depends(get_db)):
	return update_patient_controller(db, patient_id, patient)

@adminRouter.delete("/patients/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: str, db: Session = Depends(get_db)):
	return delete_patient_controller(db, patient_id)
