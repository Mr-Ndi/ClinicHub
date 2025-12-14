
from src.Models.usermodel import User, UserRole
from uuid import uuid4

# Doctor CRUD
def list_doctors(db):
	return db.query(User).filter(User.role == UserRole.DOCTOR).all()

def create_doctor(db, doctor: dict):
	doc = User(
		id=uuid4(),
		name=doctor.get("name"),
		email=doctor.get("email"),
		phone=doctor.get("phone"),
		address=doctor.get("address"),
		password=doctor.get("password"),
		role=UserRole.DOCTOR,
		profile_image=doctor.get("profile_image"),
		specialization=doctor.get("specialization"),
		license_number=doctor.get("license_number")
	)
	db.add(doc)
	db.commit()
	db.refresh(doc)
	return doc

def update_doctor(db, doctor_id: str, doctor: dict):
	doc = db.query(User).filter(User.id == doctor_id, User.role == UserRole.DOCTOR).first()
	if not doc:
		return None
	for field, value in doctor.items():
		setattr(doc, field, value)
	db.commit()
	db.refresh(doc)
	return doc

def delete_doctor(db, doctor_id: str):
	doc = db.query(User).filter(User.id == doctor_id, User.role == UserRole.DOCTOR).first()
	if not doc:
		return None
	db.delete(doc)
	db.commit()
	return doc

# Patient CRUD
def list_patients(db):
	return db.query(User).filter(User.role == UserRole.PATIENT).all()

def create_patient(db, patient: dict):
	pat = User(
		id=uuid4(),
		name=patient.get("name"),
		email=patient.get("email"),
		phone=patient.get("phone"),
		address=patient.get("address"),
		password=patient.get("password"),
		role=UserRole.PATIENT,
		profile_image=patient.get("profile_image")
	)
	db.add(pat)
	db.commit()
	db.refresh(pat)
	return pat

def update_patient(db, patient_id: str, patient: dict):
	pat = db.query(User).filter(User.id == patient_id, User.role == UserRole.PATIENT).first()
	if not pat:
		return None
	for field, value in patient.items():
		setattr(pat, field, value)
	db.commit()
	db.refresh(pat)
	return pat

def delete_patient(db, patient_id: str):
	pat = db.query(User).filter(User.id == patient_id, User.role == UserRole.PATIENT).first()
	if not pat:
		return None
	db.delete(pat)
	db.commit()
	return pat
