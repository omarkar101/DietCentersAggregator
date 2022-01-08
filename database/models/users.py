from sqlalchemy import Column, BigInteger
from database.orm import Base

metadata = Base.metadata

class User(Base):
    __tablename__ = 'users'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
