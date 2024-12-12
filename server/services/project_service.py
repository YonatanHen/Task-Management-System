from utils.create_session import get_db_session
from models import Project

def create_project(name: str) -> dict:
    """
    This function creates a new Project in the DB.
    
    Args:
        name (str): project's name.

    Raises:
        KeyError: _description_
        ValueError: _description_

    Returns:
        dict: a dictionary representing the newly created project.
    """
    if not name or len(name.strip()) == 0:
        raise KeyError("Name is not provided or invalid.")
    
    session = get_db_session()
    
    project_name = session.query(Project).filter_by(name=name).first()
    
    if project_name is not None:
        session.close()
        raise ValueError(f"Project '{name}' already exists.")
    
    new_project = Project(name=name)
    
    session.add(new_project)
    session.commit() 
    
    res = { "id": new_project.id, "name": new_project.name, "tasks": new_project.tasks }
    
    session.close()
    
    return res
    
    
def get_project(id: int) -> dict:
    """
    This function get a project object by it's ID from the DB.

    Args:
        id (int): project's ID.

    Raises:
        KeyError: raised when ID is not provided.

    Returns:
        dict: a dictionary representing the the requested project.
    """
    if not id:
        raise KeyError("ID is not provided.")
    
    session = get_db_session()
    
    project = session.query(Project).filter_by(id=id).first()
    
    res = { "id": project.id, "name": project.name, "tasks": project.tasks }       
    session.close()
    
    return res

    
def delete_project(id: int) -> dict:
    """
    This function deletes a project from the DB.

    Args:
        id (int): project's ID.

    Raises:
        KeyError: raised when ID is not provided.

    Returns:
        dict: The deleted project's object.
    """
    if not id:
        raise KeyError("ID is not provided.")
    
    session = get_db_session()
    
    project = session.query(Project).filter_by(id=id).first()
    
    res = { "id": project.id, "name": project.name, "tasks": project.tasks }  
    
    session.delete(project)     
    session.commit()
    
    session.close()
    
    return res
    
    
    