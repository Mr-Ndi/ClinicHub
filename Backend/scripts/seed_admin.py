"""
Seed script for creating an initial admin user in the ClinicHub system.
Run this script once after setting up the database.
"""
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from src.Models.usermodel import Base, User, UserRole
from src.Utils.passwordHasher import hash_password
from uuid import uuid4
import os

# Update this with your actual database URL
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./clinichub.db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def seed_admin():
    session = SessionLocal()
    admin_email = "admin@clinichub.com"
    existing = session.query(User).filter(User.email == admin_email).first()
    if existing:
        print("Admin user already exists.")
        return
    admin = User(
        id=uuid4(),
        name="Admin",
        email=admin_email,
        phone="+1 (555) 000-0000",
        address="Head Office",
        password=hash_password("admin1234"),
        role=UserRole.ADMIN,
        profile_image=None,
        specialization=None,
        license_number=None
    )
    session.add(admin)
    session.commit()
    print("Admin user created.")
    session.close()

if __name__ == "__main__":
    seed_admin()
