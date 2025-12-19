from fastapi import APIRouter, Depends, Body, status
from sqlalchemy.orm import Session
from src.Controllers.passwordController import set_new_password_controller
from src.Utils.db import get_db

passwordRouter = APIRouter(prefix="/api/password", tags=["Password"])

@passwordRouter.post("/set-password", status_code=status.HTTP_200_OK)
def set_new_password(
    user_id: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(get_db)
):
    return set_new_password_controller(db, user_id, new_password)
