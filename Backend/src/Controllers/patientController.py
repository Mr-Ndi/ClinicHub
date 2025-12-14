from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Services.patientservices import create_user_patient, get_user_patient, update_user_patient, delete_user_patient

def register_patient_controller(db: Session, user: UserRegister):
    user.role = "patient"
    db_user = create_user_patient(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Registration failed")
    return db_user

def get_patient_profile_controller(db: Session, user_id: str):
    user = get_user_patient(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Patient not found")
    return user

def update_patient_profile_controller(db: Session, user_id: str, user: UserEdit):
    updated = update_user_patient(db, user_id, user)
    if not updated:
        raise HTTPException(status_code=404, detail="Patient not found")
    return updated

def delete_patient_profile_controller(db: Session, user_id: str):
    deleted = delete_user_patient(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Patient not found")
    return {"message": "Profile deleted"}
