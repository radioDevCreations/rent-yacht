from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Harbour

# app instance
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({
       "error": "User already exists"
    }), 409
    hashed_password = bcrypt.generate_password_hash(password)
    
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
       "id": new_user.id,
       "email": new_user.email
    })
    
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({ "error": "Unauthorized" }), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({ "error": "Unauthorized" }), 401
    
    if 'session_id' not in session:
        session['session_id'] = str(user.id)
    
    return jsonify({
       "id": user.id,
       "email": user.email
    })
    
@app.route("/api/harbours", methods=["POST", "GET"])
def add_get_harbour():
    if request.method == "POST":
        name = request.json["name"]
        localization = request.json["localization"]
        harbour_exists = Harbour.query.filter_by(name=name, localization=localization).first() is not None

        if harbour_exists:
            return jsonify({
        "error": "Harbour already exists"
        }), 409
        
        new_harbour = Harbour(name=name, localization=localization)
        db.session.add(new_harbour)
        db.session.commit()
        return jsonify({
        "id": new_harbour.id,
        "name": new_harbour.name,
        "localization": new_harbour.localization
        })
    elif request.method == "GET":
        harbours = []
        for harbour in Harbour.query.all():
            harbours.append({ "id": harbour.id, "name": harbour.name, "localization": harbour.localization})
        return jsonify({ "harbours": harbours })
        

if __name__ == "__main__":
    app.run(debug=True)