from pydantic import BaseModel, EmailStr
from typing import Optional

class UserSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None

    class Config:
        orm_mode = True