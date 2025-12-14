import jwt
from datetime import datetime, timedelta
from redis import asyncio as redis
from dotenv import load_dotenv
import os

load_dotenv()

# Secret key for JWT encoding and decoding
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
exp = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
REDIS_URL = os.getenv("REDIS_URL")

try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(exp)
except (TypeError, ValueError):
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    
if not SECRET_KEY or not ALGORITHM or not ACCESS_TOKEN_EXPIRE_MINUTES:
    raise EnvironmentError("JWT configuration is missing in environment variables .")

redis_client = redis.from_url(REDIS_URL, decode_responses=True)

def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("user_id")
    except jwt.PyJWTError:
        return None

# async def logout(token: str = Depends(oauth2_scheme)):
#     await redis_client.setex(f"blacklist:{token}", int(ttl), "invalidated")
#     return {"message": "Successfully logged out"}