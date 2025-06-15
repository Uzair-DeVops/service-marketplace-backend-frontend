import sqlite3
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

load_dotenv()

DB_PATH = os.getenv("SQLITE_DB_PATH", "app.db")
print(f"[DEBUG] Using database at: {DB_PATH}")

def init_db():
    """Initialize the database with required tables"""
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            
            # Create users table
            cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                is_active BOOLEAN DEFAULT 1
            )
            """)
            
            # Create providers table
            cur.execute("""
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
            )
            """)
            
            # Drop existing bookings table if it exists
            cur.execute("DROP TABLE IF EXISTS bookings")
            
            # Create bookings table with new schema
            cur.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id TEXT PRIMARY KEY,
                customer_id TEXT NOT NULL,
                provider_id TEXT NOT NULL,
                service_date TIMESTAMP NOT NULL,
                service_time TEXT NOT NULL,
                location TEXT NOT NULL,
                status TEXT DEFAULT 'pending',
                notes TEXT,
                created_at TIMESTAMP NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                FOREIGN KEY (customer_id) REFERENCES users(id),
                FOREIGN KEY (provider_id) REFERENCES providers(id),
                CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
            )
            """)
            
            conn.commit()
            logger.info("Database tables initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise

def get_db_connection():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except Exception as e:
        logger.error(f"Error connecting to database: {str(e)}")
        raise

def execute_query(query, params=None):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            logger.debug(f"Executing query: {query}")
            logger.debug(f"With params: {params}")
            cur.execute(query, params or ())
            if query.strip().upper().startswith('SELECT'):
                results = [dict(row) for row in cur.fetchall()]
                logger.debug(f"Query results: {results}")
                return results
            conn.commit()
            return None
    except Exception as e:
        logger.error(f"Error executing query: {str(e)}")
        raise

def execute_query_one(query, params=None):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            logger.debug(f"Executing query: {query}")
            logger.debug(f"With params: {params}")
            cur.execute(query, params or ())
            # Fetch result before commit for SELECT, INSERT, UPDATE, and DELETE (with RETURNING)
            if (
                query.strip().upper().startswith('SELECT') or
                query.strip().upper().startswith('INSERT') or
                query.strip().upper().startswith('UPDATE') or
                query.strip().upper().startswith('DELETE')
            ):
                row = cur.fetchone()
                conn.commit()
                result = dict(row) if row else None
                logger.debug(f"Query result: {result}")
                return result
            conn.commit()
            return None
    except Exception as e:
        logger.error(f"Error executing query: {str(e)}")
        raise

# Initialize database on module import
init_db() 