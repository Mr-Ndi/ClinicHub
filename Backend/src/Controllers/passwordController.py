from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.Models.usermodel import User
from src.Utils.passwordHasher import hash_password

def set_new_password_controller(db: Session, user_id: str, new_password: str):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = hash_password(new_password)
    db.commit()
    db.refresh(user)
    return {"message": "Password updated successfully"}
