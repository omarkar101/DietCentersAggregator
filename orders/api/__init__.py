from flask import Blueprint
from orders.api.private.add import add_api
from orders.api.private.get import get_api


orders_api = Blueprint('orders_api', __name__, url_prefix='/orders')
orders_api.register_blueprint(add_api)
orders_api.register_blueprint(get_api)