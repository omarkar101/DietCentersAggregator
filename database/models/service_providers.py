from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata
@dataclass
class ServiceProvider(Base):
    __tablename__ = 'service_providers'

    name: str

    _name = Column('name', Text, nullable=False, unique=True)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), primary_key=True, nullable=False)

    user = relationship(
        'User',
        uselist=False,
        back_populates='service_provider')
    meal_plans = relationship(
        'ServiceProviderMealPlan',
        uselist=True,
        back_populates='service_provider')
    items = relationship(
        'Item',
        primaryjoin='ServiceProvider.user_id == Item.user_id',
        uselist=True,
        back_populates='service_provider')

    @hybrid_property
    def name(self):
        return self._name
    @name.setter
    def name(self, name):
        self._name = name
