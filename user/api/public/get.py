from flask import Blueprint, jsonify, request
from auth.decorators import require_user
from database.models.clients import Client
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.users import User
from database.orm import db_session
from user import get_user_id, get_user_email_from_token
from user import UserType, get_user_id

public_get_api = Blueprint('public_get_api', __name__, url_prefix='/public/get')

@public_get_api.route('/meal_plan', methods=['GET'])
@require_user(UserType.CLIENT)
def get_client_meal_plan_id():
  user_id = get_user_id()
  user = Client.query.filter(Client.user_id == user_id).first()
  with db_session.begin():
    meal_plan_id = user.meal_plan_id
  return jsonify(success=True, meal_plan_id=meal_plan_id)

@public_get_api.route('/client_personal_info', methods=['POST'])
@require_user(UserType.CLIENT)
def get_client_personal_info():
  user_id = get_user_id()
  user = User.query.filter(User.id == user_id).first()
  return jsonify(success=True, client_personal_info=user.as_dict())
