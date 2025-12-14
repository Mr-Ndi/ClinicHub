from passlib.context import CryptContext

# Create a CryptContext that supports Argon2 first, then bcrypt (deprecated)
pwd_context = CryptContext(
    schemes=["argon2", "bcrypt"],
    deprecated="auto"
)

# Hash a password using Argon2 by default (if available)
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify a password against its hash
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)