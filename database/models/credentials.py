from sqlalchemy import Column, BigInteger, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from database.orm import Base

metadata = Base.metadata

class Credentials(Base):
    __tablename__ = 'credentials'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    _email = Column('email' , Text, nullable=False, index=True, unique=True)
    _password_hash = Column('password_hash', Text, nullable=False)
    _password_salt = Column('password_salt', Text, nullable=False)

    user = relationship(
        'User',
        uselist=False,
        back_populates='credentials')

    @hybrid_property
    def email(self):
        return self._email    

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @hybrid_property
    def password_salt(self):
        return self._password_salt

    @email.setter
    def email(self, email):
        self._email = email

    @password_hash.setter
    def password_hash(self, password_hash):
        self._password_hash = password_hash

    @password_salt.setter
    def password_salt(self, password_salt):
        self._password_salt = password_salt
