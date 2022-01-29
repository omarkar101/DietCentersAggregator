from flask import Flask
from auth.api.login import login_api

from database.models.credentials import Credentials
from database.models.users import User
from database.models.addresses import Address

app = Flask(__name__)
app.register_blueprint(login_api, url_prefix='/login')

if __name__ == '__main__':
    app.run(debug=True)
