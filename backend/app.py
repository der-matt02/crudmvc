from fastapi import FastAPI
from backend.routes.user_routes import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los orígenes (ajústalo a tu frontend si es necesario)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos HTTP
    allow_headers=["*"],  # Permitir todos los headers
)

# Rutas con prefijo
app.include_router(user, prefix="/users")
