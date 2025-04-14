from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta

# Configuración para hashing (bcrypt es ampliamente conocido)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica que la contraseña en texto plano concuerde con su hash."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Genera el hash para una contraseña en texto plano."""
    return pwd_context.hash(password)

# Configuración de JWT
SECRET_KEY = "SECRET_JWT_KEY"  # Cambia esta clave por una segura en producción
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Crea un token JWT incluyendo la información de `data` (p.ej., {"sub": username})
    y la fecha de expiración.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    token_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt
