from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Controllers.patientController import (
    register_patient_controller,
    get_patient_profile_controller,
    update_patient_profile_controller,
    delete_patient_profile_controller,
)
from src.Utils.db import get_db

patientRouter = APIRouter(prefix="/api/patient", tags=["Patient"])

@patientRouter.post("/register", status_code=status.HTTP_201_CREATED)
def register_patient(user: UserRegister = Body(...), db: Session = Depends(get_db)):
    db_user = register_patient_controller(db, user)
    return {"message": "Patient registered successfully", "user_id": str(db_user.id)}

@patientRouter.get("/profile/{user_id}")
def get_profile(user_id: str, db: Session = Depends(get_db)):
    return get_patient_profile_controller(db, user_id)

@patientRouter.put("/profile/{user_id}")
def update_profile(user_id: str, user: UserEdit = Body(...), db: Session = Depends(get_db)):
    updated = update_patient_profile_controller(db, user_id, user)
    return {"message": "Profile updated", "user": updated}

@patientRouter.delete("/profile/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_profile(user_id: str, db: Session = Depends(get_db)):
    return delete_patient_profile_controller(db, user_id)
