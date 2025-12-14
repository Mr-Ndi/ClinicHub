from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.authservices import authenticate_user

def login_controller(db: Session, email: str, password: str):
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    # Here you would generate and return a JWT or session token
    return {"message": "Login successful", "user_id": str(user.id), "email": user.email}
