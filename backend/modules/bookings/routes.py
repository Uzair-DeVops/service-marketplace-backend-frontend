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
    print("\n[DEBUG] ====== BOOKING CREATION REQUEST RECEIVED ======")
    print("[DEBUG] Request data:")
    print(f"  provider_id: {provider_id}")
    print(f"  user_id: {user_id}")
    print(f"  date: {date}")
    print(f"  time: {time}")
    print(f"  location: {location}")
    print(f"  description: {description}")
    print(f"  images: {[img.filename for img in images] if images else 'No images'}")

    # Check for missing required fields
    missing = []
    for field, value in [("provider_id", provider_id), ("user_id", user_id), ("date", date), ("time", time), ("location", location)]:
        if not value:
            missing.append(field)
    if missing:
        print(f"[ERROR] Missing required fields: {missing}")
        raise HTTPException(status_code=400, detail=f"Missing required fields: {', '.join(missing)}")

    booking_service = BookingService()
    booking_data = BookingCreate(
        date=date,
        time=time,
        location=location,
        description=description
    )
    
    print("\n[DEBUG] Creating booking with service...")
    booking = await booking_service.create_booking(
        booking_data=booking_data,
        user_id=user_id,
        provider_id=provider_id,
        images=images
    )
    
    print("\n[DEBUG] Fetching provider details...")
    provider = get_provider(provider_id)
    
    print("\n[DEBUG] Preparing response...")
    response = BookingResponse(
        **booking,
        provider_name=provider.business_name if provider else None,
        provider_email=provider.email if provider else None,
        user_email=user_id
    )
    
    print("\n[DEBUG] Response data:")
    for key, value in response.dict().items():
        print(f"  {key}: {value}")
    
    print("[DEBUG] ====== BOOKING CREATION REQUEST COMPLETED ======\n")
    return response

@router.get("", response_model=List[BookingResponse])
async def get_my_bookings():
    print("\n[DEBUG] ====== GET MY BOOKINGS REQUEST RECEIVED ======")
    booking_service = BookingService()
    
    print("[DEBUG] Fetching bookings...")
    bookings = booking_service.get_user_bookings(None)
    
    print("\n[DEBUG] Processing bookings...")
    response_bookings = []
    for booking in bookings:
        provider = get_provider(booking["provider_id"])
        response_booking = BookingResponse(
            **booking,
            provider_name=provider.business_name if provider else None,
            provider_email=provider.email if provider else None,
            user_email=None
        )
        response_bookings.append(response_booking)
    
    print(f"\n[DEBUG] Found {len(response_bookings)} bookings")
    for booking in response_bookings:
        print("\n[DEBUG] Booking details:")
        for key, value in booking.dict().items():
            print(f"  {key}: {value}")
    
    print("[DEBUG] ====== GET MY BOOKINGS REQUEST COMPLETED ======\n")
    return response_bookings

@router.patch("/{booking_id}/status")
async def update_booking_status(
    booking_id: str,
    status: str
):
    print("\n[DEBUG] ====== UPDATE BOOKING STATUS REQUEST RECEIVED ======")
    print(f"[DEBUG] Request data:")
    print(f"  booking_id: {booking_id}")
    print(f"  status: {status}")
    
    booking_service = BookingService()
    
    print("\n[DEBUG] Verifying booking exists...")
    booking = execute_query_one(
        "SELECT * FROM bookings WHERE id = ?",
        (booking_id,)
    )
    if not booking:
        print(f"[ERROR] Booking {booking_id} not found")
        raise HTTPException(status_code=404, detail="Booking not found")
    
    print("\n[DEBUG] Updating booking status...")
    updated_booking = booking_service.update_booking_status(booking_id, status)
    
    print("\n[DEBUG] Response data:")
    for key, value in updated_booking.items():
        print(f"  {key}: {value}")
    
    print("[DEBUG] ====== UPDATE BOOKING STATUS REQUEST COMPLETED ======\n")
    return updated_booking 