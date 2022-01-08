from flask import Flask
from database.orm import generate_db_session
from database.models.users import User

app = Flask(__name__)

@app.route('/')
def hello():
    return '/'

@app.route('/home')
def home():
    return 'home'

if __name__ == '__main__':
    app.run()
