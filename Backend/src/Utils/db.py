
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
DATABASE_URL = os.getenv("DATABASE_URL").replace("+asyncpg", "+psycopg2")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
