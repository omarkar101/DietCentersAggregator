from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class ServiceProvider(Base):
    __tablename__ = 'service_providers'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _name = Column('name', Text, nullable=False)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)

    user = relationship(
        'User',
        primaryjoin='User.id == ServiceProvider.user_id',
        uselist=False,
        back_populates='service_provider')

    @hybrid_property
    def name(self):
        return self._name
    @name.setter
    def name(self, name):
        self._name = name
