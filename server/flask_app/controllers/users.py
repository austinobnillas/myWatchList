import jwt
import datetime
from flask_app import app
from flask_app.models import user
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
secret_key = app.secret_key

def check_jwt():
    isToken = False
    token = request.cookies.get('jwt_token')  # Get the token from the cookie
    print(token)
    if not token:
        return jsonify({"message": "Token is missing"}), 401
    else:
        isToken = True
    return isToken 

#register
@app.route('/api/register', methods=['POST'])
def register ():
    data = request.get_json()
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    exp_timestamp = int(expiration_time.timestamp())
    #validate data
    is_valid = True
    validation_errors = []
    if user.User.get_one_user(data):
        validation_errors.append({"username_exist": "Username taken"})
        is_valid = False
    if len(data['username']) <= 3:
        validation_errors.append({"username_errors": "Please enter a valid username"})
        is_valid = False
    if not EMAIL_REGEX.match(data['email']):
        validation_errors.append({"email_errors": "Please enter a valid email address"})
        is_valid = False
    if len(data['password']) <= 3:
        validation_errors.append({"password_error": "Please enter a valid password"})
        is_valid = False
    if data['confirm_password'] != data['password']:
        validation_errors.append({"password_confirm_error": "Passwords do not match"})
        is_valid = False
    if is_valid == False:
        return jsonify(validation_errors), 400
    else: 
        pw_hash = bcrypt.generate_password_hash(data['password'])
        new_user = {
            'username': data['username'],
            'email': data['email'],
            'password': pw_hash
        }
        # JWT CREATION
        payload = {
            'username': data['username'],
            'exp': exp_timestamp
            }
        token = jwt.encode(payload, secret_key, algorithm="HS256")
        user.User.register(new_user)
        response = make_response(jsonify({'message': 'Token generated'}))
        response.set_cookie('jwt_token', token)
        return response

#login
@app.route('/api/login', methods=['POST'])
def login (): 
    data = request.get_json()
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    exp_timestamp = int(expiration_time.timestamp())
    user_account = user.User.login(request.get_json())
    # print ("this is :", user_account['username'])
    if not user_account:
        return jsonify({"msg": "invalid username"}), 401
    if not bcrypt.check_password_hash(user_account['password'], data['password']):
    # if data['password'] != user_account['password']:
        return jsonify({"msg": "invalid password"}), 401
    # JWT CREATION
    print(data['username'])
    payload = {
        'username': data['username'],
        'exp': exp_timestamp
        }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    response = make_response(jsonify({'message': 'Token generated'}))
    response.set_cookie('jwt_token', token)
    return response
    

#logout
@app.route('/api/logout', methods=['POST'])
def logout():
    response = make_response("Logged Out")
    response.set_cookie('jwt_token', '', expires=0)
    return response;

#route testing
@app.route('/api/users', methods=['GET'])
def get_all(): 
    cookie = check_jwt()
    if cookie == True:
        users = user.User.get_all_users();
        return jsonify(users);
    else: 
        return jsonify({"msg": "false"}), 401;