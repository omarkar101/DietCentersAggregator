from flask import Blueprint
from items.api.private.get import get_api

items_api = Blueprint('items_api', __name__, url_prefix='/items')
items_api.register_blueprint(get_api)
