
from src.Models.appointmentmodel import Appointment
from uuid import uuid4
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError, OperationalError, IntegrityError, ProgrammingError
from fastapi import HTTPException, status

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
	try:
		return db.query(Appointment).all()
	except (OperationalError, ProgrammingError) as e:
		# Catch both OperationalError and ProgrammingError (which includes UndefinedTable)
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		print(f"Database error in list_appointments: {error_msg}")  # Debug log
		if "relation" in error_msg.lower() and "does not exist" in error_msg.lower():
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail="Database table 'appointments' does not exist. Please run the database setup script or contact the administrator."
			)
		else:
			raise HTTPException(
				status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
				detail=f"Database error while fetching appointments: {error_msg}. Please contact support."
			)
	except SQLAlchemyError as e:
		error_msg = str(e.orig) if hasattr(e, 'orig') else str(e)
		print(f"SQLAlchemyError in list_appointments: {error_msg}")  # Debug log
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail="Failed to retrieve appointments. Please try again later."
		)
	except Exception as e:
		import traceback
		print(f"Unexpected error in list_appointments: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())  # Debug log
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"An unexpected error occurred while fetching appointments: {str(e)}"
		)
