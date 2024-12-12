from sqlalchemy import ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship, Mapped, mapped_column, declarative_base
from typing import List, Optional
import datetime

Base = declarative_base()

class Task(Base):
    """
    Represents a task in the system.

    Attributes:
        id (int): Unique identifier for the task.
        name (str): Name of the task, must be unique within a project.
        due_date (datetime.date): Deadline for completing the task.
        priority (int): A value between 1-3 that defines the priorty of the task.
        completed (bool): Indicates if the task is completed. Default is False.
        parent_task_id (Optional[int]): ID of the parent task, if any.
        parent_task (Optional[Task]): Reference to the parent task object.
        subtasks (List[Task]): List of subtasks associated with this task.
        project_id (int): ID of the associated project.
    """
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    due_date: Mapped[datetime.date] = mapped_column(nullable=False)
    priority: Mapped[int] = mapped_column(default=0, nullable=False)
    completed: Mapped[bool] = mapped_column(default=False, nullable=False)
    parent_task_id: Mapped[Optional[int]] = mapped_column(ForeignKey("tasks.id"), nullable=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)

    parent_task: Mapped[Optional["Task"]] = relationship(
        "Task", remote_side="Task.id", backref="subtasks"
    )
    project: Mapped["Project"] = relationship("Project", back_populates="tasks")
    
    __table_args__ = (
        CheckConstraint('priority >=1 AND priority <=3', name="check_priority_range"),
    )


class Project(Base):
    """
    Represents a project in the system.

    Attributes:
        id (int): Unique identifier for the project.
        name (str): Name of the project, must be unique.
        tasks (List[Task]): List of tasks associated with the project.
    """
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)

    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="project")
