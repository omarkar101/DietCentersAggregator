
from sqlalchemy import Column, BigInteger, Text, ForeignKey, REAL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class MealPlanItem(Base):
  __tablename__ = 'meal_plans_items'

  item_id = Column(ForeignKey('items.id', ondelete='CASCADE'), primary_key=True)
  meal_plan_id = Column(ForeignKey('service_providers_meal_plans.id', ondelete='CASCADE'), primary_key=True)

  item = relationship(
    'Item',
    primaryjoin='Item.id == MealPlanItem.item_id',
    uselist=False,
    back_populates='meal_plans')
  
  meal_plan = relationship(
    'ServiceProviderMealPlan',
    primaryjoin='ServiceProviderMealPlan.id == MealPlanItem.meal_plan_id',
    uselist=False,
    back_populates='items')

  def as_dict(self):
    information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return information

# t_meal_plans_items = Table(
#   'meal_plans_items', Base.metadata,
#   Column('item_id', ForeignKey('items.id', ondelete='CASCADE'), primary_key=True),
#   Column('meal_plan_id', ForeignKey('service_providers_meal_plans.id', ondelete='CASCADE'), primary_key=True))
