from flask import jsonify, Blueprint, request
from sqlalchemy.exc import SQLAlchemyError

from services.project_service import *

project_bp = Blueprint('project', __name__, url_prefix='/project')

@project_bp.route('/', methods=['POST'])
def create_project_api():
    if request.method == "POST":
        try:
            payload = request.get_json()
            project_name = payload.get('name')
            
            project = create_project(project_name)
            
            return jsonify({ "message": "Project added successfully", "project": project })
        except Exception as e:
            pass
        
@project_bp.route('/<int:id>', methods=['GET', 'DELETE'])
def get_delete_project_api(id):
    if request.method == "GET":
        try:
            project = get_project(id)
            
            print(project)
                        
            return jsonify(project)
        except Exception as e:
            pass