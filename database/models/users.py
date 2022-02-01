from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from user import UserType

metadata = Base.metadata

class User(Base):
    __tablename__ = 'users'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _phone_number = Column('phone_number', Text, nullable=False)
    _user_type = Column('user_type', Text, nullable=False)

    credentials_id = Column(ForeignKey('credentials.id'), nullable=False)

    credentials = relationship(
        'Credentials',
        uselist=False,
        back_populates='user')
    addresses = relationship(
        'Address',
        uselist=True,
        back_populates='user')
    client = relationship(
        'Client',
        uselist=False,
        back_populates='user')
    service_provider = relationship(
        'ServiceProvider',
        uselist=False,
        back_populates='user')

    @hybrid_property
    def phone_number(self):
        return self._phone_number
    @phone_number.setter
    def phone_number(self, phone_number):
        self._phone_number = phone_number

    @hybrid_property
    def user_type(self):
        return UserType(self._user_type)
    @user_type.setter
    def user_type(self, user_type: UserType):
        self._user_type = user_type.value
