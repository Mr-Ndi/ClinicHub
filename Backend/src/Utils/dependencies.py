
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from src.Utils.jwtGenerator import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or missing token")
    return payload

def require_admin(user=Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Access denied. Only administrators can perform this action."
        )
    return user

def require_admin_or_doctor(user=Depends(get_current_user)):
    if user.get("role") not in ("admin", "doctor"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admins or doctors only")
    return user