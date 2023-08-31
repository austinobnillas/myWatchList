import jwt
from flask_app import app
from flask_app.models import user
from flask import jsonify, request, make_response
secret_key="secret"

@app.route('/register', methods=['POST'])
def register ():
    data = request.get_json()
    new_user = {
        'username': data['username'],
        'email': data['email'],
        'password': data['password']
    }
    payload = {
        'username': data['username'],
        'email': data['email'],
        'exp': "2h"}

    # JWT CREATION
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    user.User.register(new_user)
    response = make_response(jsonify({'message': 'Token generated'}))
    response.set_cookie('jwt_token', token)
    return response

@app.route('/logout', methods=['POST'])
def logout():
    response = make_response("Logged Out")
    response.set_cookie('jwt_token', '', expires=0)
    return response;

@app.route('/users', methods=['GET'])
def get_all(): 
    users = user.User.get_all_users();
    return jsonify(users);