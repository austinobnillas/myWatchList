import jwt
import datetime
from flask_app import app
from flask_app.models import user
from flask_app.models import watchlist
from flask_app.controllers import users
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
secret_key = app.secret_key

def watchlist_validations(data):
    validation_errors = {}
    if len(data['watchlistName']) <= 3:
        validation_errors["name_error"] = "Watchlist name too short."
        # validation_errors.append({"name_error": "Watchlist name too short"})
    if len(data['watchlistDescription']) <= 3:
        validation_errors["description_error"] = "Description too short"
        # validation_errors.append({"description_error": "Description too short"})
    if len(data['watchlistDescription']) > 200:
        validation_errors["description_error"] = "Description cannot be over 200 charcters"
        # validation_errors.append({"description_error": "Description cannot be over 200 charcters"})
    return validation_errors

@app.route('/api/watchlists', methods=['GET'])
def get_all_watchlist():
    print("TEST")
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        cookie = request.cookies.get('jwt_token')
        token_content = jwt.decode(cookie, secret_key, algorithms="HS256")
        watchlists = watchlist.Watchlists.get_all_watchlists(token_content);
        return jsonify(watchlists)
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/createwatchlist', methods=['POST'])
def create_watchlist():
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        cookie = request.cookies.get('jwt_token')
        token_content = jwt.decode(cookie, secret_key, algorithms="HS256")
        data = request.get_json()
        validations = watchlist_validations(data)
        if not validations: 
            user_id = user.User.get_one_user(token_content)
            watchlist_details = {
                'watchlist_name': data['watchlistName'],
                'description': data['watchlistDescription'],
                'created_by': token_content['username'],
                'user_id': user_id[0]['id']
            }
            watchlist.Watchlists.create_watchlist(watchlist_details)
            # response = make_response(jsonify({'message': 'Watchlist created!'}))
            return jsonify({"msg": "Watchlist Created"})
        else: return validations, 400
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/editwatchlist/<int:id>', methods=['PATCH'])
def edit_watchlist(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        data = request.get_json()
        validations = watchlist_validations(data)
        if not validations: 
            edited_watchlist_details = {
                'watchlist_name': data['watchlistName'],
                'description': data['watchlistDescription'],
                'id': id
            }
            watchlist.Watchlists.edit_watchlist(edited_watchlist_details)
            return jsonify({"msg": "updated watchlist"})
        else: return validations, 400
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/getonewatchlist/<int:id>', methods=['GET'])
def get_one_watchlist(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        one_watchlist = watchlist.Watchlists.get_one_watchlist({'id':id})
        return jsonify(one_watchlist)
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/deletewatchlist/<int:id>', methods=['DELETE'])
def delete_watchlist(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        watchlist.Watchlists.delete_watchlist({'id':id})
        return jsonify({"msg": "Deleted"})
    else: 
        return jsonify({"msg": "false"}), 401;

# DEMO PAGE RUNS

@app.route('/api/demo', methods=['GET'])
def demo():
    example_watchlist = [{'watchlist_name': 'Example Watchlist 1',
                            'description': 'Example Description 1'}]

    return example_watchlist

@app.route('/api/demo/watchlists', methods=['GET'])
def demo_watchlists():
    example_watchlist_content = [{'name': 'Example Show 1',
                                'genre': 'Fiction',
                                'description': 'Example Description',
                                'number_of_episodes': 12,
                                'episodes_completed': 2,
                                'status': 'Watching',
                                'rating': 9}]
    return example_watchlist_content

@app.route('/api/demo/shows', methods=['GET'])
def demo_shows():
    example_show = [{'name': 'Example Show 1',
                                'genre': 'Fiction',
                                'description': 'Example Description',
                                'number_of_episodes': 12,
                                'episodes_completed': 2,
                                'status': 'Watching',
                                'rating': 9}]
    return example_show