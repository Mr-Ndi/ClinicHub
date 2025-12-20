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

# Configure engine with connection pooling and SSL handling
# Note: SSL mode is already in DATABASE_URL, so we don't override it
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using them (checks if connection is alive)
    pool_recycle=300,    # Recycle connections after 5 minutes to avoid stale connections
    pool_size=5,         # Number of connections to maintain
    max_overflow=10,     # Maximum overflow connections
    connect_args={
        "connect_timeout": 10,  # Connection timeout in seconds
    }
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def seed_admin(name=None, email=None, password=None, phone=None, address=None):
    """
    Seed an admin user. Requires credentials from user input or environment variables.
    
    Environment variables:
    - ADMIN_NAME: Admin name (required)
    - ADMIN_EMAIL: Admin email (required)
    - ADMIN_PASSWORD: Admin password (required)
    - ADMIN_PHONE: Admin phone (optional)
    - ADMIN_ADDRESS: Admin address (optional)
    """
    # Get values from arguments, then environment variables, then prompt user
    admin_name = name or os.getenv("ADMIN_NAME")
    admin_email = email or os.getenv("ADMIN_EMAIL")
    admin_password = password or os.getenv("ADMIN_PASSWORD")
    admin_phone = phone or os.getenv("ADMIN_PHONE", "")
    admin_address = address or os.getenv("ADMIN_ADDRESS", "")
    
    # Prompt for required fields if not provided
    if not admin_name:
        admin_name = input("Admin Name (required): ").strip()
        if not admin_name:
            print("❌ Admin name is required!")
            return False
    
    if not admin_email:
        admin_email = input("Admin Email (required): ").strip()
        if not admin_email:
            print("❌ Admin email is required!")
            return False
    
    if not admin_password:
        import getpass
        admin_password = getpass.getpass("Admin Password (required): ").strip()
        if not admin_password:
            print("❌ Admin password is required!")
            return False
    
    if not admin_phone:
        admin_phone = input("Admin Phone (optional, press Enter to skip): ").strip() or None
    
    if not admin_address:
        admin_address = input("Admin Address (optional, press Enter to skip): ").strip() or None
    
    # Retry logic for database connection
    max_retries = 3
    session = None
    
    for attempt in range(max_retries):
        try:
            session = SessionLocal()
            
            # Check if admin already exists
            existing = session.query(User).filter(User.email == admin_email).first()
            if existing:
                print(f"⚠️  Admin with email {admin_email} already exists.")
                print(f"   User ID: {existing.id}")
                print(f"   Role: {existing.role}")
                session.close()
                return False
            
            # Create admin user
            admin = User(
                id=uuid4(),
                name=admin_name,
                email=admin_email,
                phone=admin_phone,
                address=admin_address,
                password=hash_password(admin_password),
                role=UserRole.ADMIN,
                profile_image=None,
                specialization=None,
                license_number=None
            )
            session.add(admin)
            session.commit()
            print(f"✅ Admin user created successfully!")
            print(f"   Name: {admin_name}")
            print(f"   Email: {admin_email}")
            print(f"   User ID: {admin.id}")
            session.close()
            return True
            
        except Exception as e:
            if session:
                try:
                    session.rollback()
                    session.close()
                except:
                    pass
            
            if attempt < max_retries - 1:
                print(f"⚠️  Connection error (attempt {attempt + 1}/{max_retries}): {str(e)}")
                print("   Retrying in 2 seconds...")
                import time
                time.sleep(2)
                # Recreate engine and session for retry
                try:
                    engine.dispose()
                except:
                    pass
            else:
                print(f"❌ Error creating admin after {max_retries} attempts: {str(e)}")
                return False
    
    return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Seed admin user for ClinicHub')
    parser.add_argument('--name', help='Admin name (required if not in env)', default=None)
    parser.add_argument('--email', help='Admin email (required if not in env)', default=None)
    parser.add_argument('--password', help='Admin password (required if not in env)', default=None)
    parser.add_argument('--phone', help='Admin phone (optional)', default=None)
    parser.add_argument('--address', help='Admin address (optional)', default=None)
    
    args = parser.parse_args()
    
    # Always prompt for missing required fields
    seed_admin(name=args.name, email=args.email, password=args.password, 
              phone=args.phone, address=args.address)
