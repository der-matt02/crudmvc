# backend/schemas/user_schema.py
from pydantic import BaseModel, constr

class UserBase(BaseModel):
    username: constr(min_length=3, max_length=50)

class UserCreate(UserBase):
    password: constr(min_length=6)

class UserUpdate(UserBase):
    # El campo password es opcional para la actualización
    password: constr(min_length=6) | None = None

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True
        #orm_mode = True

