import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1234@localhost:5432/pokedex_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = "sua-chave-secreta-muito-forte-aqui"


db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt =  Bcrypt(app)
jwt = JWTManager(app)

base_url = "https\://pokeapi.co/api/v2"

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False) 

    teams = db.relationship('Team', backref='owner', lazy=True)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(100), nullable=False)
    pokemon_names = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Usuário e senha não obrigatórios"}), 400
    
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"error": "Usuário e senha são obrigatórios"}),  409
    
    password_hash = Bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, password_hash=password_hash)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": f"Usuário '{username}' criado com sucesso!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Erro ao salvar no banco de dados", "details": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"Error": "Usuário e senha são obrigatórios"}), 400
    
    user = User.query.filter_by(username=username).firts()

    if user and Bcrypt.check_password_hash(user.password_hash, password):

        acess_token = create_access_token(identity=user.id)

        return jsonify(acess_token=acess_token), 200
    else:
        return jsonify({"error": "Credenciais inválidas"}), 401

def get_pokemon_info(name):
    url = f"{base_url}/pokemon/{name.lower()}"
    response = requests.get(url)

    if response.status_code == 200:
        pokemon_data = response.json()
        
        types_list = [item['type']['name'] for item in pokemon_data['types']]
        abilities_list = [item['ability']['name'] for item in pokemon_data['abilities']]

        formatted_data = {
            "name": pokemon_data['name'].capitalize(),
            "id": pokemon_data['id'],
            "height": pokemon_data['height'] / 10, 
            "weight": pokemon_data['weight'] / 10, 
            "sprite": pokemon_data['sprites']['front_default'],
            "types": types_list,
            "abilities": abilities_list
        }
        return formatted_data, 200
    
    elif response.status_code == 404:
        return {"error": f"Pokémon '{name}' não encontrado."}, 404
    else:
        return {"error": "Falha ao buscar dados da PokéAPI."}, response.status_code

@app.route("/api/pokemon/<string:name>", methods=["GET"])
def fetch_pokemon(name):
    data, status_code = get_pokemon_info(name)
    return jsonify(data), status_code

if __name__ == "__main__":
    app.run(debug=True, port=5000)