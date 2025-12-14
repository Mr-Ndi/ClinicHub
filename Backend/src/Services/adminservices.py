

# Admin services are limited to authentication and profile management only.
# All admin privileges should be enforced at the API level (e.g., FastAPI dependencies/middleware).

from sqlalchemy.orm import Session
from src.Models.usermodel import User, UserRole

def get_admin_profile(db: Session, admin_id):
    return db.query(User).filter(User.id == admin_id, User.role == UserRole.ADMIN).first()
