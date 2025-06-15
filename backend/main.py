from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from modules.users.routes import router as users_router
from modules.providers.routes import router as providers_router
from modules.bookings.routes import router as bookings_router
import uvicorn

app = FastAPI(title="Service Marketplace API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(providers_router, prefix="/api/providers", tags=["providers"])
app.include_router(bookings_router)

app.mount("/uploaded_images", StaticFiles(directory="uploaded_images"), name="uploaded_images")

@app.get("/")
async def root():
    return {"message": "Welcome to Service Marketplace API"} 


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)