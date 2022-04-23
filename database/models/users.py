from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.models.addresses import Address
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
    orders = relationship(
        'Order',
        uselist=True,
        back_populates='user'  
    )

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
    
    def set_address(self, address_name, address_first_name, address_last_name, address_email, address_phone_number,
                    country, street, building, floor, instructions, city):
        Address.query.filter(Address.user_id == self.id).delete()
        address = Address(
            address_name=address_name,
            first_name=address_first_name,
            last_name=address_last_name,
            email = address_email,
            phone_number = address_phone_number,
            country=country, 
            street=street, 
            building=building, 
            floor=floor, 
            instructions=instructions,
            city=city,
            user_id=self.id)
        self.addresses.append(address)

    def as_dict(self):
        information = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        information['email'] = self.credentials.email
        if information['user_type'] == UserType.CLIENT:
            information['address'] = self.addresses[0].as_dict() if len(self.addresses) > 0 else None
            information['first_name'] = self.client.first_name
            information['last_name'] = self.client.last_name
            if self.client.biometrics is not None:
                information['biometrics'] = self.client.biometrics.as_dict()
        if information['user_type'] == UserType.SERVICE_PROVIDER:
            information['name'] = self.service_provider.name
        del information['user_type']
        return information
