from fastapi import FastAPI

from src.smartphone.router import router as router_smartphone


app = FastAPI(title="Mobile Guru")


app.include_router(router_smartphone,)
