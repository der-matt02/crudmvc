# backend/models/user.py
from sqlalchemy import Column, Integer, String
from backend.config.db import Base  # Importa Base desde config

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)  # Almacena el hash de la contraseña
