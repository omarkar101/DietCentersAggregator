from flask import Flask
from database.orm import generate_db_session
from database.models.users import User

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/addUser')
def add_user():
    db_session = generate_db_session()
    user = User()
    db_session.add(user)
    db_session.commit()
    return f'added user {user.id}'

if __name__ == '__main__':
    app.run()
