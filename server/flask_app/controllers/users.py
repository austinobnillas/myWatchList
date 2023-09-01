import jwt
from flask_app import app
from flask_app.models import user
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
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
    pw_hash = bcrypt.generate_password_hash(data['password'])
    new_user = {
        'username': data['username'],
        'email': data['email'],
        'password': pw_hash
    }
    # JWT CREATION
    payload = {
        'username': data['username'],
        'exp': "2h"
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
        'exp': "2h"
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