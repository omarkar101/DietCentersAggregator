from functools import wraps
from flask import abort, request, jsonify
from database.models.users import User
from flask import current_app
import jwt

def require_user(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'Condition' == 'Condition':
            return f(*args, **kwargs)
        else:
            abort(401)
    return wrap
    
"""
This piece of code is taken from:
https://www.geeksforgeeks.org/using-jwt-for-user-authentication-in-flask/
"""
# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        try:
            # decoding the payload to fetch the stored details
            a = jwt.decode(token,current_app.config['SECRET_KEY'],algorithms=['HS256'])
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes
        return  f(*args, **kwargs)
  
    return decorated