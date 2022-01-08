from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

# !!!!!!!!!!!!!!!!!!!!!!!!for deployment environment only!!!!!!!!!!!!!!!!!!!!!!!
engine = create_engine('postgresql://bepclhck:wuNRDdZ4XGYDBCjIZgw6nAL2aUh-9OOx@abul.db.elephantsql.com/bepclhck')

# !!!!!!!!!!!!!!!!!!!!!!!!for development environment only!!!!!!!!!!!!!!!!!!!!!!!!!!!
# enginer = create_engine('postgresql://postgres:test-pass-123@localhost:3306/299')

Base = declarative_base()

Session = sessionmaker(bind=engine)

def generate_db_session():
    return Session()
