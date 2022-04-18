from database.models.credentials import Credentials

def check_credentials(email, password):
    credentials = Credentials.filter(Credentials.email == email).first()
    return credentials.compare_password(password) if credentials is not None else False
