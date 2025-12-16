# Router for admin dashboard
from fastapi import APIRouter, Depends
from ..Controllers.dashboardController import admin_data
from ..Utils.dependencies import require_admin

router = APIRouter(prefix="/admin/dashboard", tags=["Admin Dashboard"])

@router.get("/data")
def get_dashboard_data(current_admin=Depends(require_admin)):
    return admin_data()
