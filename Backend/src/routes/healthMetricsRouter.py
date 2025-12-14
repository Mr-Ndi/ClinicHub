from fastapi import APIRouter, Depends, Body, status
from sqlalchemy.orm import Session
from src.Utils.db import get_db

healthMetricsRouter = APIRouter(prefix="/api/patient/health-metrics", tags=["HealthMetrics"])

# Example: Store health metrics (e.g., from wearable or manual entry)
@healthMetricsRouter.post("/", status_code=status.HTTP_201_CREATED)
def add_health_metrics(
    user_id: str = Body(...),
    metrics: dict = Body(...),
    db: Session = Depends(get_db)
):
    # Store metrics in DB (implement model/service as needed)
    # For now, just echo back
    return {"message": "Health metrics received", "user_id": user_id, "metrics": metrics}

# Example: Get health metrics
@healthMetricsRouter.get("/{user_id}")
def get_health_metrics(user_id: str, db: Session = Depends(get_db)):
    # Fetch metrics from DB (implement model/service as needed)
    # For now, just return dummy data
    return {"user_id": user_id, "metrics": {"heart_rate": 72, "bp": "120/80"}}
