from fastapi import APIRouter, Depends, status, Body, HTTPException
from sqlalchemy.orm import Session
import traceback
import traceback
from src.Controllers.adminController import (
	list_doctors_controller,
	create_doctor_controller,
	update_doctor_controller,
	delete_doctor_controller,
	list_patients_controller,
	create_patient_controller,
	update_patient_controller,
	delete_patient_controller,
	get_admin_profile_controller,
	update_admin_profile_controller
)
from src.Utils.dependencies import require_admin, get_current_user
from src.Middlewares.userpydanticmodel import UserEdit
from src.Utils.db import get_db

adminRouter = APIRouter(prefix="/api/admin", tags=["Admin"])

# Doctor CRUD
@adminRouter.get("/doctors")
def list_doctors(db: Session = Depends(get_db)):
	"""
	Get all doctors.
	Returns a list of all doctors in the system.
	"""
	try:
		return list_doctors_controller(db)
	except HTTPException:
		raise
	except Exception as e:
		print(f"Unexpected error in list_doctors route: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to retrieve doctors: {str(e)}"
		)

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
	"""
	Get all patients.
	Returns a list of all patients in the system.
	"""
	try:
		return list_patients_controller(db)
	except HTTPException:
		raise
	except Exception as e:
		print(f"Unexpected error in list_patients route: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to retrieve patients: {str(e)}"
		)

@adminRouter.post("/patients", status_code=status.HTTP_201_CREATED)
def create_patient(patient: dict = Body(...), db: Session = Depends(get_db)):
	return create_patient_controller(db, patient)

@adminRouter.put("/patients/{patient_id}")
def update_patient(patient_id: str, patient: dict = Body(...), db: Session = Depends(get_db)):
	return update_patient_controller(db, patient_id, patient)

@adminRouter.delete("/patients/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: str, db: Session = Depends(get_db)):
	return delete_patient_controller(db, patient_id)

# Admin appointments endpoint
@adminRouter.get("/appointments")
def get_all_appointments(db: Session = Depends(get_db)):
	"""
	Get all appointments (Admin only).
	Returns a list of all appointments in the system.
	"""
	from src.Controllers.appointmentController import list_appointments_controller
	try:
		return list_appointments_controller(db)
	except HTTPException:
		raise
	except Exception as e:
		print(f"Unexpected error in get_all_appointments route: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(
			status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
			detail=f"Failed to retrieve appointments: {str(e)}"
		)

# Admin Profile endpoints
@adminRouter.get("/profile")
def get_admin_profile(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
	"""
	Get current admin's profile.
	Requires authentication.
	"""
	admin_id = current_user.get("user_id")
	return get_admin_profile_controller(db, admin_id)

@adminRouter.put("/profile")
def update_admin_profile(user_data: UserEdit = Body(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
	"""
	Update current admin's profile.
	Requires authentication.
	"""
	admin_id = current_user.get("user_id")
	updated = update_admin_profile_controller(db, admin_id, user_data)
	return {"message": "Profile updated successfully", "user": updated}
