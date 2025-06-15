from pydantic import BaseModel, EmailStr, confloat
from typing import Optional, Literal, List
from datetime import datetime

class ProviderBase(BaseModel):
    email: EmailStr
    full_name: str

class ProviderCreate(ProviderBase):
    password: str

class ProviderLogin(BaseModel):
    email: EmailStr
    password: str

class ProviderUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    phone: Optional[str] = None
    business_name: Optional[str] = None
    service_type: Optional[Literal["Cleaning", "Plumbing", "Electrical", "Painting", "Carpentry", "Landscaping", "Home Repair", "Gardening"]] = None
    hourly_rate: Optional[confloat(gt=0)] = None
    location: Optional[str] = None
    working_hours: Optional[str] = None
    sa_front_id: Optional[str] = None
    sa_back_id: Optional[str] = None
    profile_photo: Optional[str] = None

class BusinessDetails(BaseModel):
    business_name: str
    service_type: Literal["Cleaning", "Plumbing", "Electrical", "Painting", "Carpentry", "Landscaping", "Home Repair", "Gardening"]
    hourly_rate: confloat(gt=0)
    location: str
    working_hours: str
    sa_front_id: Optional[str] = None  # URL or path to front ID image
    sa_back_id: Optional[str] = None   # URL or path to back ID image
    profile_photo: Optional[str] = None  # URL or path to profile photo

class ProviderInDB(ProviderBase):
    id: str
    password: str
    phone: Optional[str] = None
    business_name: Optional[str] = None
    service_type: Optional[str] = None
    hourly_rate: Optional[float] = None
    location: Optional[str] = None
    working_hours: Optional[str] = None
    sa_front_id: Optional[str] = None
    sa_back_id: Optional[str] = None
    profile_photo: Optional[str] = None
    rating: float = 0.0
    reviews_count: int = 0
    is_verified: bool = False
    image: str = "/images/placeholder.jpg"
    created_at: datetime
    updated_at: datetime
    is_active: bool = True 

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    user_type: Optional[str] = None  # "customer" or "provider"