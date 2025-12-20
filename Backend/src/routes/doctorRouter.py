from fastapi import APIRouter, Depends, status, Body, HTTPException
from sqlalchemy.orm import Session
import traceback
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Controllers.doctorController import (
    register_doctor_controller,
    get_doctor_profile_controller,
    update_doctor_profile_controller,
    delete_doctor_profile_controller,
)
from src.Controllers.medicalrecordController import create_medicalrecord_controller
from src.Models.medicalrecordmodel import MedicalRecord
from src.Models.usermodel import User
from src.Utils.db import get_db
from src.Utils.dependencies import require_admin, require_admin_or_doctor, get_current_user
from uuid import UUID

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

@doctorRouter.get("/patients/{patient_id}/records")
def get_patient_medical_records(patient_id: str, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all medical records for a specific patient (doctor view)"""
    try:
        doctor_id = current_user.get("user_id")
        if not doctor_id:
            raise HTTPException(status_code=401, detail="Invalid user token")
        
        try:
            patient_uuid = UUID(patient_id) if isinstance(patient_id, str) else patient_id
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid patient ID format")
        
        # Get medical records for this patient
        medical_records = db.query(MedicalRecord).filter(MedicalRecord.patient_id == patient_uuid).all()
        
        # Convert SQLAlchemy objects to dictionaries for JSON serialization
        result = []
        for record in medical_records:
            # Fetch doctor information
            doctor = db.query(User).filter(User.id == record.doctor_id).first()
            result.append({
                "id": str(record.id),
                "patient_id": str(record.patient_id),
                "doctor_id": str(record.doctor_id),
                "doctor_name": doctor.name if doctor else "Unknown Doctor",
                "type": record.type or "",
                "title": record.title or "",
                "date": record.date.isoformat() if record.date else None,
                "details": record.details or None,
            })
        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_patient_medical_records: {type(e).__name__}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve medical records: {str(e)}"
        )

@doctorRouter.post("/patients/{patient_id}/records", status_code=status.HTTP_201_CREATED)
def create_patient_medical_record(patient_id: str, record_data: dict = Body(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Create a medical record for a patient (doctor only)"""
    try:
        doctor_id = current_user.get("user_id")
        if not doctor_id:
            raise HTTPException(status_code=401, detail="Invalid user token")
        
        # Validate required fields
        record_type = record_data.get("type")
        title = record_data.get("title")
        
        if not record_type:
            raise HTTPException(status_code=400, detail="Record type is required")
        if not title:
            raise HTTPException(status_code=400, detail="Record title is required")
        
        # Validate patient exists
        try:
            patient_uuid = UUID(patient_id) if isinstance(patient_id, str) else patient_id
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid patient ID format")
        
        patient = db.query(User).filter(User.id == patient_uuid).first()
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Create medical record data
        medical_record_dict = {
            "patient_id": str(patient_uuid),
            "doctor_id": doctor_id,
            "type": record_type,
            "title": title,
            "details": record_data.get("details", ""),
        }
        
        # Create medical record
        medical_record = create_medicalrecord_controller(db, medical_record_dict)
        
        # Convert to dict for response
        return {
            "id": str(medical_record.id),
            "patient_id": str(medical_record.patient_id),
            "doctor_id": str(medical_record.doctor_id),
            "type": medical_record.type,
            "title": medical_record.title,
            "date": medical_record.date.isoformat() if medical_record.date else None,
            "details": medical_record.details,
            "message": "Medical record created successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in create_patient_medical_record: {type(e).__name__}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create medical record: {str(e)}"
        )
