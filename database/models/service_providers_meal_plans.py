from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from user import UserType

metadata = Base.metadata

class ServiceProviderMealPlan(Base):
    __tablename__ = 'service_providers_meal_plans'

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

    @validates('user')
    def validate_user(self, key, user):
        if not user.compare_user_type(UserType.SERVICE_PROVIDER):
            raise Exception('Invalid user type')
        return user
