from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Clinic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


doctors_db = [
    {"id": 1, "name": "Олександр Коваленко", "specialty": "Головний лікар, Хірург", "experience": "15 років", "icon": "👨‍⚕️"},
    {"id": 2, "name": "Марія Мельник", "specialty": "Кардіолог", "experience": "10 років", "icon": "👩‍⚕️"},
    {"id": 3, "name": "Іван Бойко", "specialty": "Педіатр", "experience": "8 років", "icon": "👨‍⚕️"},
    {"id": 4, "name": "Олена Ткачук", "specialty": "Невропатолог", "experience": "12 років", "icon": "👩‍⚕️"},
    {"id": 5, "name": "Дмитро Шевченко", "specialty": "Офтальмолог", "experience": "7 років", "icon": "👨‍⚕️"},
    {"id": 6, "name": "Анна Павленко", "specialty": "Терапевт", "experience": "5 років", "icon": "👩‍⚕️"}
]

@app.get("/api/doctors")
def get_doctors():
    return doctors_db
services_db = [
    {
        "id": 1,
        "category": "Консультації спеціалістів",
        "items": [
            {"name": "Первинна консультація терапевта", "price": "500 грн"},
            {"name": "Консультація кардіолога (з ЕКГ)", "price": "850 грн"},
            {"name": "Консультація хірурга", "price": "700 грн"},
            {"name": "Повторна консультація лікаря", "price": "400 грн"}
        ]
    },
    {
        "id": 2,
        "category": "Апаратна діагностика",
        "items": [
            {"name": "УЗД органів черевної порожнини", "price": "600 грн"},
            {"name": "Комп'ютерна томографія (КТ)", "price": "1200 грн"}
        ]
    }
]

@app.get("/api/services")
def get_services():
    return services_db
users_db = [
    {"id": 1, "name": "Олеся", "email": "olesya@mail.com", "role": "User", "password": "111"},
    {"id": 2, "name": "Адмін", "email": "admin@gmail.com", "role": "Admin", "password": "1111"},
]


class LoginRequest(BaseModel):
    email: str
    password: str


class UserCreate(BaseModel):
    name: str
    email: str
    role: str
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str


@app.post("/api/login")
def login(credentials: LoginRequest):
    for user in users_db:
        if user["email"] == credentials.email and user["password"] == credentials.password:
            return {"message": "Успішний вхід", "user": {"id": user["id"], "role": user["role"]}}

    raise HTTPException(status_code=401, detail="Невірний email або пароль")


@app.get("/api/users", response_model=List[UserResponse])
def get_all_users():
    return users_db


@app.get("/api/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="Користувача не знайдено")


@app.post("/api/users", response_model=UserResponse)
def create_user(user: UserCreate):
    new_id = max(u["id"] for u in users_db) + 1 if users_db else 1
    new_user = user.dict()
    new_user["id"] = new_id
    users_db.append(new_user)
    return new_user


@app.put("/api/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_data: UserCreate):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db[index].update(updated_data.dict(exclude_unset=True))
            return users_db[index]
    raise HTTPException(status_code=404, detail="Користувача не знайдено")


@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db.pop(index)
            return {"message": "Користувача успішно видалено"}
    raise HTTPException(status_code=404, detail="Користувача не знайдено")