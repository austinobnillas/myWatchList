import jwt
import datetime
from flask_app import app
from flask_app.models import user
from flask_app.models import watchlist
from flask_app.models import show
from flask_app.controllers import users
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
secret_key = app.secret_key

def show_validations(data):
    validation_errors = []
    if len(data['name']) == 0:
        validation_errors.append({"name_error": "Name is required!"})
    if len(data['genre']) == 0:
        validation_errors.append({"genre_error": "Genre is required!"})
    if len(data['description']) <= 3:
        validation_errors.append({"description_error": "Description is too short!"})
    if data['number_of_episodes'] == 0:
        validation_errors.append({"number_of_episodes_error": "Number of episodes is requred!"})
    if data['episodes_completed'] > data['number_of_episodes']:
        validation_errors.append({"episodes_completed_error": "Episodes completed cannot be more than total number of episodes"})
    if not data['status']:
        validation_errors.append({"status_error": "Status is required"})
    if data['rating'] > 10: 
        validation_errors.append({"rating_error": "Rating cannot exceed 10, no matter how good it was!"})
    return validation_errors

@app.route('/api/<int:watchlist_id>/addshow', methods=['POST'])
def add_show(watchlist_id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        data = request.get_json()
        validations = show_validations(data)
        if not validations:
            show_details = {
                'name': data['name'],
                'genre': data['genre'],
                'description': data['description'],
                'number_of_episodes': data['number_of_episodes'],
                'episodes_completed': data['episodes_completed'],
                'status': data['status'],
                'rating': data['rating'],
                'watchlist_id': watchlist_id
            }
            show.Shows.add_show(show_details)
            return jsonify({"msg": "Show added"});
        else: return validations, 401
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/show/<int:id>', methods=['GET'])
def get_one_show(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        one_show = show.Shows.get_one_show({"id": id})
        return jsonify(one_show)
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/watchlist/shows/<int:watchlist_id>', methods=['GET'])
def get_all_shows(watchlist_id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        shows = show.Shows.get_all_shows({"id": watchlist_id})
        return jsonify(shows)
    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/editshow/<int:id>', methods=['PATCH'])
def edit_show(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        data = request.get_json()
        validations = show_validations(data)
        if not validations:
            edited_show_details = {
                'id': id,
                'name': data['name'],
                'genre': data['genre'],
                'description': data['description'],
                'number_of_episodes': data['number_of_episodes'],
                'episodes_completed': data['episodes_completed'],
                'status': data['status'],
                'rating': data['rating']
            }
            show.Shows.edit_show(edited_show_details)
            return jsonify({"msg": "updated show details"})
        else: return validations, 401

    else: 
        return jsonify({"msg": "false"}), 401;

@app.route('/api/deleteshow/<int:id>', methods=['DELETE'])
def delete_show(id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        show.Shows.delete_show({'id':id})
        return jsonify({"msg": "Deleted"})
    else: 
        return jsonify({"msg": "false"}), 401;