from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm.session import Session

# !!!!!!!!!!!!!!!!!!!!!!!!for deployment environment only!!!!!!!!!!!!!!!!!!!!!!!
# engine = create_engine('postgresql://bepclhck:wuNRDdZ4XGYDBCjIZgw6nAL2aUh-9OOx@abul.db.elephantsql.com/bepclhck', future=True)

# !!!!!!!!!!!!!!!!!!!!!!!!for development environment only!!!!!!!!!!!!!!!!!!!!!!!!!!!
engine = create_engine('postgresql://postgres:test-pass-123@localhost:3306/299')

Base = declarative_base()
Session = sessionmaker(engine, autocommit=True)
db_session = scoped_session(Session)
Base.query = db_session.query_property()
