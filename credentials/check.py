from database.models.credentials import Credentials
from database.orm import generate_db_session

def check_credentials(email, password):
    with generate_db_session() as db_session:
        credentials = db_session.query(Credentials).filter(Credentials.email == email).first()
    return credentials.compare_password(password) if credentials is not None else False
