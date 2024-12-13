from utils.create_session import get_db_session
from models import Task, Project
from datetime import datetime, date
from utils.constants import DATE_FORMAT


def create_task(name: str, due_date: date, priority: int, pid: int, tid: int) -> dict:
    """
    This function creates a new task in the DB.
    
    Args:
        name (str): task's name.
        due_date (date): date to finish the task
        priority (int): a number between 1-3 indicates the priority of the task.
        pid (int): the project's ID associated with the task. 
        tid (int): the parent task ID associated with the task.
    Raises:
        KeyError: _description_
        ValueError: _description_

    Returns:
        dict: a dictionary representing the newly created project.
    """
    if not name or len(name.strip()) == 0:
        raise KeyError("Name is not provided or invalid.")
    
    if not due_date:
        raise KeyError("Date is not provided.")
    
    due_date = datetime.strptime(due_date, DATE_FORMAT).date()
        
    if not isinstance(due_date, date):
        raise TypeError("due_date provided incorrectly, please check your input again.")
    
    if priority<1 or priority>3:
        raise ValueError("The given priority level is unkonwn.")

    if not pid:
        raise ValueError("A task most be associated with a project.")
    
    session = get_db_session()
    
    project = session.query(Project).filter_by(id=pid).first()
    
    for task in project.tasks:
        if task.name == name:
            session.close()
            raise ValueError(f"Task '{name}' already exists in this project.")
    
    new_task = Task(name=name, due_date=due_date, priority=priority, project_id=pid)
    
    session.add(new_task)
    session.commit() 
    
    res = new_task.to_dict()
    
    session.close()
    
    return res

def get_task(id: int) -> dict:    
    """
    Get task by it's ID.

    Args:
        id (int): the ID of the requested task.

    Raises:
        KeyError: if the task ID not provided.

    Returns:
        dict: a dictionary object that representing the requested task.
    """
    if not id:
        raise KeyError("ID is not provided.")
    
    session = get_db_session()
    
    task = session.query(Task).filter_by(id=id).first()
    
    res = task.to_dict()    
    session.close()
    
    return res

def delete_task(id: int) -> dict:
    """
    Delete task by it's ID.

    Args:
        id (int): the ID of the task.

    Raises:
        KeyError: if the task ID not provided.

    Returns:
        dict: a dictionary object that representing the deleted task.
    """
    if not id:
        raise KeyError("ID is not provided.")
    
    session = get_db_session()
    
    task = session.query(Task).filter_by(id=id).first()
    
    res = task.to_dict()  
    
    session.delete(task)
    session.commit()
      
    session.close()
    
    return res


def change_task_status(id:int) -> dict:
    """
    Mark tasks as completed or uncompleted, based on the current status of the task.

    Args:
        id (int): the ID of the task.

    Raises:
        KeyError: if the task ID not provided.

    Returns:
        dict: a dictionary object that representing the modified task.
    """
    if not id:
        raise KeyError("ID is not provided.")

    session = get_db_session()
    
    task = session.query(Task).filter_by(id=id).first()
    
    task.completed = not task.completed
    session.commit()
    
    res = task.to_dict()
      
    session.close()
    
    return res
    
