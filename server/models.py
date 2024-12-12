from sqlalchemy import ForeignKey, UniqueConstraint, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column, declarative_base
from typing import List, Optional

Base = declarative_base()

class Task(Base):
    __tablename__= "tasks"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    due_date: Mapped[Date] = mapped_column(nullable=False)
    completed: Mapped[bool] = mapped_column(default=False, nullable=False)
    parent_task_id: Mapped[Optional[int]] = mapped_column(ForeignKey("tasks.id"), nullable=True)
    
    parent_task: Mapped[Optional["Task"]] = relationship("Task", remote_side="Task.id", backref="subtasks")
    
    project_relationship: Mapped["ProjectTask"] = relationship("ProjectTask", back_populates="task", uselist=False)
   
    
class Project(Base):
    __tablename__="projects"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True, nullable=False)
    
    project_relationship: Mapped[List["ProjectTask"]] = relationship("ProjectTask", back_populates="project")


class ProjectTask(Base):
    __tablename__ = "projects_tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"), nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey("tasks.id"), nullable=False, unique=True)

    project: Mapped["Project"] = relationship("Project", back_populates="project_relationship")
    task: Mapped["Task"] = relationship("Task", back_populates="project_relationship")

    __table_args__ = (
        UniqueConstraint("project_id", "task_id", name="unique_project_task")
    )  
    