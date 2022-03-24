from flask import Blueprint
from meal_plans.api.private.get import get_api
from meal_plans.api.private.add import add_api
from meal_plans.api.private.delete import delete_api
from meal_plans.api.private.edit import edit_api
from meal_plans.api.public.get import public_get_api

meal_plans_api = Blueprint('meal_plans_api', __name__, url_prefix='/meal_plans')
meal_plans_api.register_blueprint(get_api)
meal_plans_api.register_blueprint(public_get_api)
meal_plans_api.register_blueprint(add_api)
meal_plans_api.register_blueprint(delete_api)
meal_plans_api.register_blueprint(edit_api)
