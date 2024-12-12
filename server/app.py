from flask import Flask
from flask_cors import CORS

from routes.project_route import project_bp
from routes.task_route import task_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(project_bp)
app.register_blueprint(task_bp)

@app.route('/')
def index_api():
    return 'Task Management System'

if __name__ == '__main__':
    app.run(debug=True)