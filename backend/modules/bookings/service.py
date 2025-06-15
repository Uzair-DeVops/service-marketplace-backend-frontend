import os
from datetime import datetime
from typing import List, Optional
from uuid import uuid4
from fastapi import UploadFile, HTTPException
from ..users.service import get_user_by_id
from ..providers.service import get_provider
from .models import Booking, BookingCreate
from database import execute_query, execute_query_one, get_db_connection

class BookingService:
    def __init__(self):
        self.upload_dir = "uploaded_images/bookings"

    async def create_booking(
        self,
        booking_data: BookingCreate,
        user_id: str,
        provider_id: str,
        images: Optional[List[UploadFile]] = None
    ) -> dict:
        # Verify user exists
        user = get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Verify provider exists
        provider = get_provider(provider_id)
        if not provider:
            raise HTTPException(status_code=404, detail="Provider not found")

        # Generate booking ID
        booking_id = str(uuid4())
        now = datetime.utcnow()

        # Handle image uploads
        image_urls = []
        if images:
            os.makedirs(self.upload_dir, exist_ok=True)
            
            for image in images:
                # Generate unique filename
                timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
                filename = f"{booking_id}_{timestamp}_{image.filename}"
                filepath = os.path.join(self.upload_dir, filename)
                
                # Save image
                with open(filepath, "wb") as f:
                    content = await image.read()
                    f.write(content)
                
                image_urls.append(f"/uploads/bookings/{filename}")

        # Debug: print current bookings table columns
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("PRAGMA table_info(bookings);")
            columns = cur.fetchall()
            print("[DEBUG] bookings table columns:", [(col[1], col[2]) for col in columns])

        # Create booking in database
        query = """
        INSERT INTO bookings (
            id, user_id, provider_id, date, time, location, 
            description, status, images, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        
        execute_query(
            query,
            (
                booking_id,
                user_id,
                provider_id,
                booking_data.date,
                booking_data.time,
                booking_data.location,
                booking_data.description,
                "pending",
                ",".join(image_urls) if image_urls else None,
                now,
                now
            )
        )

        # Get created booking
        booking = execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        )
        
        return booking

    def get_user_bookings(self, user_id: str) -> List[dict]:
        return execute_query(
            "SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC",
            (user_id,)
        )

    def get_provider_bookings(self, provider_id: str) -> List[dict]:
        return execute_query(
            "SELECT * FROM bookings WHERE provider_id = ? ORDER BY created_at DESC",
            (provider_id,)
        )

    def update_booking_status(self, booking_id: str, status: str) -> dict:
        booking = execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        )
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")

        now = datetime.utcnow()
        execute_query(
            "UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?",
            (status, now, booking_id)
        )
        
        return execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        ) 