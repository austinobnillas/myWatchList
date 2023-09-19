import jwt
import datetime
from flask_app import app
from flask_app.models import user
from flask_app.models import watchlist
from flask_app.controllers import users
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
secret_key = app.secret_key

@app.route('/api/addshow', methods=['POST'])
def create_show():
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        pass
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/editshow', methods=['PATCH'])
def edit_show():
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        pass
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/deleteshow', methods=['DELETE'])
def delete_show():
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        pass
    else: 
        return jsonify({"msg": "false"}), 401;