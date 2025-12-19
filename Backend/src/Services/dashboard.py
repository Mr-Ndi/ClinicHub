# Service layer for admin dashboard data aggregation

from ..Models.usermodel import User, UserRole
from ..Models.appointmentmodel import Appointment
from ..Models.prescriptionmodel import Prescription
from ..Models.billingmodel import Billing
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date, datetime

def get_admin_dashboard_data(db: Session):
    total_doctors = db.query(User).filter(User.role == UserRole.DOCTOR).count()
    total_patients = db.query(User).filter(User.role == UserRole.PATIENT).count()
    today = datetime.now().date()
    appointments_today = db.query(Appointment).filter(
        func.date(Appointment.date) == today
    ).count()
    return {
        'total_doctors': total_doctors,
        'total_patients': total_patients,
        'appointments_today': appointments_today
    }

def get_doctor_dashboard_data(db: Session, doctor_id: str):
    """
    Get analytics data for a specific doctor's dashboard.
    """
    from uuid import UUID
    
    # Convert doctor_id to UUID if it's a string
    try:
        doctor_uuid = UUID(doctor_id) if isinstance(doctor_id, str) else doctor_id
    except:
        doctor_uuid = doctor_id
    
    # Total unique patients (patients who have appointments with this doctor)
    total_patients = db.query(func.count(func.distinct(Appointment.patient_id))).filter(
        Appointment.doctor_id == doctor_uuid
    ).scalar() or 0
    
    # Appointments today
    today = datetime.now().date()
    appointments_today = db.query(Appointment).filter(
        Appointment.doctor_id == doctor_uuid,
        func.date(Appointment.date) == today
    ).count()
    
    # Pending reports (Active prescriptions for this doctor)
    pending_reports = db.query(Prescription).filter(
        Prescription.doctor_id == doctor_uuid,
        Prescription.status == "Active"
    ).count()
    
    # Total earnings (sum of paid billing amounts for appointments with this doctor)
    # Get all appointment IDs for this doctor
    doctor_appointment_ids = [appt_id[0] for appt_id in db.query(Appointment.id).filter(
        Appointment.doctor_id == doctor_uuid
    ).all()]
    
    # Calculate total earnings from paid bills linked to these appointments
    if doctor_appointment_ids:
        total_earnings = db.query(func.coalesce(func.sum(Billing.amount), 0)).filter(
            Billing.appointment_id.in_(doctor_appointment_ids),
            Billing.status == "Paid"
        ).scalar() or 0
    else:
        total_earnings = 0
    
    return {
        'total_patients': total_patients,
        'appointments_today': appointments_today,
        'pending_reports': pending_reports,
        'total_earnings': float(total_earnings)
    }
