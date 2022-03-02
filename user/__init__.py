from enum import Enum
from flask import current_app, request
import jwt
from database.models.credentials import Credentials
from database.orm import generate_db_session
class UserType(Enum):
    CLIENT = 'client'
    SERVICE_PROVIDER = 'service_provider'

def get_user_email_from_token():
    token = request.headers['x-access-token']
    a = jwt.decode(token,current_app.config['SECRET_KEY'],algorithms=['HS256'])
    email = a.get('email')
    return email

def get_user(email=None):
    if email is None:
        email = get_user_email_from_token()
    with generate_db_session() as db_session:
        credentials = db_session.query(Credentials) \
            .filter(Credentials.email == email) \
            .first()
    return credentials.user if credentials is not None else None
