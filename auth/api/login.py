from flask import Blueprint

login_api = Blueprint('login_api', __name__)

@login_api.route('/user')
def login():
    return 'Test login'
