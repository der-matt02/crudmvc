# backend/schemas/user_schema.py
from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    username: str
    name: str
    last_name: str
    email: str
    password: str


class UserCreate(UserBase):
    pass


class UserInDB(UserBase):
    id: int

    class Config:
        orm_mode = True  # Esto permite que Pydantic convierta modelos SQLAlchemy en dictos
