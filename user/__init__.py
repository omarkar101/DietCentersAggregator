from enum import Enum
from flask import current_app, request
import jwt
class UserType(Enum):
    CLIENT = 'client'
    SERVICE_PROVIDER = 'service_provider'

def get_user_email_from_token():
    token = request.headers['x-access-token']
    a = jwt.decode(token,current_app.config['SECRET_KEY'],algorithms=['HS256'])
    email = a.get('email')
    return email
