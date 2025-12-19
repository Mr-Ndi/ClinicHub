# Router for admin dashboard
from fastapi import APIRouter, Depends
from ..Controllers.dashboardController import admin_data, doctor_data
from ..Utils.dependencies import require_admin, get_current_user
from ..Utils.db import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])

@router.get("/data")
def get_dashboard_data(current_admin=Depends(require_admin)):
    return admin_data()

@router.get("/doctor/data")
def get_doctor_dashboard_data(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get analytics data for the current doctor's dashboard.
    Requires authentication.
    """
    doctor_id = current_user.get("user_id")
    return doctor_data(db, doctor_id)
