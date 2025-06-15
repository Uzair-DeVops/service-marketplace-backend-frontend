-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT 1
);

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    business_name TEXT,
    service_type TEXT,
    hourly_rate REAL,
    location TEXT,
    working_hours TEXT,
    rating REAL DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT 0,
    image TEXT DEFAULT '/images/placeholder.jpg',
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT 1
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    service_date TIMESTAMP NOT NULL,
    service_time TEXT NOT NULL,
    service_type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    total_amount REAL NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (provider_id) REFERENCES providers(id),
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
); 