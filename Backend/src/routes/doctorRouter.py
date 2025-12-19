from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Controllers.doctorController import (
    register_doctor_controller,
    get_doctor_profile_controller,
    update_doctor_profile_controller,
    delete_doctor_profile_controller,
)
from src.Utils.db import get_db
from src.Utils.dependencies import require_admin, require_admin_or_doctor, get_current_user

doctorRouter = APIRouter(prefix="/api/doctor", tags=["Doctor"])

@doctorRouter.post("/register", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def register_doctor(user: UserRegister = Body(...), db: Session = Depends(get_db), admin=Depends(require_admin)):
    db_user = register_doctor_controller(db, user)
    return {"message": "Doctor registered successfully", "user_id": str(db_user.id)}

# Get current doctor's own profile (without user_id in path)
@doctorRouter.get("/profile")
def get_current_doctor_profile(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get current doctor's profile.
    Requires authentication.
    """
    doctor_id = current_user.get("user_id")
    return get_doctor_profile_controller(db, doctor_id)

# Get specific doctor profile by user_id (for admin viewing)
@doctorRouter.get("/profile/{user_id}", dependencies=[Depends(require_admin_or_doctor)])
def get_profile(user_id: str, db: Session = Depends(get_db), user=Depends(require_admin_or_doctor)):
    return get_doctor_profile_controller(db, user_id)

# Update current doctor's own profile (without user_id in path)
@doctorRouter.put("/profile")
def update_current_doctor_profile(user_data: UserEdit = Body(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Update current doctor's profile.
    Requires authentication.
    """
    doctor_id = current_user.get("user_id")
    updated = update_doctor_profile_controller(db, doctor_id, user_data)
    return {"message": "Profile updated successfully", "user": updated}

# Update specific doctor profile by user_id (for admin editing)
@doctorRouter.put("/profile/{user_id}", dependencies=[Depends(require_admin_or_doctor)])
def update_profile(user_id: str, user: UserEdit = Body(...), db: Session = Depends(get_db), current_user=Depends(require_admin_or_doctor)):
    updated = update_doctor_profile_controller(db, user_id, user)
    return {"message": "Profile updated", "user": updated}

@doctorRouter.delete("/profile/{user_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin_or_doctor)])
def delete_profile(user_id: str, db: Session = Depends(get_db), user=Depends(require_admin_or_doctor)):
    return delete_doctor_profile_controller(db, user_id)
