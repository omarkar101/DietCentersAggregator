from flask import Blueprint
from items.api.private.get import get_api
from items.api.public.get import public_get_api
from items.api.private.add import add_api
from items.api.private.delete import delete_api
from items.api.private.edit import edit_api

items_api = Blueprint('items_api', __name__, url_prefix='/items')
items_api.register_blueprint(get_api)
items_api.register_blueprint(add_api)
items_api.register_blueprint(delete_api)
items_api.register_blueprint(edit_api)

public_items_api = Blueprint('public_items_api', __name__, url_prefix='/items')
public_items_api.register_blueprint(public_get_api)
