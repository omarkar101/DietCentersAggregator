from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from database.models.clients import Client
from database.models.users import User
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.orm import db_session
from user import UserType, get_user_id, get_user_email_from_token

private_get_api = Blueprint('private_get_api', __name__, url_prefix='/get')

@private_get_api.route('/service_provider_personal_info', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
def get_service_provider_personal_info():
  user_id = get_user_id()
  user = User.query.filter(User.id == user_id).first()
  return jsonify(success=True, service_provider_personal_info=user.as_dict())

# @private_get_api.route('/meal_plan', methods=['POST'])
# # @require_user(UserType.CLIENT)
# def get_client_meal_plan_id():
#   user_id = int(request.form.get('user_id'))
#   with db_session.begin():
#     user = db_session.query(Client) \
#       .filter(Client.user_id == user_id) \
#       .first()
#     meal_plan_id = user.meal_plan_id
#   return jsonify(success=True, meal_plan_id=meal_plan_id)
