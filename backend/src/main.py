from fastapi import FastAPI


app = FastAPI()


@app.get("/")
async def get_smartphones():
    pass


@app.get("/smartphone")
async def get_smartphone():
    pass
