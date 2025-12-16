
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Services.authservices import authenticate_user
from src.Utils.jwtGenerator import create_access_token

def login_controller(db: Session, email: str, password: str):
    user = authenticate_user(db, email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Build user profile for JWT and response
    user_profile = {
        "user_id": str(user.id),
        "email": user.email,
        "name": user.name,
        "role": user.role.value if hasattr(user.role, 'value') else str(user.role),
        "phone": user.phone,
        "address": user.address,
        "profile_image": getattr(user, 'profile_image', None)
    }
    token = create_access_token(user_profile)
    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "profile": user_profile
    }
