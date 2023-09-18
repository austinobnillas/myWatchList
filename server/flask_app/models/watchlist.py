from flask_app.config.mysqlconnection import connectToMySQL
db = "MyWatchList"

class Watchlists():
    def __init__(self, data):
        self.watchlist_name = data['watchlist_name']
        self.description = data['description']
        self.created_by = data['created_by']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
# CREATE
    @classmethod
    def create_watchlist(data):
        query = """
            INSERT INTO watchlist (watchlist_name, description, created_by, user_id)
            VALUES (%(watchlist_name)s, %(description)s, %(created_by)s, %(user_id)s)
        """
        results = connectToMySQL(db).query_db(query, data)
        # print(results)
        return results 
# READ
    @classmethod
    def get_all_watchlists(cls, data):
        query = """
            SELECT * FROM watchlist
            WHERE created_by = %(username)s
        """
        results = connectToMySQL(db).query_db(query, data)
        # print(results)
        return results 

# READ ONE
    def get_one_watchlist(data):
        query = """
            SELECT * FROM watchlist 
        """
        results = connectToMySQL(db).query_db(query, data)
        # print(results)
        return results 
# UPDATE
    
    def edit_watchlist():
        return
# DELETE
    
    def delete_watchlist():
        return