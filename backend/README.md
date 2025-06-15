# Service Marketplace Backend

This is the backend API for the Service Marketplace application, built with FastAPI and NeonDB.

## Setup

1. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:

```
NEON_DATABASE_URL=your_neon_database_url
SECRET_KEY=your_secret_key_for_jwt
```

4. Initialize the database:

```bash
psql your_neon_database_url -f schema.sql
```

5. Run the application:

```bash
uvicorn main:app --reload
```

## API Endpoints

### Authentication

- `POST /api/auth/register/customer` - Register a new customer
- `POST /api/auth/register/provider` - Register a new service provider
- `POST /api/auth/login` - Login (returns JWT token)

### Users (Customers)

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `DELETE /api/users/me` - Delete current user account

### Providers

- `GET /api/providers/me` - Get current provider profile
- `PUT /api/providers/me` - Update current provider profile
- `DELETE /api/providers/me` - Delete current provider account
- `GET /api/providers/service/{service_type}` - Get providers by service type

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## Data Models

### User (Customer)

- id: UUID
- email: string
- full_name: string
- password: string (hashed)
- phone: string (optional)
- address: string (optional)
- created_at: timestamp
- updated_at: timestamp
- is_active: boolean

### Provider

- id: UUID
- email: string
- full_name: string
- password: string (hashed)
- phone: string (optional)
- business_name: string (optional)
- service_type: string (optional)
- hourly_rate: decimal (optional)
- location: string (optional)
- working_hours: string (optional)
- rating: decimal
- reviews_count: integer
- is_verified: boolean
- created_at: timestamp
- updated_at: timestamp
- is_active: boolean
