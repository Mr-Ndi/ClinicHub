"""
Seed script for creating an initial admin user in the ClinicHub system.
Run this script once after setting up the database.
"""


import sys
import os
from dotenv import load_dotenv
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from src.Models.usermodel import Base, User, UserRole
from src.Utils.passwordHasher import hash_password
from uuid import uuid4


# Always use DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and "+asyncpg" in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("+asyncpg", "+psycopg2")
print(f"[Seeder] Using DATABASE_URL: {DATABASE_URL}")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def seed_admin():
    session = SessionLocal()
    admin_email = "admin@clinichub.com"
    print("Enter admin details to seed:")
    name = input("Name: ").strip()
    email = input("Email: ").strip()
    phone = input("Phone: ").strip()
    address = input("Address: ").strip()
    password = input("Password: ").strip()
    profile_image = input("Profile image URL (optional): ").strip() or None

    existing = session.query(User).filter(User.email == email).first()
    if existing:
        print(f"Admin with email {email} already exists.")
        session.close()
        return
    admin = User(
        id=uuid4(),
        name="Admin",
            email=email,
        phone="+1 (555) 000-0000",
            address=address,
            password=hash_password(password),
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
