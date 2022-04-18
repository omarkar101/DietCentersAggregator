from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from auth.decorators import require_user
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.orm import db_session
from user import UserType, get_user_id
from sqlalchemy.orm import joinedload

add_api = Blueprint('add_api', __name__, url_prefix='/private/add')

@add_api.route('/meal_plan', methods=['POST'])
@require_user(UserType.CLIENT)
@cross_origin(origins='*', supports_credentials=True)
def add_meal_plan_to_client():
  user_id = get_user_id()
  with db_session.begin():
    # user_id = int(request.form.get('user_id'))
    meal_plan_id = int(request.form.get('meal_plan_id'))
    meal_plan_uses = int(request.form.get('meal_plan_uses'))
    #Should add a line like meal_plan_uses = request.form.get('meal_plan_uses)
    client = db_session.query(Client) \
      .filter(Client.user_id == user_id) \
      .first()
    client.meal_plan_id = meal_plan_id
    client.subscription_counter = meal_plan_uses
    # db_session.refresh(client)
  return jsonify(success=True)
