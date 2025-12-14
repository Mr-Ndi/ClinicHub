from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.appointmentController import (
	create_appointment_controller,
	get_appointment_controller,
	update_appointment_controller,
	delete_appointment_controller,
	list_appointments_controller
)
from src.Utils.db import get_db

appointmentRouter = APIRouter(prefix="/api/appointments", tags=["Appointments"])

@appointmentRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_appointment(appointment: dict = Body(...), db: Session = Depends(get_db)):
	return create_appointment_controller(db, appointment)

@appointmentRouter.get("/{appointment_id}")
def get_appointment(appointment_id: str, db: Session = Depends(get_db)):
	return get_appointment_controller(db, appointment_id)

@appointmentRouter.put("/{appointment_id}")
def update_appointment(appointment_id: str, appointment: dict = Body(...), db: Session = Depends(get_db)):
	return update_appointment_controller(db, appointment_id, appointment)

@appointmentRouter.delete("/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_appointment(appointment_id: str, db: Session = Depends(get_db)):
	return delete_appointment_controller(db, appointment_id)

@appointmentRouter.get("/")
def list_appointments(db: Session = Depends(get_db)):
	return list_appointments_controller(db)
