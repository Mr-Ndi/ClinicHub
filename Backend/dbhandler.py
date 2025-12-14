from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from dotenv import load_dotenv
import os
import logging

logging.getLogger("sqlalchemy.engine").setLevel(logging.ERROR)
logging.getLogger("asyncpg").setLevel(logging.ERROR)

load_dotenv()
DB_url = os.getenv("DATABASE_URL")
if not DB_url:
    raise ValueError("DATABASE_URL environment variable not set. Please check your .env file.")
try:
    # engine = create_async_engine(DB_url, echo=True, future=True, connect_args={"ssl":True})
    engine = create_async_engine(DB_url, echo=False, future=True)
except Exception as e:
    raise ConnectionError(f"Failed to create database engine: {e}")

async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)
async def init_db():
    async with engine.begin() as conn:
        SQLModel.metadata.create_all(bind=engine)
        await conn.run_sync(SQLModel.metadata.create_all)

def get_session_maker():
    return async_session_maker
