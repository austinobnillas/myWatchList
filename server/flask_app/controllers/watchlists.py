import jwt
import datetime
from flask_app import app
from flask_app.models import user
from flask_app.models import watchlist
from flask import jsonify, request, make_response
from flask_bcrypt import Bcrypt
secret_key = app.secret_key

@app.route('/api/watchlists', methods=['GET'])
def get_all_watchlist():
    cookie = request.cookies.get('jwt_token')
    print(cookie)
    token_content = jwt.decode(cookie, secret_key, algorithms="HS256")
    print (token_content['username'])


    watchlists = watchlist.Watchlists.get_all_watchlists(token_content);

    return jsonify(watchlists)

    