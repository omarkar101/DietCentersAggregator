from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.session import Session

# !!!!!!!!!!!!!!!!!!!!!!!!for deployment environment only!!!!!!!!!!!!!!!!!!!!!!!
engine = create_engine('postgresql://bepclhck:wuNRDdZ4XGYDBCjIZgw6nAL2aUh-9OOx@abul.db.elephantsql.com/bepclhck', future=True)

# !!!!!!!!!!!!!!!!!!!!!!!!for development environment only!!!!!!!!!!!!!!!!!!!!!!!!!!!
# enginer = create_engine('postgresql://postgres:test-pass-123@localhost:3306/299')

Base = declarative_base()
Session = sessionmaker(engine, expire_on_commit=False)


# To start doing things in the database, use:
# with generate_db_session() as db_session:
#     db_session.add(...)..
# this will commit when the with closure ends
def generate_db_session():
    return Session.begin()
