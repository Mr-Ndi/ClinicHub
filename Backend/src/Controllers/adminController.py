
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.admincrudservices import (
	list_doctors,
	create_doctor,
	update_doctor,
	delete_doctor,
	list_patients,
	create_patient,
	update_patient,
	delete_patient
)

def list_doctors_controller(db: Session):
	try:
		doctors = list_doctors(db)
		# Convert SQLAlchemy objects to dictionaries
		result = []
		for doc in doctors:
			try:
				role_value = doc.role.value if hasattr(doc.role, 'value') else str(doc.role)
			except:
				role_value = str(doc.role) if doc.role else None
			
			result.append({
				"id": str(doc.id),
				"name": doc.name or "",
				"email": doc.email or "",
				"phone": doc.phone or "",
				"address": doc.address or "",
				"role": role_value,
				"profile_image": getattr(doc, 'profile_image', None),
				"specialization": getattr(doc, 'specialization', None),
				"license_number": getattr(doc, 'license_number', None),
			})
		return result
	except Exception as e:
		import traceback
		print(f"Error in list_doctors_controller: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(status_code=500, detail=f"Failed to retrieve doctors: {str(e)}")

def create_doctor_controller(db: Session, doctor: dict):
	doc = create_doctor(db, doctor)
	if not doc:
		raise HTTPException(status_code=400, detail="Doctor creation failed")
	# Convert SQLAlchemy object to dictionary
	return {
		"id": str(doc.id),
		"name": doc.name,
		"email": doc.email,
		"phone": doc.phone,
		"address": doc.address,
		"role": doc.role.value if hasattr(doc.role, 'value') else str(doc.role),
		"profile_image": getattr(doc, 'profile_image', None),
		"specialization": getattr(doc, 'specialization', None),
		"license_number": getattr(doc, 'license_number', None),
	}

def update_doctor_controller(db: Session, doctor_id: str, doctor: dict):
	updated = update_doctor(db, doctor_id, doctor)
	if not updated:
		raise HTTPException(status_code=404, detail="Doctor not found")
	# Convert SQLAlchemy object to dictionary
	return {
		"id": str(updated.id),
		"name": updated.name,
		"email": updated.email,
		"phone": updated.phone,
		"address": updated.address,
		"role": updated.role.value if hasattr(updated.role, 'value') else str(updated.role),
		"profile_image": getattr(updated, 'profile_image', None),
		"specialization": getattr(updated, 'specialization', None),
		"license_number": getattr(updated, 'license_number', None),
	}

def delete_doctor_controller(db: Session, doctor_id: str):
	deleted = delete_doctor(db, doctor_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Doctor not found")
	return {"message": "Doctor deleted"}

def list_patients_controller(db: Session):
	try:
		patients = list_patients(db)
		# Convert SQLAlchemy objects to dictionaries
		result = []
		for pat in patients:
			try:
				role_value = pat.role.value if hasattr(pat.role, 'value') else str(pat.role)
			except:
				role_value = str(pat.role) if pat.role else None
			
			result.append({
				"id": str(pat.id),
				"user_id": str(pat.id),
				"name": pat.name or "",
				"email": pat.email or "",
				"phone": pat.phone or "",
				"address": pat.address or "",
				"role": role_value,
				"profile_image": getattr(pat, 'profile_image', None),
			})
		return result
	except Exception as e:
		import traceback
		print(f"Error in list_patients_controller: {type(e).__name__}: {str(e)}")
		print(traceback.format_exc())
		raise HTTPException(status_code=500, detail=f"Failed to retrieve patients: {str(e)}")

def create_patient_controller(db: Session, patient: dict):
	pat = create_patient(db, patient)
	if not pat:
		raise HTTPException(status_code=400, detail="Patient creation failed")
	# Convert SQLAlchemy object to dictionary
	return {
		"id": str(pat.id),
		"user_id": str(pat.id),
		"name": pat.name,
		"email": pat.email,
		"phone": pat.phone,
		"address": pat.address,
		"role": pat.role.value if hasattr(pat.role, 'value') else str(pat.role),
		"profile_image": getattr(pat, 'profile_image', None),
	}

def update_patient_controller(db: Session, patient_id: str, patient: dict):
	updated = update_patient(db, patient_id, patient)
	if not updated:
		raise HTTPException(status_code=404, detail="Patient not found")
	# Convert SQLAlchemy object to dictionary
	return {
		"id": str(updated.id),
		"user_id": str(updated.id),
		"name": updated.name,
		"email": updated.email,
		"phone": updated.phone,
		"address": updated.address,
		"role": updated.role.value if hasattr(updated.role, 'value') else str(updated.role),
		"profile_image": getattr(updated, 'profile_image', None),
	}

def delete_patient_controller(db: Session, patient_id: str):
	deleted = delete_patient(db, patient_id)
	if not deleted:
		raise HTTPException(status_code=404, detail="Patient not found")
	return {"message": "Patient deleted"}

def get_admin_profile_controller(db: Session, admin_id: str):
	from src.Services.adminservices import get_admin_profile
	admin = get_admin_profile(db, admin_id)
	if not admin:
		raise HTTPException(status_code=404, detail="Admin not found")
	return admin

def update_admin_profile_controller(db: Session, admin_id: str, user_data):
	from src.Services.adminservices import update_admin_profile
	from src.Middlewares.userpydanticmodel import UserEdit
	
	# Convert dict to UserEdit if needed
	if isinstance(user_data, dict):
		user_edit = UserEdit(**user_data)
	else:
		user_edit = user_data
	
	updated = update_admin_profile(db, admin_id, user_edit)
	if not updated:
		raise HTTPException(status_code=404, detail="Admin not found")
	return updated
