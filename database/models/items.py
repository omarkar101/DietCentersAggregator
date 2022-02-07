from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class Item(Base):
    __tablename__ = 'Item'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _category = Column('category', Text, nullable=False, unique=True)
    _description = Column('description', Text, nullable=False, unique=True)
    _name = Column('name', Text, nullable=False, unique=True)

    user_id = Column(ForeignKey('service_providers.user_id', ondelete='CASCADE'), nullable=False)

    service_provider = relationship(
        'ServiceProvider',
        primaryjoin='ServiceProvider.user_id == Item.user_id',
        uselist=False,
        back_populates='items')
    
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
