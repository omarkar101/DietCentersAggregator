from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class Client(Base):
    __tablename__ = 'clients'

    _first_name = Column('first_name', Text, nullable=False)
    _last_name = Column('last_name', Text, nullable=False)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), primary_key=True, nullable=False, unique=True)

    user = relationship(
        'User',
        primaryjoin='User.id == ServiceProvider.user_id',
        uselist=False,
        back_populates='client')
    biometrics = relationship(
        'ClientBiometrics',
        primaryjoin='Client.user_id == ClientBiometrics.client_id',
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
