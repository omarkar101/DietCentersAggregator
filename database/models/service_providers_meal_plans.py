from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class ServiceProviderMealPlan(Base):
    __tablename__ = 'service_provdiders_meal_plans'
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _name = Column('name', Text, nullable=False)
    _description = Column('description', Text, nullable=False)

    user_id = Column(ForeignKey('users.id'), nullable=False)

    user = relationship(
        'User',
        primaryjoin='User.id == ServiceProviderMealPlan.user_id',
        uselist=False,
        back_populates='service_provider_meal_plans')
    
    @hybrid_property
    def name(self):
        return self._name
    @name.setter
    def name(self, name):
        self._phone_number = name

    @hybrid_property
    def description(self):
        return self._description
    @description.setter
    def description(self,description):
        self._description = description
    