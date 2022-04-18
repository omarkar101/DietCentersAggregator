from functools import wraps
from flask import abort, request, jsonify
from sqlalchemy.orm import joinedload
from database.models.credentials import Credentials
from database.models.users import User
from flask import current_app
import jwt
from jwt.exceptions import ExpiredSignatureError
from database.orm import db_session
from user import UserType, get_user_email_from_token

"""
This piece of code is taken from:
https://www.geeksforgeeks.org/using-jwt-for-user-authentication-in-flask/
"""
# decorator for verifying the JWT
def require_user(user_type: UserType):
    def wrap_require_user(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            try:
                # decoding the payload to fetch the stored details
                email = get_user_email_from_token()
                credentials = Credentials.query \
                    .options(joinedload(Credentials.user)) \
                    .filter(Credentials.email == email) \
                    .first()
                if credentials is None:
                    return jsonify(success=False, message='Invalid Authentication!', response_status=401)
                if credentials.user.user_type != user_type:
                    return jsonify(success=False, message='Invalid Authentication', response_status=401)
            except ExpiredSignatureError:
                return jsonify(success=False, message='Login session expired', response_status=401)
            except:
                return jsonify(success=False, message='Invalid Authentication', response_status=401)
            # returns the current logged in users contex to the routes
            return  f(*args, **kwargs)
        return decorated
    return wrap_require_user
