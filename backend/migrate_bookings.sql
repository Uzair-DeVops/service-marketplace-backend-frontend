-- First, create a temporary table with the new structure
CREATE TABLE IF NOT EXISTS bookings_new (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    images TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    CHECK (status IN ('pending', 'accepted', 'rejected', 'completed'))
);

-- Copy data from old table to new table with transformations
INSERT INTO bookings_new (
    id,
    user_id,
    provider_id,
    date,
    time,
    location,
    description,
    status,
    images,
    created_at,
    updated_at
)
SELECT 
    id,
    customer_id as user_id,
    provider_id,
    service_date as date,
    service_time as time,
    service_type as location,  -- Using service_type as location temporarily
    notes as description,
    status,
    NULL as images,  -- No images in old table
    created_at,
    updated_at
FROM bookings;

-- Drop the old table
DROP TABLE bookings;

-- Rename the new table to the original name
ALTER TABLE bookings_new RENAME TO bookings;

-- Print confirmation
SELECT 'Bookings table migration completed successfully' as message; 