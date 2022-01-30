import hashlib
import uuid

def generate_password_hash(password, salt):
    return hashlib.sha512(password.encode() + salt.encode()).hexdigest()

def generate_password_salt():
    return uuid.uuid4().hex
