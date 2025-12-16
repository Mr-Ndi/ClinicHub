# Service layer for admin dashboard data aggregation

from ..Models.usermodel import User, UserRole
from ..Models.appointmentmodel import Appointment
from sqlalchemy.orm import Session
from datetime import date

def get_admin_dashboard_data(db: Session):
    total_doctors = db.query(User).filter(User.role == UserRole.DOCTOR).count()
    total_patients = db.query(User).filter(User.role == UserRole.PATIENT).count()
    appointments_today = db.query(Appointment).filter(Appointment.appointment_date.startswith(str(date.today()))).count()
    return {
        'total_doctors': total_doctors,
        'total_patients': total_patients,
        'appointments_today': appointments_today
    }
