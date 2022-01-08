from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://bepclhck:wuNRDdZ4XGYDBCjIZgw6nAL2aUh-9OOx@abul.db.elephantsql.com/bepclhck')
Base = declarative_base()

Session = sessionmaker(bind=engine)

def generate_db_session():
    return Session()
