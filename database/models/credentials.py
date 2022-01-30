from sqlalchemy import Column, BigInteger, Text
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from auth.hash import generate_password_hash, generate_password_salt
from database.orm import Base
from validators import validate_email

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
    @email.setter
    def email(self, email):
        self._email = email
    @validates('email')
    def validate_email(self, key, email):
        validate_email(email)
        return email

    @hybrid_property
    def password(self):
        raise Exception('You can\'t access this field')
    @password.setter
    def password(self, password):
        self._password_salt = generate_password_salt()
        self._password_hash = generate_password_hash(password, self._password_salt)
    def compare_password(self, password):
        password_hash = generate_password_hash(password, self._password_salt)
        return password_hash == self._password_hash

    @hybrid_property
    def password_salt(self):
        raise Exception('You can\'t access this field')
