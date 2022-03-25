from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from sqlalchemy import and_
from auth.decorators import require_user
from database.models.credentials import Credentials
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.service_providers import ServiceProvider
from database.models.users import User
from sqlalchemy.orm import joinedload
from database.orm import generate_db_session
from user import UserType, get_user_id

delete_api = Blueprint('delete_api', __name__, url_prefix='/delete')

@delete_api.route('/one', methods=['POST'])
@require_user(UserType.SERVICE_PROVIDER)
@cross_origin(origins='*', supports_credentials=True)
def delete_meal_plan():
  # we need to know which user is logged in
  user_id = get_user_id()
  # for now we will use test user
  with generate_db_session() as db_session:
    meal_plan_id = int(request.form.get('meal_plan_id'))
    db_session.query(ServiceProviderMealPlan) \
      .filter(and_(ServiceProviderMealPlan.user_id == user_id, ServiceProviderMealPlan.id == meal_plan_id)) \
      .delete()
    meal_plans = db_session.query(ServiceProviderMealPlan).filter(ServiceProviderMealPlan.user_id == user_id).all()
  return jsonify(success=True, meal_plans=meal_plans)
