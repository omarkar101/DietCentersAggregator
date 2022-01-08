from flask import Flask, jsonify
from database.orm import generate_db_session
from database.models.users import User

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/addUser')
def add_user():
    user = User()
    with generate_db_session() as db_session:
        db_session.add(user)
    return jsonify(user.id)

if __name__ == '__main__':
    app.run(debug=True)
