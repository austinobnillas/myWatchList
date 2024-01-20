from flask_app.config.mysqlconnection import connectToMySQL
db = "my_watch_list"

class Shows():
    def __init__(self, data):
        self.name = data['name']
        self.genre = data['genre']
        self.description = data['description']
        self.number_of_episodes = data['number_of_episodes']
        self.episodes_completed = data['episodes_completed']
        self.status = data['status']
        self.rating = data['rating']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

#CREATE
    @classmethod
    def add_show(cls, data):
        query = """
            INSERT INTO shows (name, genre, description, number_of_episodes, episodes_completed, status, rating, watchlist_id)
            VALUES (%(name)s, %(genre)s, %(description)s, %(number_of_episodes)s, %(episodes_completed)s, %(status)s, %(rating)s, %(watchlist_id)s)
        """
        results = connectToMySQL(db).query_db(query, data)
        print("MODEL")
        print(results)
        return results
#GET ONE SHOW 
    @classmethod
    def get_one_show(cls, data):
        query = """
            SELECT * FROM shows
            WHERE id = %(id)s
        """
        results = connectToMySQL(db).query_db(query, data)
        return results
#GET ALL SHOWS
    @classmethod
    def get_all_shows(cls, data):
        query = """
            SELECT * FROM shows
            WHERE watchlist_id = %(id)s
        """
        results = connectToMySQL(db).query_db(query, data)
        return results
#UPDATE
    @classmethod 
    def edit_show(cls, data):
        query = """
            UPDATE shows 
            SET name = %(name)s,
            genre = %(genre)s,
            description = %(description)s,
            number_of_episodes = %(number_of_episodes)s,
            episodes_completed = %(episodes_completed)s,
            status = %(status)s,
            rating = %(rating)s
            WHERE id = %(id)s
        """
        return connectToMySQL(db).query_db(query, data)

    @classmethod
    def edit_episodes_watched(cls, data):
        query =  """
        UPDATE shows
        SET episodes_completed = %(episodes_completed)s
        WHERE id = %(id)s
        """
        return connectToMySQL(db).query_db(query, data)
        
#DELETE
    @classmethod
    def delete_show(cls, data):
        query = """
            DELETE FROM shows
            WHERE id = %(id)s
        """
        results = connectToMySQL(db).query_db(query, data)
        return results

