from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from src.users.base_config import auth_backend, fastapi_users
from src.users.schemas import UserRead, UserCreate
from src.users import roles

from src.smartphone.router import router as router_smartphone


app = FastAPI(title="Mobile Guru")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=["*"],
)


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

app.include_router(
    roles.router, 
    prefix="/roles", 
    tags=["roles"]
)

app.include_router(
    router_smartphone,
    prefix="/smartphones",
    tags=["smartphones"]
    )
