from sqlalchemy import Column, BigInteger, Text, ForeignKey, Integer, REAL
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from user import UserType

metadata = Base.metadata

class ClientBiometrics(Base):
    __tablename__ = 'clients_biometrics'

    _age = Column('age', Integer)
    _height = Column('height', REAL)
    _weight = Column('weight', REAL)

    user_id = Column(ForeignKey('clients.user_id', ondelete='CASCADE'), primary_key=True, nullable=False)

    client = relationship(
        'Client',
        primaryjoin='Client.user_id == ClientBiometrics.user_id',
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

    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return information
