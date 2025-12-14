
from src.Models.appointmentmodel import Appointment
from uuid import uuid4
from datetime import datetime

def create_appointment(db, appointment: dict):
	appt = Appointment(
		id=uuid4(),
		patient_id=appointment.get("patient_id"),
		doctor_id=appointment.get("doctor_id"),
		date=appointment.get("date", datetime.utcnow()),
		time=appointment.get("time"),
		status=appointment.get("status", "Upcoming"),
		type=appointment.get("type"),
		notes=appointment.get("notes")
	)
	db.add(appt)
	db.commit()
	db.refresh(appt)
	return appt

def get_appointment(db, appointment_id: str):
	return db.query(Appointment).filter(Appointment.id == appointment_id).first()

def update_appointment(db, appointment_id: str, appointment: dict):
	appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
	if not appt:
		return None
	for field, value in appointment.items():
		setattr(appt, field, value)
	db.commit()
	db.refresh(appt)
	return appt

def delete_appointment(db, appointment_id: str):
	appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
	if not appt:
		return None
	db.delete(appt)
	db.commit()
	return appt

def list_appointments(db):
	return db.query(Appointment).all()
