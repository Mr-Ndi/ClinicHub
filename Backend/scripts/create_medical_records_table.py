"""
Script to create the medical_records table in the database.
Run this script to ensure the medical_records table exists.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from src.Models.medicalrecordmodel import MedicalRecord
from src.Models.usermodel import Base

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv("DATABASE_URL").replace("+asyncpg", "+psycopg2")

def create_medical_records_table():
    """Create the medical_records table if it doesn't exist."""
    engine = create_engine(DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if table exists
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'medical_records'
                );
            """))
            table_exists = result.scalar()
            
            if not table_exists:
                print("Creating medical_records table...")
                Base.metadata.create_all(bind=engine, tables=[MedicalRecord.__table__])
                print("✓ medical_records table created successfully!")
            else:
                print("✓ medical_records table already exists!")
        
        print("\nDatabase setup complete!")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        print("\nPlease ensure:")
        print("1. Database is running")
        print("2. DATABASE_URL in .env is correct")
        print("3. You have proper database permissions")
        raise

if __name__ == "__main__":
    create_medical_records_table()

