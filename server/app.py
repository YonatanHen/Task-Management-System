import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
from routes.project_route import project_bp
from routes.task_route import task_bp

load_dotenv()
CLIENT_URL=os.environ.get('CLIENT_URL')

app = Flask(__name__)
CORS(app, origins=[CLIENT_URL])
socketio = SocketIO(app, cors_allowed_origins=CLIENT_URL)

app.register_blueprint(project_bp)
app.register_blueprint(task_bp)

users = []

@app.route('/')
def index_api():
    return 'Task Management System'

@socketio.on('login')
def handle_login(username):
    if username not in users:
        users.append(username)
        emit('usersList', users, broadcast=True)

@socketio.on('disconnect')
def handle_disconnect():
    global users
    emit('usersList', users, broadcast=True)
    users = [user for user in users if user['session_id'] != request.sid]

@app.route('/users')
def get_logged_in_users():
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)