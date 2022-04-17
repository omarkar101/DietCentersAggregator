from flask import current_app
from sqlalchemy import Column, BigInteger, Text, ForeignKey, and_
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from sqlalchemy.ext.hybrid import hybrid_property
from database.models.items import Item
from database.orm import Base, generate_db_session
from azure.storage.blob import BlockBlobService
import uuid
from user import UserType

blob_service = BlockBlobService(
  account_name='299storage',
  account_key='59A1sn1/V/JbS9fCQvtgWcJsP9WZYOJJMDnm+FZjCRFzsRtNYVce/NP7MZDHaf4VlhQgAlD16kRL+AStxRd4uQ==')
metadata = Base.metadata
@dataclass
class ServiceProviderMealPlan(Base):
    __tablename__ = 'service_providers_meal_plans'

    id: int
    description: str
    name: str
    image: str
    meal_plan_uses: int

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _name = Column('name', Text, nullable=False)
    _description = Column('description', Text, nullable=False)
    _meal_plan_uses = Column('meal_plan_uses', BigInteger, nullable = False)
    image = Column(Text, nullable=True)

    user_id = Column(ForeignKey('service_providers.user_id', ondelete='CASCADE'), nullable=False)

    clients = relationship(
        'Client',
        uselist=True,
        back_populates='meal_plan')
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
    def meal_plan_uses(self):
        return self._meal_plan_uses
    @meal_plan_uses.setter
    def meal_plan_uses(self, meal_plan_uses):
        self._meal_plan_uses = meal_plan_uses
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

    def set_image(self, image_file):
        uid = uuid.uuid4()
        filename = f'{self.name}_{uid.hex}_{image_file.filename}'
        blob_service.create_blob_from_stream('container', filename, image_file)
        self.image = f'https://299storage.blob.core.windows.net/container/{filename}'

    # @validates('service_provider')
    # def validate_user(self, key, service_provider):
    #     if not self.service_provider:
    #         raise Exception('Invalid user type for owning a meal plan')
    #     return service_provider
    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        for pricemodel in self.prices:
            if pricemodel.currency == 'USD':
                information['price'] = pricemodel.price
        return information
        