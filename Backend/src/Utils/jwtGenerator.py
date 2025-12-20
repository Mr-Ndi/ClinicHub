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

# Only initialize redis_client if REDIS_URL is set and valid
redis_client = None
if REDIS_URL and REDIS_URL.startswith(("redis://", "rediss://", "unix://")):
    redis_client = redis.from_url(REDIS_URL, decode_responses=True)


import asyncio

def create_access_token(data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    # JWT requires exp as Unix timestamp (integer), not datetime object
    # Use calendar.timegm for UTC timestamp calculation
    import calendar
    expire_timestamp = int(calendar.timegm(expire.utctimetuple()))
    to_encode.update({"exp": expire_timestamp})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    # Ensure token is a string (PyJWT 2.x returns string, but be safe)
    if isinstance(encoded_jwt, bytes):
        encoded_jwt = encoded_jwt.decode('utf-8')

    # Cache the JWT in Redis with expiration if redis_client is available
    # Note: Redis caching is optional and errors should not break JWT generation
    # Skip Redis caching in sync context to avoid event loop issues
    # Redis caching can be implemented separately in async endpoints if needed

    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None

# async def logout(token: str = Depends(oauth2_scheme)):
#     await redis_client.setex(f"blacklist:{token}", int(ttl), "invalidated")
#     return {"message": "Successfully logged out"}