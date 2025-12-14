from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Services.doctorservices import create_user_doctor, get_user_doctor, update_user_doctor, delete_user_doctor

def register_doctor_controller(db: Session, user: UserRegister):
    user.role = "doctor"
    db_user = create_user_doctor(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Registration failed")
    return db_user

def get_doctor_profile_controller(db: Session, user_id: str):
    user = get_user_doctor(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return user

def update_doctor_profile_controller(db: Session, user_id: str, user: UserEdit):
    updated = update_user_doctor(db, user_id, user)
    if not updated:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return updated

def delete_doctor_profile_controller(db: Session, user_id: str):
    deleted = delete_user_doctor(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return {"message": "Profile deleted"}
