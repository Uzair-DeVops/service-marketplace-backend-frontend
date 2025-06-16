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
        print("[DEBUG] Initializing BookingService")
        self.upload_dir = "uploaded_images/bookings"
        print(f"[DEBUG] Upload directory set to: {self.upload_dir}")

    async def create_booking(
        self,
        booking_data: BookingCreate,
        user_id: str,
        provider_id: str,
        images: Optional[List[UploadFile]] = None
    ) -> dict:
        print("\n[DEBUG] ====== STARTING BOOKING CREATION ======")
        print("[DEBUG] Starting create_booking service method")
        print(f"[DEBUG] Creating booking for user {user_id} with provider {provider_id}")
        
        # Verify user exists
        user = get_user_by_id(user_id)
        if not user:
            print(f"[ERROR] User {user_id} not found")
            raise HTTPException(status_code=404, detail="User not found")
        print(f"[DEBUG] Verified user exists: {user['email']}")

        # Verify provider exists
        provider = get_provider(provider_id)
        if not provider:
            print(f"[ERROR] Provider {provider_id} not found")
            raise HTTPException(status_code=404, detail="Provider not found")
        print(f"[DEBUG] Verified provider exists: {provider.business_name}")

        # Generate booking ID
        booking_id = str(uuid4())
        now = datetime.utcnow()
        print(f"[DEBUG] Generated booking ID: {booking_id}")

        # Handle image uploads
        image_urls = []
        if images:
            print(f"[DEBUG] Processing {len(images)} images for booking")
            os.makedirs(self.upload_dir, exist_ok=True)
            
            for image in images:
                # Generate unique filename
                timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
                filename = f"{booking_id}_{timestamp}_{image.filename}"
                filepath = os.path.join(self.upload_dir, filename)
                print(f"[DEBUG] Saving image: {filename}")
                
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
            print("\n[DEBUG] Bookings table structure:")
            for col in columns:
                print(f"  - {col[1]}: {col[2]}")

        # Create booking in database
        print("\n[DEBUG] ====== DATABASE INSERT OPERATION ======")
        print("[DEBUG] Inserting booking with the following data:")
        print(f"  id: {booking_id}")
        print(f"  user_id: {user_id}")
        print(f"  provider_id: {provider_id}")
        print(f"  date: {booking_data.date}")
        print(f"  time: {booking_data.time}")
        print(f"  location: {booking_data.location}")
        print(f"  description: {booking_data.description}")
        print(f"  status: pending")
        print(f"  images: {image_urls}")
        print(f"  created_at: {now}")
        print(f"  updated_at: {now}")

        query = """
        INSERT INTO bookings (
            id, customer_id, provider_id, service_date, service_time, 
            location, notes, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                now,
                now
            )
        )

        # Verify the inserted data
        print("\n[DEBUG] ====== VERIFYING INSERTED DATA ======")
        booking = execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        )
        
        # Map database column names to our model field names
        if booking:
            booking['user_id'] = booking.pop('customer_id')
            booking['date'] = booking.pop('service_date')
            booking['time'] = booking.pop('service_time')
            booking['description'] = booking.pop('notes')
            booking['images'] = []  # Add empty images list since it's not in DB
            
        print("[DEBUG] Retrieved booking data from database:")
        for key, value in booking.items():
            print(f"  {key}: {value}")
        
        print("[DEBUG] Completed create_booking service method")
        print("[DEBUG] ====== BOOKING CREATION COMPLETED ======\n")
        return booking

    def get_user_bookings(self, user_id: str) -> List[dict]:
        print(f"\n[DEBUG] ====== GETTING USER BOOKINGS ======")
        print(f"[DEBUG] Fetching bookings for user {user_id}")
        bookings = execute_query(
            "SELECT * FROM bookings WHERE customer_id = ? ORDER BY created_at DESC",
            (user_id,)
        )
        print(f"[DEBUG] Found {len(bookings)} bookings")
        
        # Map database column names to our model field names
        for booking in bookings:
            booking['user_id'] = booking.pop('customer_id')
            booking['date'] = booking.pop('service_date')
            booking['time'] = booking.pop('service_time')
            booking['description'] = booking.pop('notes')
            booking['images'] = []  # Add empty images list since it's not in DB
            
            print("\n[DEBUG] Booking details:")
            for key, value in booking.items():
                print(f"  {key}: {value}")
                
        print("[DEBUG] ====== USER BOOKINGS RETRIEVED ======\n")
        return bookings

    def get_provider_bookings(self, provider_id: str) -> List[dict]:
        print(f"\n[DEBUG] ====== GETTING PROVIDER BOOKINGS ======")
        print(f"[DEBUG] Fetching bookings for provider {provider_id}")
        bookings = execute_query(
            "SELECT * FROM bookings WHERE provider_id = ? ORDER BY created_at DESC",
            (provider_id,)
        )
        print(f"[DEBUG] Found {len(bookings)} bookings")
        
        # Map database column names to our model field names
        for booking in bookings:
            booking['user_id'] = booking.pop('customer_id')
            booking['date'] = booking.pop('service_date')
            booking['time'] = booking.pop('service_time')
            booking['description'] = booking.pop('notes')
            booking['images'] = []  # Add empty images list since it's not in DB
            
            print("\n[DEBUG] Booking details:")
            for key, value in booking.items():
                print(f"  {key}: {value}")
                
        print("[DEBUG] ====== PROVIDER BOOKINGS RETRIEVED ======\n")
        return bookings

    def update_booking_status(self, booking_id: str, status: str) -> dict:
        print(f"\n[DEBUG] ====== UPDATING BOOKING STATUS ======")
        print(f"[DEBUG] Updating booking {booking_id} to status: {status}")
        
        # Get current booking data
        booking = execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        )
        if not booking:
            print(f"[ERROR] Booking {booking_id} not found")
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Map database column names to our model field names
        booking['user_id'] = booking.pop('customer_id')
        booking['date'] = booking.pop('service_date')
        booking['time'] = booking.pop('service_time')
        booking['description'] = booking.pop('notes')
        booking['images'] = []  # Add empty images list since it's not in DB
            
        print("[DEBUG] Current booking data:")
        for key, value in booking.items():
            print(f"  {key}: {value}")

        now = datetime.utcnow()
        print(f"\n[DEBUG] Updating with new data:")
        print(f"  status: {status}")
        print(f"  updated_at: {now}")
        
        execute_query(
            "UPDATE bookings SET status = ?, updated_at = ? WHERE id = ?",
            (status, now, booking_id)
        )
        
        # Verify the update
        updated_booking = execute_query_one(
            "SELECT * FROM bookings WHERE id = ?",
            (booking_id,)
        )
        
        # Map database column names to our model field names
        updated_booking['user_id'] = updated_booking.pop('customer_id')
        updated_booking['date'] = updated_booking.pop('service_date')
        updated_booking['time'] = updated_booking.pop('service_time')
        updated_booking['description'] = updated_booking.pop('notes')
        updated_booking['images'] = []  # Add empty images list since it's not in DB
            
        print("\n[DEBUG] Updated booking data:")
        for key, value in updated_booking.items():
            print(f"  {key}: {value}")
            
        print("[DEBUG] ====== BOOKING STATUS UPDATE COMPLETED ======\n")
        return updated_booking 