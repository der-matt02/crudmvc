import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.mysql import CHAR
from ..db.database import Base

class UserModel(Base):
    __tablename__ = "users"

    user_id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_name = Column(String(100), nullable=False)
    user_email = Column(String(100), unique=True, nullable=False)
    user_address = Column(String(255), nullable=True)
