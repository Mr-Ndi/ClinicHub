from fastapi import APIRouter, Depends, status, Body, HTTPException
from sqlalchemy.orm import Session
import traceback
from src.Middlewares.userpydanticmodel import UserRegister, UserEdit
from src.Controllers.patientController import (
    register_patient_controller,
    get_patient_profile_controller,
    update_patient_profile_controller,
    delete_patient_profile_controller,
)
from src.Utils.db import get_db
from src.Utils.dependencies import get_current_user
from src.Models.appointmentmodel import Appointment
from src.Models.prescriptionmodel import Prescription
from src.Models.usermodel import User, UserRole
from src.Controllers.appointmentController import create_appointment_controller
from src.Controllers.adminController import list_doctors_controller
from uuid import UUID
from datetime import datetime

patientRouter = APIRouter(prefix="/api/patient", tags=["Patient"])

@patientRouter.post("/register", status_code=status.HTTP_201_CREATED)
def register_patient(user: UserRegister = Body(...), db: Session = Depends(get_db)):
    db_user = register_patient_controller(db, user)
    return {"message": "Patient registered successfully", "user_id": str(db_user.id)}

@patientRouter.get("/profile")
def get_current_patient_profile(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get the authenticated patient's profile"""
    user_id = current_user.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid user token")
    return get_patient_profile_controller(db, user_id)

@patientRouter.put("/profile")
def update_current_patient_profile(user: UserEdit = Body(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Update the authenticated patient's profile"""
    user_id = current_user.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid user token")
    updated = update_patient_profile_controller(db, user_id, user)
    return {"message": "Profile updated", "user": updated}

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

@patientRouter.get("/appointments")
def get_patient_appointments(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all appointments for the authenticated patient"""
    patient_id = current_user.get("user_id")
    if not patient_id:
        raise HTTPException(status_code=401, detail="Invalid user token")
    
    try:
        patient_uuid = UUID(patient_id) if isinstance(patient_id, str) else patient_id
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid patient ID format")
    
    appointments = db.query(Appointment).filter(Appointment.patient_id == patient_uuid).all()
    # Convert SQLAlchemy objects to dictionaries for JSON serialization
    result = []
    for appointment in appointments:
        result.append({
            "id": str(appointment.id),
            "patient_id": str(appointment.patient_id),
            "doctor_id": str(appointment.doctor_id),
            "date": appointment.date.isoformat() if appointment.date else None,
            "time": appointment.time,
            "status": appointment.status,
            "type": appointment.type,
            "notes": appointment.notes,
        })
    return result

@patientRouter.get("/doctors")
def get_available_doctors(db: Session = Depends(get_db)):
    """Get list of available doctors for appointment booking"""
    try:
        return list_doctors_controller(db)
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_available_doctors: {type(e).__name__}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve doctors: {str(e)}"
        )

@patientRouter.post("/appointments", status_code=status.HTTP_201_CREATED)
def book_appointment(appointment_data: dict = Body(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Book a new appointment for the authenticated patient"""
    try:
        patient_id = current_user.get("user_id")
        if not patient_id:
            raise HTTPException(status_code=401, detail="Invalid user token")
        
        # Validate required fields
        doctor_id = appointment_data.get("doctor_id")
        date = appointment_data.get("date")
        time = appointment_data.get("time")
        appointment_type = appointment_data.get("type")
        
        if not doctor_id:
            raise HTTPException(status_code=400, detail="Doctor ID is required")
        if not date:
            raise HTTPException(status_code=400, detail="Appointment date is required")
        if not time:
            raise HTTPException(status_code=400, detail="Appointment time is required")
        if not appointment_type:
            raise HTTPException(status_code=400, detail="Appointment type is required")
        
        # Validate doctor exists and is actually a doctor
        try:
            doctor_uuid = UUID(doctor_id) if isinstance(doctor_id, str) else doctor_id
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid doctor ID format")
        
        doctor = db.query(User).filter(User.id == doctor_uuid, User.role == UserRole.DOCTOR).first()
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")
        
        # Parse and validate date
        try:
            if isinstance(date, str):
                appointment_date = datetime.fromisoformat(date.replace('Z', '+00:00'))
            else:
                appointment_date = date
        except (ValueError, TypeError):
            raise HTTPException(status_code=400, detail="Invalid date format. Use ISO format (YYYY-MM-DDTHH:MM:SS)")
        
        # Create appointment data
        appointment_dict = {
            "patient_id": patient_id,
            "doctor_id": str(doctor_uuid),
            "date": appointment_date.isoformat() if isinstance(appointment_date, datetime) else date,
            "time": time,
            "type": appointment_type,
            "status": "Upcoming",
            "notes": appointment_data.get("notes", "")
        }
        
        # Create appointment
        appointment = create_appointment_controller(db, appointment_dict)
        
        # Convert to dict for response
        return {
            "id": str(appointment.id),
            "patient_id": str(appointment.patient_id),
            "doctor_id": str(appointment.doctor_id),
            "date": appointment.date.isoformat() if appointment.date else None,
            "time": appointment.time,
            "status": appointment.status,
            "type": appointment.type,
            "notes": appointment.notes,
            "message": "Appointment booked successfully"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in book_appointment: {type(e).__name__}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to book appointment: {str(e)}"
        )

@patientRouter.get("/prescriptions")
def get_patient_prescriptions(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """Get all prescriptions for the authenticated patient"""
    try:
        patient_id = current_user.get("user_id")
        if not patient_id:
            raise HTTPException(status_code=401, detail="Invalid user token")
        
        try:
            patient_uuid = UUID(patient_id) if isinstance(patient_id, str) else patient_id
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid patient ID format")
        
        prescriptions = db.query(Prescription).filter(Prescription.patient_id == patient_uuid).all()
        # Convert SQLAlchemy objects to dictionaries for JSON serialization
        result = []
        for prescription in prescriptions:
            result.append({
                "id": str(prescription.id),
                "patient_id": str(prescription.patient_id),
                "doctor_id": str(prescription.doctor_id),
                "medication": prescription.medication or "",
                "dosage": prescription.dosage or "",
                "duration": prescription.duration or "",
                "date": prescription.date.isoformat() if prescription.date else None,
                "status": prescription.status or "",
                "notes": prescription.notes or None,
            })
        return result
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_patient_prescriptions: {type(e).__name__}: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve prescriptions: {str(e)}"
        )
