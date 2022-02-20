from sqlalchemy import Column, BigInteger, Text, ForeignKey
from database.orm import Base

class Category(Base):
  __tablename__ = 'categories'

  id = Column(BigInteger, primary_key=True, autoincrement=True)
  _name = Column('name', Text, nullable=False)
