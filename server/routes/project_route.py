from flask import jsonify, Blueprint, request
from sqlalchemy.exc import SQLAlchemyError

from services.project_service import *

project_bp = Blueprint('project', __name__, url_prefix='/project')

@project_bp.route('/', methods=['GET','POST'])
def create_project_get_projects_api():
    try:
        if request.method == "GET":
            page_number = int(request.args.get('page',1))
            page_size = int(request.args.get('page_size', 10))
            
            projects = get_projects(page_number, page_size)
            
            return jsonify(projects)
            
        if request.method == "POST":
            payload = request.get_json()
            project_name = payload.get('name')
            
            project = create_project(project_name)
            
            return jsonify(project)
            
    except KeyError as e:
        return str(e), 400
    except ValueError as e:
        return str(e), 409
    except SQLAlchemyError as e:
        return str(e), e.code
    except Exception as e:
        return str(e), 500
    
        
@project_bp.route('/<int:id>', methods=['GET', 'DELETE'])
def get_delete_project_api(id):
    try:
        if request.method == "GET":
            project = get_project(id)                        
        elif request.method == "DELETE":
            project = delete_project(id)
            
        return jsonify(project)
    
    except KeyError as e:
        return str(e), 400
    except SQLAlchemyError as e:
        return str(e), e.code
    except Exception as e:
        return str(e), 500
          