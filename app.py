from flask import Flask
from auth.api import auth_api
from auth.decorators import token_required
from items.api import items_api

from database.models.credentials import Credentials
from database.models.addresses import Address
from database.models.users import User
from database.models.clients import Client
from database.models.service_providers import ServiceProvider
from database.models.clients_biometrics import ClientBiometrics
from database.models.service_providers_meal_plans import ServiceProviderMealPlan
from database.models.meal_plans_prices import MealPlanPrice
from database.models.items import Item
from database.models.categories import Category

app = Flask(__name__)
app.config['SECRET_KEY'] = 'this_key_here'
app.register_blueprint(auth_api)
app.register_blueprint(items_api)

@app.route('/',methods = ['POST'])
@token_required
def hello():
    return 'hello'
if __name__ == '__main__':
    app.run(debug=True)
