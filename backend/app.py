# backend/app.py
from fastapi import FastAPI
from backend.config.db import engine, Base
from backend.models.user_model import User  # Importar para registrar el modelo en la metadata; no se usa directamente.
from backend.routers import auth  # Router de autenticación (login/registro)
from backend.routers import user_routes

from fastapi.middleware.cors import CORSMiddleware


# **Nuevo:** Router para el CRUD de usuarios

app = FastAPI()

# Agregar middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Referencia explícita al modelo para su registro en la metadata
_ = User.__table__

# Crear las tablas en la base de datos si no existen
Base.metadata.create_all(bind=engine)

# Incluir routers
app.include_router(auth.router)
app.include_router(user_routes.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
