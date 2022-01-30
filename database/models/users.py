from sqlalchemy import Column, BigInteger, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base
from user import UserType

metadata = Base.metadata

class User(Base):
    __tablename__ = 'users'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _first_name = Column(Text, nullable=False)
    _last_name = Column(Text, nullable=False)
    _phone_number = Column(Text, nullable=False)
    _user_type = Column('user_type', Text, nullable=False)

    credentials_id = Column(ForeignKey('credentials.id'), nullable=False)

    credentials = relationship(
        'Credentials',
        primaryjoin='Credentials.id == User.credentials_id',
        uselist=False,
        back_populates='user')
    addresses = relationship(
        'Address',
        uselist=True,
        back_populates='user')

    @hybrid_property
    def user_type(self):
        return UserType(self._user_type)
    @user_type.setter
    def user_type(self, user_type: UserType):
        self._user_type = user_type.value
