from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

app = Flask("Task Management System")
app = Flask(__name__.split('.')[0])
CORS(app)

@app.route('/')
def index_api():
    return 'Task Management System'

if __name__ == '__main__':
    app.run(debug=True)