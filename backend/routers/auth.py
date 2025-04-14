from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend.auth.utils import verify_password,create_access_token
from backend.models.user_model import User
from backend.dependencies.security import get_db, get_current_user

router = APIRouter()

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Endpoint para obtener el token JWT mediante OAuth2.
    Recibe los datos del usuario en formato application/x-www-form-urlencoded.
    """
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token({"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/usuarios/me")
def read_current_user(current_user: User = Depends(get_current_user)):
    """Ruta protegida que retorna la información del usuario autenticado."""
    return {"id": current_user.id, "username": current_user.username}
