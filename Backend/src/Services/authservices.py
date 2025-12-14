from sqlalchemy.orm import Session
from src.Models.usermodel import User
from src.Utils.passwordHasher import verify_password

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not user.password:
        return None
    if not verify_password(password, user.password):
        return None
    return user
