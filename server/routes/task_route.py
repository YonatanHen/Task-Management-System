from flask import jsonify, Blueprint, request
from sqlalchemy.exc import SQLAlchemyError

from services.task_service import *

task_bp = Blueprint('task', __name__, url_prefix='/task')

@task_bp.route('/', methods=['POST'])
def create_task_api():
    try:
        if request.method == "POST":
            payload = request.get_json()
            
            task_name = payload.get('name')
            due_date = payload.get('due_date')
            priority = payload.get('priority')
            pid = payload.get('project_id')
            tid = payload.get('task_id')
            
            task = create_task(task_name, due_date, priority, pid, tid)
            
            return jsonify({ "message": "Project added successfully", "task": task })
            
    except KeyError as e:
        return str(e), 400
    except ValueError as e:
        return str(e), 409
    except SQLAlchemyError as e:
        return str(e), e.code
    except Exception as e:
        return str(e), 500
    
        
@task_bp.route('/<int:id>', methods=['GET', 'DELETE'])
def get_delete_task_api(id):
    try:
        if request.method == "GET":
            project = get_task(id)                        
        elif request.method == "DELETE":
            project = delete_task(id)
            
        return jsonify(project)
    
    except KeyError as e:
        return str(e), 400
    except SQLAlchemyError as e:
        return str(e), e.code
    except Exception as e:
        return str(e), 500
