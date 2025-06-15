from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID, uuid4

class BookingBase(BaseModel):
    date: str
    time: str
    location: str
    description: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID
    provider_id: UUID
    status: str = "pending"  # pending, accepted, rejected, completed
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    images: Optional[list[str]] = None  # List of image URLs

    class Config:
        from_attributes = True

class BookingResponse(Booking):
    provider_name: str
    provider_email: str
    user_email: str 