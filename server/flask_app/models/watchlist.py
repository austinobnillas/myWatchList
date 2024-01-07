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
    def create_watchlist(cls, data):
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
    @classmethod
    def get_one_watchlist(cls, data):
        query = """
            SELECT * FROM watchlist
            JOIN shows ON watchlist.id = shows.watchlist_id
            WHERE watchlist.id = %(id)s
        """
        results = connectToMySQL(db).query_db(query, data)
        print(results)
        return results 
# UPDATE
    @classmethod
    def edit_watchlist(cls, data):
        query = """
            UPDATE watchlist
            SET watchlist_name = %(watchlist_name)s,
            description = %(description)s
            WHERE id = %(id)s
        """
        results = connectToMySQL(db).query_db(query, data)
        return results
# DELETE
    @classmethod
    def delete_watchlist(cls, data):
        query2 = """
            DELETE FROM shows 
            WHERE watchlist_id = %(id)s
        """
        connectToMySQL(db).query_db(query2, data)
        query = """
            DELETE FROM watchlist
            WHERE id = %(id)s;
        """
        return connectToMySQL(db).query_db(query, data)
        