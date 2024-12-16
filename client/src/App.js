import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HOST } from "./constants/host";
import { sortTasks } from "./utils/sortTasks";
import Tasks from "./components/tasks/Tasks";
import Projects from "./components/projects/Projects";
import Login from "./components/Login";
import { socket } from "./utils/socket";
import errorHandler from "./utils/errorHandler";

const App = () => {
  const [usersList, setUsersList] = useState([])
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchProjectsQuery, setSearchProjectsQuery] = useState("")
  const [searchTasksQuery, setSearchTaskQuery] = useState("")
  const pageSize = 10;
  const currentTasks = useRef(tasks)

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${HOST}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsersList(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        errorHandler(error);
      }
    };

    // Fetch users every 5 seconds
    const intervalId = setInterval(fetchUsers, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch projects
  useEffect(() => {
    fetch(`${HOST}/project?${searchProjectsQuery.length > 0 ? `input=${searchProjectsQuery}` : ""}`)
      .then((res) => res.json())
      .then(data => {
        setProjects(data.slice((currentPage - 1) * pageSize, currentPage * pageSize));
        setTotalProjects(data.length);
      });
  }, [currentPage, searchProjectsQuery]);

  useEffect(() => {
    if (searchTasksQuery.trim() === "") {
      setTasks(currentTasks.current);
    } else {
      const searchTasksQueryLowerCase = searchTasksQuery.toLowerCase();

      setTasks(
        currentTasks.current.filter((task) => {
          let rootTask = task;
          while (rootTask.parent_task) {
            rootTask = rootTask.parent_task;
          }

          const stack = [rootTask];
          while (stack.length > 0) {
            const currentTask = stack.pop();

            if (currentTask.name.toLowerCase().includes(searchTasksQueryLowerCase)) {
              return true;
            }

            if (currentTask.dependent_tasks && currentTask.dependent_tasks.length > 0) {
              stack.push(...currentTask.dependent_tasks);
            }
          }

          return false;
        })
      );
    }
  }, [searchTasksQuery]);

  // Fetch tasks for the selected project
  const fetchTasks = async (project) => {
    if (!project) return;
    try {
      const response = await axios.get(`${HOST}/project/${project.id}`);
      const tasks = sortTasks(response.data.tasks);
      setTasks(tasks);
      currentTasks.current = tasks;
    } catch (error) {
      errorHandler(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      width: "100vw",
      margin: 0,
      padding: 0
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: "200px",
        backgroundColor: "#f7f7f7",
        padding: "10px",
        boxSizing: "border-box",
        borderRight: "1px solid #ddd"
      }}>
        <h5>Recently Viewed</h5>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {usersList.length > 0 ? (
            usersList.map((user, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>{user}</li>
            ))
          ) : (
            <li>No users logged in</li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto"
      }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login setUsersList={setUsersList} socket={socket} />}
            />
            <Route
              path="/projects"
              element={
                <Projects
                  setSearchProjectsQuery={setSearchProjectsQuery}
                  projects={projects}
                  setProjects={setProjects}
                  fetchTasks={fetchTasks}
                  currentPage={currentPage}
                  totalProjects={totalProjects}
                  pageSize={pageSize}
                  handlePageChange={handlePageChange}
                  setSelectedProject={setSelectedProject}
                />
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <Tasks
                  selectedProject={selectedProject}
                  setSearchTaskQuery={setSearchTaskQuery}
                  tasks={tasks}
                  setTasks={setTasks}
                  sortTasks={sortTasks}
                  currentTasks={currentTasks.current}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
