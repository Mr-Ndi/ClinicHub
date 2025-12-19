"""
Script to create or update the stock_items table in the database.
Run this script to ensure the stock_items table exists with all required columns.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from dotenv import load_dotenv
from src.Models.stockmodel import StockItem
from src.Models.usermodel import Base

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv("DATABASE_URL").replace("+asyncpg", "+psycopg2")

def create_stock_table():
    """Create the stock_items table if it doesn't exist, or add missing columns."""
    engine = create_engine(DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Check if table exists
            result = conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                    AND table_name = 'stock_items'
                );
            """))
            table_exists = result.scalar()
            
            if not table_exists:
                print("Creating stock_items table...")
                Base.metadata.create_all(bind=engine, tables=[StockItem.__table__])
                print("✓ stock_items table created successfully!")
            else:
                print("stock_items table already exists. Checking for missing columns...")
                
                # Check for required columns
                required_columns = {
                    'id': 'UUID',
                    'name': 'VARCHAR',
                    'category': 'VARCHAR',
                    'quantity': 'INTEGER',
                    'unit': 'VARCHAR',
                    'supplier': 'VARCHAR',
                    'cost_per_unit': 'DOUBLE PRECISION',
                    'expiry_date': 'DATE',
                    'location': 'VARCHAR',
                    'description': 'VARCHAR',
                    'min_stock_level': 'INTEGER'
                }
                
                # Get existing columns
                result = conn.execute(text("""
                    SELECT column_name, data_type 
                    FROM information_schema.columns 
                    WHERE table_name = 'stock_items';
                """))
                existing_columns = {row[0]: row[1] for row in result}
                
                missing_columns = []
                for col_name, col_type in required_columns.items():
                    if col_name not in existing_columns:
                        missing_columns.append(col_name)
                
                if missing_columns:
                    print(f"Missing columns: {', '.join(missing_columns)}")
                    print("Please run the following SQL to add missing columns:")
                    print("\nALTER TABLE stock_items")
                    for col in missing_columns:
                        if col == 'category':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} VARCHAR;")
                        elif col == 'supplier':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} VARCHAR;")
                        elif col == 'cost_per_unit':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} DOUBLE PRECISION DEFAULT 0.0;")
                        elif col == 'expiry_date':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} DATE;")
                        elif col == 'location':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} VARCHAR;")
                        elif col == 'min_stock_level':
                            print(f"  ADD COLUMN IF NOT EXISTS {col} INTEGER DEFAULT 0 NOT NULL;")
                    print("\nOr recreate the table using: Base.metadata.drop_all() then create_all()")
                else:
                    print("✓ All required columns exist!")
        
        print("\nDatabase setup complete!")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        print("\nPlease ensure:")
        print("1. Database is running")
        print("2. DATABASE_URL in .env is correct")
        print("3. You have proper database permissions")
        raise

if __name__ == "__main__":
    create_stock_table()

