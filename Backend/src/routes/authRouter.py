
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from src.Controllers.authController import login_controller
from src.Utils.db import get_db
from src.Middlewares.userpydanticmodel import UserLogin

authRouter = APIRouter(prefix="/api/auth", tags=["Auth"])

@authRouter.post("/login", status_code=status.HTTP_200_OK)
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_controller(db, user.email, user.password)
