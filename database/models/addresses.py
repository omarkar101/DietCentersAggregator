from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from validators import validate_email

metadata = Base.metadata

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _address_name = Column('address_name', Text, nullable=False)
    _first_name = Column('first_name', Text, nullable=False)
    _last_name = Column('last_name', Text, nullable=False)
    _email = Column('email', Text, nullable=False)
    _phone_number = Column('phone_number', Text, nullable=False)
    _country = Column('country', Text, nullable=False)
    _street = Column('street', Text, nullable=False)
    _building = Column('building', Text, nullable=False)
    _floor = Column('floor', Text, nullable=False)
    _instructions = Column('instructions', Text, nullable=False)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    user = relationship(
        'User',
        uselist=False,
        back_populates='addresses')

    @hybrid_property
    def address_name(self):
        return self._address_name
    @address_name.setter
    def address_name(self, address_name):
        self._address_name = address_name

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
    def email(self):
        return self._email
    @email.setter
    def email(self, email):
        self._email = email
    @validates('email')
    def validate_email(self, key, email):
        validate_email(email)
        return email

    @hybrid_property
    def phone_number(self):
        return self._phone_number
    @phone_number.setter
    def phone_number(self, phone_number):
        self._phone_number = phone_number

    @hybrid_property
    def country(self):
        return self._country
    @country.setter
    def country(self, country):
        self._country = country

    @hybrid_property
    def street(self):
        return self._street
    @street.setter
    def street(self, street):
        self._street = street

    @hybrid_property
    def building(self):
        return self._building
    @building.setter
    def building(self, building):
        self._building = building

    @hybrid_property
    def floor(self):
        return self._floor
    @floor.setter
    def floor(self, floor):
        self._floor = floor

    @hybrid_property
    def instructions(self):
        return self._instructions
    @instructions.setter
    def instructions(self, instructions):
        self._instructions = instructions
