from fastapi import FastAPI
from backend.routes.user_routes import user

app = FastAPI()

app.include_router(user, prefix="/users")
