from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from database.models.clients import Client
from database.models.users import User
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import db_session
from user import UserType, get_user_id, get_user_email_from_token

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/subscribed_client', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
def cancel_subscribed_client():
  user_id = get_user_id()
  subscribed_client_id = request.form.get('subscribed_client_id')
  return jsonify(success=True, subscribed_clients=[])
