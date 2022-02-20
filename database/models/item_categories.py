from sqlalchemy import Column, BigInteger, Text, ForeignKey
from database.orm import Base

metadata = Base.metadata

class ItemCategory(Base):
  __tablename__ = 'item_categories'

  category_id = Column(ForeignKey('categories.id'), primary_key=True)
  item_id = Column('items.id', primary_key=True)
