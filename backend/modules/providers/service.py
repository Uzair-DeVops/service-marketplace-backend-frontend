from datetime import datetime, timedelta
import uuid
from typing import Optional, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from .models import ProviderCreate, ProviderUpdate, ProviderInDB, BusinessDetails
from database import execute_query, execute_query_one
from ..utils import get_password_hash
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

def create_provider(provider: ProviderCreate) -> ProviderInDB:
    provider_id = str(uuid.uuid4())
    now = datetime.utcnow()
    query = """
    INSERT INTO providers (
        id, email, full_name, password, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?)
    RETURNING *
    """
    result = execute_query_one(
        query,
        (provider_id, provider.email, provider.full_name, provider.password, now, now)
    )
    return ProviderInDB(**result)

def update_business_details(provider_id: str, business_details: BusinessDetails) -> ProviderInDB:
    now = datetime.utcnow()
    query = """
    UPDATE providers
    SET business_name = ?,
        service_type = ?,
        hourly_rate = ?,
        location = ?,
        working_hours = ?,
        sa_front_id = ?,
        sa_back_id = ?,
        profile_photo = ?,
        updated_at = ?
    WHERE id = ?
    RETURNING *
    """
    result = execute_query_one(
        query,
        (
            business_details.business_name,
            business_details.service_type,
            business_details.hourly_rate,
            business_details.location,
            business_details.working_hours,
            business_details.sa_front_id,
            business_details.sa_back_id,
            business_details.profile_photo,
            now,
            provider_id
        )
    )
    print("--------->", result)
    return ProviderInDB(**result)

def get_provider(provider_id: str) -> Optional[ProviderInDB]:
    query = "SELECT * FROM providers WHERE id = ?"
    result = execute_query_one(query, (provider_id,))
    return ProviderInDB(**result) if result else None

def get_provider_by_email(email: str) -> Optional[ProviderInDB]:
    query = "SELECT * FROM providers WHERE email = ?"
    result = execute_query_one(query, (email,))
    return ProviderInDB(**result) if result else None

def update_provider(provider_id: str, provider_update: ProviderUpdate) -> Optional[ProviderInDB]:
    update_fields = []
    values = []
    for field, value in provider_update.dict(exclude_unset=True).items():
        if value is not None:
            update_fields.append(f"{field} = ?")
            values.append(value)
    if not update_fields:
        return get_provider(provider_id)
    values.append(datetime.utcnow())
    values.append(provider_id)
    query = f"""
    UPDATE providers
    SET {', '.join(update_fields)}, updated_at = ?
    WHERE id = ?
    RETURNING *
    """
    result = execute_query_one(query, tuple(values))
    return ProviderInDB(**result) if result else None

def delete_provider(provider_id: str) -> bool:
    query = "DELETE FROM providers WHERE id = ? RETURNING id"
    result = execute_query_one(query, (provider_id,))
    return bool(result)

def list_providers(skip: int = 0, limit: int = 100) -> List[ProviderInDB]:
    query = "SELECT * FROM providers ORDER BY created_at DESC LIMIT ? OFFSET ?"
    results = execute_query(query, (limit, skip))
    return [ProviderInDB(**row) for row in results]

def get_providers_by_service_type(service_type: str) -> List[ProviderInDB]:
    query = "SELECT * FROM providers WHERE service_type = ? AND is_active = true"
    results = execute_query(query, (service_type,))
    return [ProviderInDB(**row) for row in results] 