from sqlalchemy import Column, BigInteger, Text, ForeignKey, and_
from sqlalchemy.orm import relationship, validates
from dataclasses import dataclass
from sqlalchemy.ext.hybrid import hybrid_property
from database.models.items import Item
from database.orm import Base, generate_db_session
from user import UserType

metadata = Base.metadata
@dataclass
class ServiceProviderMealPlan(Base):
    __tablename__ = 'service_providers_meal_plans'

    id: int
    description: str
    name: str

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _name = Column('name', Text, nullable=False)
    _description = Column('description', Text, nullable=False)

    user_id = Column(ForeignKey('service_providers.user_id', ondelete='CASCADE'), nullable=False)

    service_provider = relationship(
        'ServiceProvider',
        primaryjoin='ServiceProvider.user_id == ServiceProviderMealPlan.user_id',
        uselist=False,
        back_populates='meal_plans')
    prices = relationship(
        'MealPlanPrice',
        primaryjoin='MealPlanPrice.meal_plan_id == ServiceProviderMealPlan.id',
        uselist=True,
        back_populates='meal_plan')

    items = relationship(
      'MealPlanItem',
      primaryjoin='ServiceProviderMealPlan.id == MealPlanItem.meal_plan_id',
      uselist=True,
      back_populates='meal_plan')

    @hybrid_property
    def name(self):
        return self._name
    @name.setter
    def name(self, name):
        self._name = name

    @hybrid_property
    def description(self):
        return self._description
    @description.setter
    def description(self, description):
        self._description = description
    
    def get_items(self):
        return [x.item for x in self.items]

    def get_items_not_in_meal_plan(self):
        with generate_db_session() as db_session:
            meal_plan_item_ids = [x.id for x in self.get_items()]
            items_not_in_meal_plan = db_session.query(Item) \
                .filter(and_(Item.id.notin_(meal_plan_item_ids))) \
                .all()
        return items_not_in_meal_plan

    # @validates('service_provider')
    # def validate_user(self, key, service_provider):
    #     if not self.service_provider:
    #         raise Exception('Invalid user type for owning a meal plan')
    #     return service_provider
