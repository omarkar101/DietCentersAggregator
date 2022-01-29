from functools import wraps
from flask import abort

def require_user(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'Condition' == 'Condition':
            return f(*args, **kwargs)
        else:
            abort(401)
    return wrap
