

# Admin services are limited to authentication and profile management only.
# All admin privileges should be enforced at the API level (e.g., FastAPI dependencies/middleware).

from sqlalchemy.orm import Session
from src.Models.usermodel import User, UserRole
from src.Middlewares.userpydanticmodel import UserEdit

def get_admin_profile(db: Session, admin_id: str):
    """Get admin profile by user ID"""
    return db.query(User).filter(User.id == admin_id, User.role == UserRole.ADMIN).first()

def update_admin_profile(db: Session, admin_id: str, user_data: UserEdit):
    """Update admin profile"""
    admin = db.query(User).filter(User.id == admin_id, User.role == UserRole.ADMIN).first()
    if not admin:
        return None
    
    # Update fields if provided (using model_dump for Pydantic v2)
    update_dict = user_data.model_dump(exclude_unset=True)
    for field, value in update_dict.items():
        setattr(admin, field, value)
    
    db.commit()
    db.refresh(admin)
    return admin
