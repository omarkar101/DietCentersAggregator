from flask import Blueprint
from items.api.private.get import get_api
from items.api.private.add import add_api
items_api = Blueprint('items_api', __name__, url_prefix='/items')
items_api.register_blueprint(get_api)
items_api.register_blueprint(add_api)
