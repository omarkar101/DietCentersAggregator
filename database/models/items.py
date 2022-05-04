import uuid
from sqlalchemy import Column, BigInteger, Text, ForeignKey, text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from azure.storage.blob import BlockBlobService
# from database.models.meal_plans_items import t_meal_plans_items

metadata = Base.metadata
blob_service = BlockBlobService(
  account_name='299storage',
  account_key='59A1sn1/V/JbS9fCQvtgWcJsP9WZYOJJMDnm+FZjCRFzsRtNYVce/NP7MZDHaf4VlhQgAlD16kRL+AStxRd4uQ==')
class Item(Base):
  __tablename__ = 'items'

  id = Column(BigInteger, primary_key=True, autoincrement=True)
  # category must be a foreign key
  _category = Column('category', Text, nullable=False)
  _description = Column('description', Text, nullable=False)
  _name = Column('name', Text, nullable=False)
  image_url = Column(Text, nullable=True, server_default=text("'https://299storage.blob.core.windows.net/container/meals_default.svg'"))
  _isavailable = Column('isavailable', Boolean, nullable=False)

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

  orders = relationship(
        'Order',
        uselist=True,
        back_populates='item'  
    )

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
  @hybrid_property
  def isavailable(self):
    return self._isavailable
  @isavailable.setter
  def isavailable(self, isavailable):
    self._isavailable = isavailable

  def set_image(self, image_file):
    uid = uuid.uuid4()
    filename = f'{self.name}_{uid.hex}_{image_file.filename}'
    blob_service.create_blob_from_stream('container', filename, image_file)
    self.image_url = f'https://299storage.blob.core.windows.net/container/{filename}'

  def as_dict(self):
    information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    return information
