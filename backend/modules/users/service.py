from datetime import datetime, timedelta
import uuid
from typing import Optional, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from .models import UserCreate, UserUpdate, UserInDB
from database import execute_query, execute_query_one
from dotenv import load_dotenv
import os
load_dotenv()

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def get_user_by_email(email: str) -> Optional[dict]:
    return execute_query_one("SELECT * FROM users WHERE email = ?", (email,))

def get_user_by_id(user_id: str) -> Optional[dict]:
    return execute_query_one("SELECT * FROM users WHERE id = ?", (user_id,))

def create_user(user: UserCreate) -> UserInDB:
    query = """
    INSERT INTO users (id, email, full_name, password, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    RETURNING *
    """
    now = datetime.utcnow()
    user_id = str(uuid.uuid4())
    result = execute_query_one(
        query,
        (user_id, user.email, user.full_name, user.password, now, now)
    )
    if not result:
        raise Exception("User creation failed: No result returned from database. Check for constraint violations or DB triggers.")
    return UserInDB(**result)

def update_user(user_id: str, user_data: UserUpdate) -> Optional[dict]:
    user = get_user_by_id(user_id)
    if not user:
        return None
    
    update_data = user_data.dict(exclude_unset=True)
    if not update_data:
        return user
    
    update_data["updated_at"] = datetime.utcnow()
    
    # Build dynamic update query
    set_clause = ", ".join(f"{k} = ?" for k in update_data.keys())
    query = f"UPDATE users SET {set_clause} WHERE id = ?"
    
    # Execute update
    execute_query(query, (*update_data.values(), user_id))
    
    return get_user_by_id(user_id)

def delete_user(user_id: str) -> bool:
    user = get_user_by_id(user_id)
    if not user:
        return False
    
    execute_query("DELETE FROM users WHERE id = ?", (user_id,))
    return True

def list_users(skip: int = 0, limit: int = 100) -> List[UserInDB]:
    """List all users with pagination"""
    query = "SELECT * FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?"
    results = execute_query(query, (limit, skip))
    return [UserInDB(**row) for row in results] 