# Tasks Management Application 
This web application is designed to assist users in managing their day-to-day tasks efficiently.
With a user-friendly interface, it enables seamless organization of tasks by projects, prioritization of tasks, creation of subtasks, and setting deadlines. 
Users can easily add, or remove tasks and projects, empowering them to take control of their daily responsibilities and stay on top of their goals.
### Architecture
![evernetix](https://github.com/user-attachments/assets/6a41083f-98d1-4b11-af5a-b0aab1fbb671)

### ERD
![evernetix ERD](https://github.com/user-attachments/assets/077fabf8-f516-454f-92a5-ddd10ed82a24)

## Tech Stack  
#### Frontend (JavaScript):
- ReactJS
- Axios
- React-router-DOM
- Bootstrap & CSS
- SocketIO

#### Backend (Python):
- Flask
- SQLAlchemy
- CORS
- smtplib
- SocketIO

#### DB:
- PostgreSQL
> **Note**: DB running as a container in Docker, over port 5432 (PostgreSQL default)


## How to Run the Project  
#### DB:
1. Make sure Docker + Docker Desktop installed on your machine.
2. Create a Docker volume by running the following command:
   
   ```docker volume create evernetix_task_vol```
   
4. Pull and run the Docker PSQL image as follows:
   
   ```docker run --name evernetix-task-db -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -v evernetix_task_vol:/var/lib/postgresql/data -d -p 5432:5432 postgres```

#### Backend:
1. Navigate to the server folder:
   
   ```cd server```
   
2. (optional) Create a virtual environment:
   
   ```python -m venv .```
   
3. Install dependencies from the requirements.txt file:

   ```pip install requirements.txt```
  
5. Create a .env file with the following variables:
   ```
   PSQL_USERNAME=<PostgreSQL username>
   PSQL_PASSWORD=<PostgreSQL password>
   PSQL_URL=<PostgreSQL URL, for example: 'localhost:5432/postgres'>
   SENDER_EMAIL_ID=<Email ID, without @gmail.com postfix>
   SENDER_EMAIL_PASSWORD=<Email's password, please refer to Google documentation in case you are using MFA>
   RECIEVER_EMAIL=<Full email address of the receiver (i.e. Alex's email address)>
   CLIENT_URL=<Client URL, default is http://localhost:3000>
   ```

7. Run the Flask server:
   
   ```python app.py```

#### Frontend:
1. Navigate to the client folder:
   
   ```cd client```
   
3. Install client dependencies:
   
   ```npm i```
   
5. Start the client (React) server:
   
   ```npm start```

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
- The user receives an email once a new task is added:
  ![image](https://github.com/user-attachments/assets/c5d1b46a-97c8-43b7-8cc9-57a66f06faa0)
- A visual indicator for how many tasks are completed out of the total tasks in the project.
- Visual connections between tasks are represented in the tasks list.

## Future Improvements  
- Integrate this project with a tasks management system (like Jira) if new collaborators are added to this project.
- Add tests for both server & client.
- Show a Project's progress bar for each project on the Projects screen (and not only on the Tasks screen).
- Add an activity feed showing all changes to a task/project and which user implemented the changes.
- Improve design.
- Add more complex logic for user authentication and authorization.

## Additional Features
- Remove projects.
- Remove tasks.
- Mark tasks as uncompleted
- Pagination in project screen, organized 10 projects per page.
- Reset search results on the projects page.
- Filter tasks (Find feature) by name (case-insensitive).
- Task priorities are represented by constant colors: low-green, medium-yellow, and high-red.
- Tasks are sorted by their due date not only on the initial rendering of the tasks page but also where new tasks are added.
