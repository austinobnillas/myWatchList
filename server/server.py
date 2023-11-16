import os
from flask_app import app
from flask_app.controllers import users;
from flask_app.controllers import watchlists;
from flask_app.controllers import shows;


if __name__=="__main__":
    app.run(debug=True, host="localhost", port = os.getenv("DB_PORT"))