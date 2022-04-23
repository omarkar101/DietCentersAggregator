from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from azure.storage.blob import BlockBlobService
import uuid

metadata = Base.metadata
blob_service = BlockBlobService(
  account_name='299storage',
  account_key='59A1sn1/V/JbS9fCQvtgWcJsP9WZYOJJMDnm+FZjCRFzsRtNYVce/NP7MZDHaf4VlhQgAlD16kRL+AStxRd4uQ==')
class ServiceProvider(Base):
    __tablename__ = 'service_providers'

    name: str
    user_id: int
    
    _name = Column('name', Text, nullable=False, unique=True)
    description = Column(Text, nullable=True)
    img_url = Column(Text, nullable=True)

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

    def set_image(self, image_file):
        uid = uuid.uuid4()
        filename = f'{self.name}_{uid.hex}_{image_file.filename}'
        blob_service.create_blob_from_stream('container', filename, image_file)
        self.image_url = f'https://299storage.blob.core.windows.net/container/{filename}'

    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        information['phone_number'] = self.user.phone_number
        return information
