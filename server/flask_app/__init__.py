from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r'/api/*'})

app.secret_key = "my_watch_list"