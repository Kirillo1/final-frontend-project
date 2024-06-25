from fastapi import FastAPI

from src.users.base_config import auth_backend, fastapi_users
from src.users.schemas import UserRead, UserCreate

from src.smartphone.router import router as router_smartphone


app = FastAPI(title="Mobile Guru")


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


app.include_router(router_smartphone,)
