from fastapi import FastAPI
from pydantic import BaseModel, Field

from typing import List

app = FastAPI(title="Mobile Guru")


# @app.get("/", response_model=List[Smartphone])
# async def get_smartphones():
#     pass


@app.get("/smartphone/{smartphone_id}")
async def get_smartphone(smartphone_id: int):
    pass


@app.post("/add_smartphone")
async def add_smartphone():
    pass


@app.post("/edit_smartphone/{smartphone_id}")
async def edit_smartphone(smartphone_id: int):
    pass


@app.get("/delete_smartphone/{smartphone_id}")
async def delete_smartphone(smartphone_id: int):
    pass
