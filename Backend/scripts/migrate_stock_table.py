"""
Migration script to add missing columns to stock_items table.
Run this script to update the database schema with the new columns.
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '../.env'))
DATABASE_URL = os.getenv("DATABASE_URL").replace("+asyncpg", "+psycopg2")

def migrate_stock_table():
    """Add missing columns to stock_items table if they don't exist."""
    engine = create_engine(DATABASE_URL)
    
    try:
        with engine.connect() as conn:
            # Start a transaction
            trans = conn.begin()
            
            try:
                print("Checking stock_items table structure...")
                
                # Get existing columns
                result = conn.execute(text("""
                    SELECT column_name, data_type 
                    FROM information_schema.columns 
                    WHERE table_name = 'stock_items'
                    ORDER BY column_name;
                """))
                existing_columns = {row[0]: row[1] for row in result}
                print(f"Existing columns: {list(existing_columns.keys())}")
                
                # Define required columns with their types
                required_columns = {
                    'id': 'uuid',
                    'name': 'character varying',
                    'category': 'character varying',
                    'quantity': 'integer',
                    'unit': 'character varying',
                    'supplier': 'character varying',
                    'cost_per_unit': 'double precision',
                    'expiry_date': 'date',
                    'location': 'character varying',
                    'description': 'character varying',
                    'min_stock_level': 'integer'
                }
                
                # Check and add missing columns
                missing_columns = []
                for col_name, col_type in required_columns.items():
                    if col_name not in existing_columns:
                        missing_columns.append((col_name, col_type))
                
                if not missing_columns:
                    print("✓ All required columns already exist!")
                    trans.commit()
                    return
                
                print(f"\nFound {len(missing_columns)} missing columns. Adding them...")
                
                # Add missing columns
                for col_name, col_type in missing_columns:
                    if col_name == 'category':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS category VARCHAR;'
                    elif col_name == 'supplier':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS supplier VARCHAR;'
                    elif col_name == 'cost_per_unit':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS cost_per_unit DOUBLE PRECISION DEFAULT 0.0;'
                    elif col_name == 'expiry_date':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS expiry_date DATE;'
                    elif col_name == 'location':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS location VARCHAR;'
                    elif col_name == 'description':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS description VARCHAR;'
                    elif col_name == 'min_stock_level':
                        sql = 'ALTER TABLE stock_items ADD COLUMN IF NOT EXISTS min_stock_level INTEGER DEFAULT 0 NOT NULL;'
                    else:
                        print(f"⚠ Skipping {col_name} - should already exist")
                        continue
                    
                    print(f"  Adding column: {col_name} ({col_type})")
                    conn.execute(text(sql))
                
                trans.commit()
                print("\n✓ Migration completed successfully!")
                print("\nUpdated columns:")
                result = conn.execute(text("""
                    SELECT column_name, data_type, is_nullable, column_default
                    FROM information_schema.columns 
                    WHERE table_name = 'stock_items'
                    ORDER BY column_name;
                """))
                for row in result:
                    default = f" DEFAULT {row[3]}" if row[3] else ""
                    nullable = "NULL" if row[2] == 'YES' else "NOT NULL"
                    print(f"  - {row[0]}: {row[1]} {nullable}{default}")
                
            except Exception as e:
                trans.rollback()
                raise e
        
    except Exception as e:
        print(f"\n❌ Error during migration: {str(e)}")
        print("\nPlease ensure:")
        print("1. Database is running")
        print("2. DATABASE_URL in .env is correct")
        print("3. You have proper database permissions")
        raise

if __name__ == "__main__":
    migrate_stock_table()

