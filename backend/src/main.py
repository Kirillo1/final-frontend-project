# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.users.base_config import fastapi_users, auth_backend
from src.users.schemas import UserRead, UserCreate, UserUpdate
from src.smartphone.router import router as router_smartphone
from src.accessory.router import router as router_accessory
from src.users.router import router as router_users

app = FastAPI(title="Mobile Guru")

# Настройка CORS
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["*"],
)

# Аутентификация и регистрация
app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

# Пользователи
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["Users"]
)

app.include_router(
    router_smartphone,
    prefix="/smartphones",
    tags=["smartphones"]
)

app.include_router(
    router_accessory,
    prefix="/accessories",
    tags=["accessories"]
)

app.include_router(
    router_users,
    prefix="/users",
    tags=["Users"]
)
