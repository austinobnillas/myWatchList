from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
load_dotenv()
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r'/api/*'})

app.secret_key = "my_watch_list"