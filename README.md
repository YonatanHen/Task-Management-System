# Tasks Management Application 
This web application is designed to assist users in managing their day-to-day tasks efficiently.
With a user-friendly interface, it enables seamless organization of tasks by projects, prioritization of tasks, creation of subtasks, and setting deadlines. 
Users can easily add, or remove tasks and projects, empowering them to take control of their daily responsibilities and stay on top of their goals.

## Tech Stack  
#### Frontend (JavaScript):
- ReactJS
- Axios
- React-router-DOM
- Bootstrap & CSS

#### Backend (Python):
- Flask
- SQLAlchemy
- CORS
- smtplib

#### DB:
- PostgreSQL
> **Note**: DB running as a container in Docker, over port 5432 (PostgreSQL default)


## How to Run the Project  
Provide step-by-step instructions to set up and run the project locally.  

## Instructions  
Outline how to use the project, interact with its features, or perform specific tasks.  

## Implemented Features  
### Core Features  
- Add projects.
- Tasks organized per project.
- Mark tasks as completed.
- Filter tasks (Find feature) by name (case-insensitive).
- Tasks include the following properties: name, due date, priority (low/medium/high), completed, parent task reference, and reference to their project.
- Tasks are organized for each project by their deadline.

### Bonus Features  
- Allow users to mark tasks as dependent on other tasks.
- The user receives an email once a new task is added.
- A visual indicator for how many tasks are completed out of the total tasks in the project.
- Visual connections between tasks are represented in the tasks list.

## Future Improvements  
Highlight potential enhancements or new features that could be added with more time or resources.  

## Additional Features (If Implemented)  
- Remove projects.
- Remove tasks.
- Mark tasks as uncompleted
- Pagination in project screen, organized 10 projects per page.
- Reset search results on the projects page.
- Filter tasks (Find feature) by name (case-insensitive).
- Task priorities represented by constant colors: low-green, medium-yellow, high-red.
- Tasks are sorted by their due date not only on the initial rendering of the tasks page but also where new tasks are added.
