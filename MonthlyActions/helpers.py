from database.models.clients import Client
from database.orm import generate_db_session
def resetAllSessions():
    with generate_db_session() as db_session:
        db_session.query(Client).update({Client.subscription_counter : 0})

