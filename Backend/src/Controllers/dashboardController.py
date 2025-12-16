# Controller for admin dashboard
from fastapi import Depends
from ..Services.dashboard import get_admin_dashboard_data
from ..Utils.db import get_db
from sqlalchemy.orm import Session


def admin_data(db: Session = Depends(get_db)):
    return get_admin_dashboard_data(db)
