
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.appointmentservices import (
	create_appointment,
	get_appointment,
	update_appointment,
	delete_appointment,
	list_appointments
)

def create_appointment_controller(db: Session, appointment: dict):
	appt = create_appointment(db, appointment)
	if not appt:
		raise HTTPException(status_code=400, detail="Appointment creation failed")
	return appt

def get_appointment_controller(db: Session, appointment_id: str):
	appt = get_appointment(db, appointment_id)
	if not appt:
		raise HTTPException(status_code=404, detail="Appointment not found")
	return appt

def update_appointment_controller(db: Session, appointment_id: str, appointment: dict):
	updated = update_appointment(db, appointment_id, appointment)
	if not updated:
		raise HTTPException(status_code=404, detail="Appointment not found")
	return updated

def delete_appointment_controller(db: Session, appointment_id: str):
	deleted = delete_appointment(db, appointment_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Appointment not found")
	return {"message": "Appointment deleted"}

def list_appointments_controller(db: Session):
	return list_appointments(db)
