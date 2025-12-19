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
    
    # Convert SQLAlchemy object to dictionary with proper field names (same format as admin)
    try:
        role_value = user.role.value if hasattr(user.role, 'value') else str(user.role)
    except:
        role_value = str(user.role) if user.role else None
    
    return {
        "user_id": str(user.id),
        "id": str(user.id),
        "name": user.name or "",
        "email": user.email or "",
        "phone": user.phone or "",
        "address": user.address or "",
        "role": role_value,
        "profile_image": getattr(user, 'profile_image', None),
        "specialization": getattr(user, 'specialization', None),
        "license_number": getattr(user, 'license_number', None),
    }

def update_doctor_profile_controller(db: Session, user_id: str, user: UserEdit):
    updated = update_user_doctor(db, user_id, user)
    if not updated:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    # Convert SQLAlchemy object to dictionary with proper field names (same format as admin)
    try:
        role_value = updated.role.value if hasattr(updated.role, 'value') else str(updated.role)
    except:
        role_value = str(updated.role) if updated.role else None
    
    return {
        "user_id": str(updated.id),
        "id": str(updated.id),
        "name": updated.name or "",
        "email": updated.email or "",
        "phone": updated.phone or "",
        "address": updated.address or "",
        "role": role_value,
        "profile_image": getattr(updated, 'profile_image', None),
        "specialization": getattr(updated, 'specialization', None),
        "license_number": getattr(updated, 'license_number', None),
    }

def delete_doctor_profile_controller(db: Session, user_id: str):
    deleted = delete_user_doctor(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return {"message": "Profile deleted"}
