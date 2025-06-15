from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from typing import List
from .models import ProviderCreate, ProviderUpdate, ProviderInDB, BusinessDetails
from .service import (
    create_provider,
    update_business_details,
    get_provider,
    get_provider_by_email,
    update_provider,
    delete_provider,
    list_providers,
    verify_password,
    get_password_hash,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    verify_token
)
import os
from fastapi.responses import JSONResponse

router = APIRouter(tags=["providers"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/register", response_model=dict)
def register_provider(provider: ProviderCreate):
    """Step 1: Register a new provider with basic info"""
    # Check if provider already exists
    if get_provider_by_email(provider.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new provider
    provider.password = get_password_hash(provider.password)
    provider_obj = provider
    provider = create_provider(provider_obj)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": provider.email, "user_type": "provider", "provider_id": provider.id},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer", "provider_id": provider.id}

@router.post("/login", response_model=dict)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login for providers"""
    provider = get_provider_by_email(form_data.username)
    print("Provider from DB:", provider)
    print("Password from form:", form_data.password)
    if not provider:
        print("Provider not found")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Debug password check
    password_check = verify_password(form_data.password, provider.password)
    print("Password check result:", password_check)
    if not password_check:
        print("Password does not match")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not provider.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Provider account is inactive",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": provider.email, "user_type": "provider", "provider_id": provider.id},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "provider_id": provider.id}

@router.post("/token", response_model=dict)
def login_token(form_data: OAuth2PasswordRequestForm = Depends()):
    return login(form_data)

@router.post("/{provider_id}/business-details", response_model=ProviderInDB)
async def add_business_details(
    provider_id: str,
    business_name: str = Form(...),
    service_type: str = Form(...),
    hourly_rate: float = Form(...),
    location: str = Form(...),
    working_hours: str = Form(...),
    sa_front_id: UploadFile = File(...),
    sa_back_id: UploadFile = File(...),
    profile_photo: UploadFile = File(...)
):
    # Save files
    async def save_file(file: UploadFile):
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return f"/uploaded_images/{file.filename}"

    sa_front_id_path = await save_file(sa_front_id)
    sa_back_id_path = await save_file(sa_back_id)
    profile_photo_path = await save_file(profile_photo)

    business_details = BusinessDetails(
        business_name=business_name,
        service_type=service_type,
        hourly_rate=hourly_rate,
        location=location,
        working_hours=working_hours,
        sa_front_id=sa_front_id_path,
        sa_back_id=sa_back_id_path,
        profile_photo=profile_photo_path
    )
    return update_business_details(provider_id, business_details)

@router.get("/me", response_model=ProviderInDB)
async def get_current_provider():
    """Get current provider's details (now public, returns first provider)"""
    providers = list_providers(limit=1)
    if not providers:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No providers found")
    return providers[0]

@router.get("/{provider_id}", response_model=ProviderInDB)
async def get_provider_details(provider_id: str):
    """Get provider details by ID"""
    provider = get_provider(provider_id)
    if not provider:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider not found"
        )
    return provider

@router.put("/{provider_id}", response_model=ProviderInDB)
async def update_provider_details(
    provider_id: str,
    full_name: str = Form(None),
    email: str = Form(None),
    password: str = Form(None),
    phone: str = Form(None),
    business_name: str = Form(None),
    service_type: str = Form(None),
    hourly_rate: float = Form(None),
    location: str = Form(None),
    working_hours: str = Form(None),
    sa_front_id: UploadFile = File(None),
    sa_back_id: UploadFile = File(None),
    profile_photo: UploadFile = File(None)
):
    # Save new images if provided
    async def save_file(file: UploadFile):
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as f:
            f.write(await file.read())
        return f"/uploaded_images/{file.filename}"

    update_data = {}
    if full_name is not None: update_data["full_name"] = full_name
    if email is not None: update_data["email"] = email
    if password is not None: update_data["password"] = get_password_hash(password)
    if phone is not None: update_data["phone"] = phone
    if business_name is not None: update_data["business_name"] = business_name
    if service_type is not None: update_data["service_type"] = service_type
    if hourly_rate is not None: update_data["hourly_rate"] = hourly_rate
    if location is not None: update_data["location"] = location
    if working_hours is not None: update_data["working_hours"] = working_hours
    if sa_front_id is not None:
        update_data["sa_front_id"] = await save_file(sa_front_id)
    if sa_back_id is not None:
        update_data["sa_back_id"] = await save_file(sa_back_id)
    if profile_photo is not None:
        update_data["profile_photo"] = await save_file(profile_photo)

    provider_update = ProviderUpdate(**update_data)
    updated_provider = update_provider(provider_id, provider_update)
    if not updated_provider:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider not found"
        )
    return updated_provider

@router.delete("/{provider_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_provider_account(
    provider_id: str
):
    """Delete provider account"""
    # Verify the provider exists
    provider = get_provider(provider_id)
    if not provider:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider not found"
        )
    success = delete_provider(provider_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Provider not found"
        )

@router.get("/", response_model=List[ProviderInDB])
async def get_all_providers(skip: int = 0, limit: int = 100):
    """List all providers"""
    return list_providers(skip=skip, limit=limit) 