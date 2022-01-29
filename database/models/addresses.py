from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from database.orm import Base

metadata = Base.metadata

class Address(Base):
    __tablename__ = 'addresses'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    address_name = Column(Text, nullable=False)
    first_name = Column(Text, nullable=False)
    last_name = Column(Text, nullable=False)
    email = Column(Text, nullable=False)
    phone_number = Column(Text, nullable=False)
    country = Column(Text, nullable=False)
    street = Column(Text, nullable=False)
    building = Column(Text, nullable=False)
    floor = Column(Text, nullable=False)
    instructions = Column(Text, nullable=False)

    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False)

    user = relationship(
        'User',
        uselist=False,
        back_populates='addresses')
