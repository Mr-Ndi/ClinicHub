from fastapi import APIRouter, Depends, Body, status
from sqlalchemy.orm import Session
from src.Controllers.authController import login_controller
from src.Utils.db import get_db

authRouter = APIRouter(prefix="/api/auth", tags=["Auth"])

@authRouter.post("/login", status_code=status.HTTP_200_OK)
def login(
    email: str = Body(...),
    password: str = Body(...),
    db: Session = Depends(get_db)
):
    return login_controller(db, email, password)
