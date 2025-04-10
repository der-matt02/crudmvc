# backend/routes/user_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.models.user_model import User
from backend.schemas.user_schema import UserCreate, UserInDB
from backend.config.db import SessionLocal

user = APIRouter()


# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# @user.get("/getUser/{user_id}", response_model=UserInDB)
# def get_user(user_id: int, db: Session = Depends(get_db)):
#     # Buscar al usuario por su ID
#     db_user = db.query(User).filter(User.id == user_id).first()
#
#     # Si no existe el usuario, lanzamos una excepción
#     if not db_user:
#         raise HTTPException(status_code=404, detail="User not found")
#
#     return db_user

@user.get("/getUsers", response_model=list[UserInDB])
def get_users(db: Session = Depends(get_db)):
    # Realizamos consulta con SQLAlchemy
    users = db.query(User).all()  # Consulta todos los usuarios
    return users


@user.post("/createUsers", response_model=UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Comprobacion si ya existe un usuario con ese username o email
    db_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")

    # Crear nuevo usuario
    db_user = User(
        username=user.username,
        name=user.name,
        last_name=user.last_name,
        email=user.email,
        password=user.password  # Hashear contrase;a
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@user.put("/updateUser/{user_id}", response_model=UserInDB)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    # Buscar al usuario Id
    db_user = db.query(User).filter(User.id == user_id).first()

    # Excepcion si no existe el usuario, lanzamos una excepción
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Actualizamos los campos
    db_user.username = user.username
    db_user.name = user.name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db_user.password = user.password

    # Guardamos los cambios en bd
    db.commit()
    db.refresh(db_user)

    return db_user


@user.delete("/deleteUser/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Buscar usuario por su ID
    db_user = db.query(User).filter(User.id == user_id).first()

    # Si no existe el usuario, lanzamos una excepción
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Eliminar el usuario de la bd
    db.delete(db_user)
    db.commit()

    return {"message": "User deleted successfully"}
