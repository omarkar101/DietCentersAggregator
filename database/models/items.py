from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
# from database.models.meal_plans_items import t_meal_plans_items

metadata = Base.metadata

class Item(Base):
  __tablename__ = 'items'

  id = Column(BigInteger, primary_key=True, autoincrement=True)
  # category must be a foreign key
  _category = Column('category', Text, nullable=False)
  _description = Column('description', Text, nullable=False)
  _name = Column('name', Text, nullable=False)

  user_id = Column(ForeignKey('service_providers.user_id', ondelete='CASCADE'), nullable=False)

  service_provider = relationship(
    'ServiceProvider',
    primaryjoin='ServiceProvider.user_id == Item.user_id',
    uselist=False,
    back_populates='items')

  meal_plans = relationship(
    'MealPlanItem',
    primaryjoin='Item.id == MealPlanItem.item_id',
    uselist=True,
    back_populates='item')

  @hybrid_property
  def category(self):
    return self._category
  @category.setter
  def category(self, category):
    self._category = category
  @hybrid_property
  def description(self):
    return self._description
  @description.setter
  def description(self, description):
    self._description = description
  @hybrid_property
  def name(self):
    return self._name
  @name.setter
  def name(self, name):
    self._name = name

  def as_dict(self):
    information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return information
