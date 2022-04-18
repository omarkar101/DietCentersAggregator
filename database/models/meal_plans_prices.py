from sqlalchemy import Column, BigInteger, Text, ForeignKey, REAL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class MealPlanPrice(Base):
    __tablename__ = 'meal_plans_prices'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _price = Column('price', REAL, nullable=False)
    _currency = Column('currency', Text, nullable=False)

    meal_plan_id = Column(ForeignKey('service_providers_meal_plans.id', ondelete='CASCADE'), nullable=False)

    meal_plan = relationship(
        'ServiceProviderMealPlan',
        primaryjoin='ServiceProviderMealPlan.id == MealPlanPrice.meal_plan_id',
        uselist=False,
        back_populates='prices')

    @hybrid_property
    def price(self):
        return self._price
    @price.setter
    def price(self, price):
        self._price = price

    @hybrid_property
    def currency(self):
        return self._currency
    @currency.setter
    def currency(self,currency):
        self._currency = currency

    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return information
