from sqlalchemy import Column, BigInteger, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class Client(Base):
    __tablename__ = 'clients'

    _first_name = Column('first_name', Text, nullable=False)
    _last_name = Column('last_name', Text, nullable=False)
    _subscription_counter = Column('subscription_counter', BigInteger, nullable=True)
    _preferred_meal = Column('preferred_meal',BigInteger, nullable=True)
    _last_ordered_meal_date = Column('last_ordered_meal_date',DateTime, nullable=True)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, primary_key=True)
    
    _meal_plan_id = Column('meal_plan_id', ForeignKey('service_providers_meal_plans.id', ondelete='CASCADE'), nullable=True)

    user = relationship(
        'User',
        uselist=False,
        back_populates='client')
    meal_plan = relationship(
        'ServiceProviderMealPlan',
        primaryjoin = 'ServiceProviderMealPlan.id == Client.meal_plan_id',
        uselist=False,
        back_populates='clients')
    biometrics = relationship(
        'ClientBiometrics',
        uselist=False,
        back_populates='client')

    @hybrid_property
    def first_name(self):
        return self._first_name
    @first_name.setter
    def first_name(self, first_name):
        self._first_name = first_name

    @hybrid_property
    def last_name(self):
        return self._last_name
    @last_name.setter
    def last_name(self, last_name):
        self._last_name = last_name

    @hybrid_property
    def preferred_meal(self):
        return self._preferred_meal
    @preferred_meal.setter
    def preferred_meal(self, preferred_meal):
        self._preferred_meal = preferred_meal

    @hybrid_property
    def meal_plan_id(self):
        return self._meal_plan_id
    @meal_plan_id.setter
    def meal_plan_id(self, meal_plan_id):
        self._meal_plan_id= meal_plan_id
    # def changeid(self , id_of_meal_plan):
    #     self.meal_plan_id = id_of_meal_plan
    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        information['email'] = self.user.credentials.email
        information['phone_number'] = self.user.phone_number
        information['location'] = ''
        if len(self.user.addresses) > 0:
            information['location'] = 'Country: ' + self.user.addresses[0].country + '\nCity: ' + self.user.addresses[0].city + '\nStreet: ' + self.user.addresses[0].street + '\nBuilding: ' + self.user.addresses[0].building + '\nFloor: ' + self.user.addresses[0].floor
        return information

    @hybrid_property
    def subscription_counter(self):
        return self._subscription_counter
    @subscription_counter.setter
    def subscription_counter(self, subscription_counter):
        self._subscription_counter = subscription_counter

    @hybrid_property
    def last_ordered_meal_date(self):
        return self._last_ordered_meal_date
    @last_ordered_meal_date.setter
    def last_ordered_meal_date(self, last_ordered_meal_date):
        self._last_ordered_meal_date = last_ordered_meal_date
