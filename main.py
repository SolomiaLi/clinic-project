from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

@app.get("/api/doctors")
def get_doctors():
    return [
        {"id": 1, "name": "Dr. Sarah Smith", "specialty": "Cardiologist", "experience": 15},
        {"id": 2, "name": "Dr. Michael Lee", "specialty": "Dentist", "experience": 8},
        {"id": 3, "name": "Dr. Emma Brown", "specialty": "Pediatrician", "experience": 12}
    ]

@app.get("/api/services")
def get_services():
    return [
        {"id": 1, "title": "Cardiology", "description": "Advanced heart care.", "icon": "fa-solid fa-heart-pulse"},
        {"id": 2, "title": "Dentistry", "description": "Professional dental care.", "icon": "fa-solid fa-tooth"},
        {"id": 3, "title": "Ophthalmology", "description": "Expert eye checkups.", "icon": "fa-solid fa-eye"}
    ]

@app.post("/api/login")
def login(creds: LoginRequest):
    if creds.email == "admin@clinic.com" and creds.password == "123":
        return {"status": "success", "token": "fake-jwt-token"}
    raise HTTPException(status_code=401, detail="Error")

# --- НОВІ ЕНДПОІНТИ ДЛЯ SPA ---

@app.get("/api/profile")
def get_profile():
    return {
        "name": "John Doe",
        "email": "john.d@email.com",
        "phone": "+38 (050) 123-45-67",
        "address": "Kyiv, Khreshchatyk st. 1"
    }

@app.get("/api/users")
def get_users():
    return [
        {"id": 1, "name": "John Doe", "email": "admin@clinic.com", "role": "admin"},
        {"id": 2, "name": "Sarah Smith", "email": "sarah@clinic.com", "role": "regular"},
        {"id": 3, "name": "Mike Johnson", "email": "mike@clinic.com", "role": "regular"}
    ]