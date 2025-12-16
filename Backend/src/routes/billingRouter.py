from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from src.Controllers.billingController import (
	create_billing_controller,
	get_billing_controller,
	update_billing_controller,
	delete_billing_controller,
	list_billings_controller
)
from src.Utils.db import get_db

billingRouter = APIRouter(prefix="/api/billing", tags=["Billing"])

@billingRouter.post("/", status_code=status.HTTP_201_CREATED)
def create_billing(billing: dict = Body(...), db: Session = Depends(get_db)):
	return create_billing_controller(db, billing)

@billingRouter.get("/{billing_id}")
def get_billing(billing_id: str, db: Session = Depends(get_db)):
	return get_billing_controller(db, billing_id)

@billingRouter.put("/{billing_id}")
def update_billing(billing_id: str, billing: dict = Body(...), db: Session = Depends(get_db)):
	return update_billing_controller(db, billing_id, billing)

@billingRouter.delete("/{billing_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_billing(billing_id: str, db: Session = Depends(get_db)):
	return delete_billing_controller(db, billing_id)

@billingRouter.get("/")
def list_billings(db: Session = Depends(get_db)):
	return list_billings_controller(db)
