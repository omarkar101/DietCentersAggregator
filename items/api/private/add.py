from flask import Blueprint, jsonify
from auth.decorators import require_user
from user import get_user
add_api = Blueprint('add_api', __name__, url_prefix='/add')

@add_api.route('/', methods=['POST'])

@require_user
def get_all_items():
  # we need to know which user is logged in
  user = get_user()
  items = user.service_provider.items
  return jsonify(success=True, items=items)
