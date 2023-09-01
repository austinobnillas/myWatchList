from flask_app.config.mysqlconnection import connectToMySQL
import re 
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
db = "MyWatchList"

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

    def login (data): 
        query = """
            SELECT * FROM users
            WHERE username = %(username)s;
        """
        results = connectToMySQL(db).query_db(query, data)
        print (results)
        if len(results) < 1:
            return False
        return results[0]

    def get_all_users(): 
        query = """
            SELECT * FROM users
        """
        results = connectToMySQL(db).query_db(query)
        print(results)
        
        return results 

    