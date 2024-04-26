from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()


@app.get("/api/v1/hello")
async def read_root():
    return {"message": "Hello, World"}


@app.get("/")
async def read_ui():
    return {"message": "Dah root"}


app.mount("/", StaticFiles(directory="ui/dist", html=True), name="ui")
