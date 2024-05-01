from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware


from models import AutoModels

engine = create_async_engine(
    "postgresql+asyncpg://postgres:postgres@db:5432/dvdrental", echo=True
)

auto_models = None

async def lifespan(app):
    print("startup")
    global auto_models
    auto_models = await AutoModels.create(engine)
    yield
    print("shutdown")

app = FastAPI(lifespan=lifespan)

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your React app's origin here
    allow_credentials=True,
    allow_methods=["GET"],  # Specify the allowed HTTP methods
    allow_headers=["*"],  # Allow all headers for simplicity, you can restrict them if needed
)

@app.get("/api/v1/hello")
async def root():
    return {"message": "Hello World"}

@app.get("/api/v1/films")
async def films():
    Film = await auto_models.get("film")
    results = []

    async with AsyncSession(engine) as session:
        films = await session.execute(select(Film))
        for film in films.scalars().all():
            results.append(
                {
                    "title": film.title,
                    "description": film.description,
                    "id": film.film_id,
                }
            )
    return results

app.mount("/", StaticFiles(directory="ui/dist", html=True), name="ui")
