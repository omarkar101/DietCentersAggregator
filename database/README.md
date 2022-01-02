# How to add a model and make alembic recognize it?
1. Add model file to database/models folder
2. import the model class in database/env.py

# How to generate a migration?
1. Go to database directory
2. Run ```alembic revision --autogenerate -m "YOUR DESCRIPTION HERE"```

# How to upgrade head?
1. Go to database directory
2. Run ```alembic upgrade head```
