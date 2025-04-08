import uuid
from sqlalchemy import Column, String
from sqlalchemy.dialects.mysql import CHAR
from ..db.database import Base

class Customer(Base):
    __tablename__ = "users"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    address = Column(String(255), nullable=True)
