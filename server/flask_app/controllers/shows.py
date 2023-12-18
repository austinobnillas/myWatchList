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
    validation_errors = {}
    if len(data['showName']) == 0:
        validation_errors["name_error"] = "Name is required."
        # validation_errors.append({"name_error": "Name is required!"})
    if len(data['genre']) == 0:
        validation_errors["genre_error"] = "Genre is required."
        # validation_errors.append({"genre_error": "Genre is required!"})
    if len(data['description']) <= 3:
        validation_errors["description_error"] = "Description is too short."
        # validation_errors.append({"description_error": "Description is too short!"})
    if int(data['numberOfEpisodes']) == 0:
        validation_errors["number_of_episodes_error"] = "Number of episodes is requred."
        # validation_errors.append({"number_of_episodes_error": "Number of episodes is requred!"})
    if int(data['episodesCompleted']) > int(data['numberOfEpisodes']):
        validation_errors["episodes_completed_error"] = "Episodes completed cannot be more than total number of episodes"
        # validation_errors.append({"episodes_completed_error": "Episodes completed cannot be more than total number of episodes"})
    if not data['status']:
        validation_errors["status_error"] = "Status is required."
        # validation_errors.append({"status_error": "Status is required"})
    if int(data['rating']) > 10: 
        validation_errors["rating_error"] = "Rating cannot exceed 10, no matter how good it was!"
        # validation_errors.append({"rating_error": "Rating cannot exceed 10, no matter how good it was!"})
    return validation_errors

@app.route('/api/<int:watchlist_id>/addshow', methods=['POST'])
def add_show(watchlist_id):
    cookie_check = users.check_jwt()
    if cookie_check == True: 
        data = request.get_json()
        print(data['rating'])
        validations = show_validations(data)
        if not validations:
            show_details = {
                'name': data['showName'],
                'genre': data['genre'],
                'description': data['description'],
                'number_of_episodes': data['numberOfEpisodes'],
                'episodes_completed': data['episodesCompleted'],
                'status': data['status'],
                'rating': data['rating'],
                'watchlist_id': watchlist_id
            }
            results = show.Shows.add_show(show_details)
            print(results)
            new_show_value = get_one_show(results)
            
            return new_show_value;
        else: return jsonify(validations), 401
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
        print(data)
        validations = show_validations(data)
        if not validations:
            edited_show_details = {
                'id': id,
                'name': data['showName'],
                'genre': data['genre'],
                'description': data['description'],
                'number_of_episodes': data['numberOfEpisodes'],
                'episodes_completed': data['episodesCompleted'],
                'status': data['status'],
                'rating': data['rating']
            }
            show.Shows.edit_show(edited_show_details)
            updated_show_value = get_one_show(id)
            return updated_show_value
        else: 
            return jsonify(validations), 401

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