from sqlalchemy import Column, BigInteger, Text, ForeignKey, Integer, REAL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from user import UserType

metadata = Base.metadata

class ClientBiometrics(Base):
    __tablename__ = 'clients_biometrics'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _age = Column('age', Integer)
    _height = Column('height', REAL)
    _weight = Column('weight', REAL)

    client_id = Column(ForeignKey('clients.id', ondelete='CASCADE'), unique=True, nullable=False)

    client = relationship(
        'Client',
        primaryjoin='Client.id == ClientBiometrics.client_id',
        uselist=False,
        back_populates='biometrics')

    @hybrid_property
    def age(self):
        return self._age
    @age.setter
    def age(self, age):
        self._age = age

    @hybrid_property
    def height(self):
        return self._height
    @height.setter
    def height(self, height):
        self._height = height

    @hybrid_property
    def weight(self):
        return self._weight
    @weight.setter
    def weight(self, weight):
        self._weight = weight        
