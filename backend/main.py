from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Clinic API")

# 1. НАЛАШТУВАННЯ CORS (Дозволяємо фронтенду стукати сюди)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],  # Порт нашого React-додатка
    allow_credentials=True,
    allow_methods=["*"],  # Дозволяємо всі методи (GET, POST, PUT, DELETE)
    allow_headers=["*"],
)

# --- ТИМЧАСОВА БАЗА ДАНИХ ---
# --- ДАНІ ПРО ЛІКАРІВ ---
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
# --- ДАНІ ПРО ПОСЛУГИ ТА ЦІНИ ---
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

# Ендпоінт для отримання списку послуг
@app.get("/api/services")
def get_services():
    return services_db
users_db = [
    {"id": 1, "name": "Олеся", "email": "olesya@mail.com", "role": "User", "password": "111"},
    {"id": 2, "name": "Адмін", "email": "admin@gmail.com", "role": "Admin", "password": "1111"},
]


# --- Pydantic Схеми (для перевірки JSON, який прилітає з фронту) ---
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


# --- ЕНДПОІНТИ (API Routes) ---

# 1. Логін
@app.post("/api/login")
def login(credentials: LoginRequest):
    for user in users_db:
        if user["email"] == credentials.email and user["password"] == credentials.password:
            # Повертаємо дані юзера (без пароля!)
            return {"message": "Успішний вхід", "user": {"id": user["id"], "role": user["role"]}}

    raise HTTPException(status_code=401, detail="Невірний email або пароль")


# 2. Отримати всіх користувачів (Read)
@app.get("/api/users", response_model=List[UserResponse])
def get_all_users():
    return users_db


# 3. Отримати одного користувача за ID (Read)
@app.get("/api/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    raise HTTPException(status_code=404, detail="Користувача не знайдено")


# 4. Створити користувача (Create)
@app.post("/api/users", response_model=UserResponse)
def create_user(user: UserCreate):
    new_id = max(u["id"] for u in users_db) + 1 if users_db else 1
    new_user = user.dict()
    new_user["id"] = new_id
    users_db.append(new_user)
    return new_user


# 5. Оновити користувача (Update)
@app.put("/api/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, updated_data: UserCreate):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db[index].update(updated_data.dict(exclude_unset=True))
            return users_db[index]
    raise HTTPException(status_code=404, detail="Користувача не знайдено")


# 6. Видалити користувача (Delete)
@app.delete("/api/users/{user_id}")
def delete_user(user_id: int):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db.pop(index)
            return {"message": "Користувача успішно видалено"}
    raise HTTPException(status_code=404, detail="Користувача не знайдено")