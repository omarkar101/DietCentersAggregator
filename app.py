from flask import Flask
from auth.api.login import login_api

app = Flask(__name__)
app.register_blueprint(login_api, url_prefix='/login')

if __name__ == '__main__':
    app.run(debug=True)
