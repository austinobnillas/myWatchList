from flask_app.config.mysqlconnection import connectToMySQL
db = "my_watch_list"

class User(): 
    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def register(cls, data): 
        query = """
            INSERT INTO users (username, email, password)
            VALUES (%(username)s, %(email)s, %(password)s);
        """
        return connectToMySQL(db).query_db(query, data)

    @classmethod
    def login (cls, data): 
        query = """
            SELECT * FROM users
            WHERE BINARY username LIKE %(username)s;
        """
        results = connectToMySQL(db).query_db(query, data)
        print (results)
        if len(results) < 1:
            return False
        return results[0]

    @classmethod
    def get_one_user (cls, data):
        query = """
            SELECT * FROM users
            WHERE username = %(username)s
        """
        results = connectToMySQL(db).query_db(query, data)
        return results

    @classmethod
    def get_all_users(cls): 
        query = """
            SELECT * FROM users
        """
        results = connectToMySQL(db).query_db(query)
        print(results)
        
        return results 

    