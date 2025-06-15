from typing import List
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from ..providers.models import ProviderInDB
from ..providers.service import get_provider
from .service import BookingService
from .models import Booking, BookingCreate, BookingResponse
from database import execute_query_one
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/me/bookings", tags=["bookings"])

@router.post("", response_model=BookingResponse)
async def create_booking(
    provider_id: str = Form(...),
    user_id: str = Form(...),
    date: str = Form(...),
    time: str = Form(...),
    location: str = Form(...),
    description: str = Form(None),
    images: List[UploadFile] = File(None)
):
    print("[DEBUG] Received booking request:")
    print(f"  provider_id: {provider_id}")
    print(f"  user_id: {user_id}")
    print(f"  date: {date}")
    print(f"  time: {time}")
    print(f"  location: {location}")
    print(f"  description: {description}")
    print(f"  images: {[img.filename for img in images] if images else images}")

    # Check for missing required fields
    missing = []
    for field, value in [("provider_id", provider_id), ("user_id", user_id), ("date", date), ("time", time), ("location", location)]:
        if not value:
            missing.append(field)
    if missing:
        print(f"[ERROR] Missing required fields: {missing}")

    booking_service = BookingService()
    booking_data = BookingCreate(
        date=date,
        time=time,
        location=location,
        description=description
    )
    booking = await booking_service.create_booking(
        booking_data=booking_data,
        user_id=user_id,
        provider_id=provider_id,
        images=images
    )
    provider = get_provider(provider_id)
    response = BookingResponse(
        **booking,
        provider_name=provider.business_name if provider else None,
        provider_email=provider.email if provider else None,
        user_email=user_id
    )
    return response

@router.get("", response_model=List[BookingResponse])
async def get_my_bookings():
    booking_service = BookingService()
    bookings = booking_service.get_user_bookings(None)
    response_bookings = []
    for booking in bookings:
        provider = get_provider(booking["provider_id"])
        response_bookings.append(
            BookingResponse(
                **booking,
                provider_name=provider.business_name if provider else None,
                provider_email=provider.email if provider else None,
                user_email=None
            )
        )
    return response_bookings

@router.patch("/{booking_id}/status")
async def update_booking_status(
    booking_id: str,
    status: str
):
    booking_service = BookingService()
    booking = execute_query_one(
        "SELECT * FROM bookings WHERE id = ?",
        (booking_id,)
    )
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    updated_booking = booking_service.update_booking_status(booking_id, status)
    return updated_booking 