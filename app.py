from flask import Flask
from auth.api.login import login_api

from database.models.credentials import Credentials
from database.models.addresses import Address
from database.models.users import User
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.models.clients_biometrics import ClientBiometrics
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.meal_plan_prices import MealPlanPrice


app = Flask(__name__)
app.register_blueprint(login_api, url_prefix='/login')

if __name__ == '__main__':
    app.run(debug=True)
