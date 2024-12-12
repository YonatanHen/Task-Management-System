from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column, declarative_base
from typing import List, Optional
import datetime

Base = declarative_base()

class Task(Base):
    """
    Represents a task in the system.

    Attributes:
        id (int): Unique identifier for the task.
        name (str): Name of the task, must be unique.
        due_date (datetime.date): Deadline for completing the task.
        completed (bool): Indicates if the task is completed. Default is False.
        parent_task_id (Optional[int]): ID of the parent task, if any.
        parent_task (Optional[Task]): Reference to the parent task object.
        subtasks (List[Task]): List of subtasks associated with this task.
        project_relationship (ProjectTask): Relationship to the project-task association.
    """
    __tablename__= "tasks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    due_date: Mapped[datetime.date] = mapped_column(nullable=False)
    completed: Mapped[bool] = mapped_column(default=False, nullable=False)
    parent_task_id: Mapped[Optional[int]] = mapped_column(ForeignKey("tasks.id"), nullable=True)
    
    parent_task: Mapped[Optional["Task"]] = relationship("Task", remote_side="Task.id", backref="subtasks")
    
    project_relationship: Mapped["ProjectTask"] = relationship("ProjectTask", back_populates="task", uselist=False)
   
    
class Project(Base):
    """
    Represents a project in the system.

    Attributes:
        id (int): Unique identifier for the project.
        name (str): Name of the project, must be unique.
        project_relationship (List[ProjectTask]): List of project-task associations.
    """
    __tablename__="projects"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    
    project_relationship: Mapped[List["ProjectTask"]] = relationship("ProjectTask", back_populates="project")


class ProjectTask(Base):
    """
    Represents the association between a project and a task.

    Attributes:
        id (int): Unique identifier for the project-task association.
        project_id (int): ID of the associated project.
        task_id (int): ID of the associated task.
        project (Project): Reference to the associated project object.
        task (Task): Reference to the associated task object.
    """
    __tablename__ = "projects_tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"), nullable=False, unique=True)

    project: Mapped["Project"] = relationship("Project", back_populates="project_relationship")
    task: Mapped["Task"] = relationship("Task", back_populates="project_relationship")

    __table_args__ = (
        UniqueConstraint("project_id", "task_id", name="unique_project_task"),
    )  
    