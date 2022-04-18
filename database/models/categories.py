from sqlalchemy import Column, BigInteger, Text, ForeignKey
from database.orm import Base

class Category(Base):
  __tablename__ = 'categories'

  id = Column(BigInteger, primary_key=True, autoincrement=True)
  _name = Column('name', Text, nullable=False)
  def as_dict(self):
    information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return information
