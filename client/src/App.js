import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HOST } from "./constants/host";
import { sortTasks } from "./utils/sortTasks";
import Tasks from "./components/tasks/Tasks";
import Projects from "./components/projects/Projects";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchProjectsQuery, setSearchProjectsQuery] = useState("")
  const [searchTasksQuery, setSearchTaskQuery] = useState("")
  const pageSize = 10;
  const currentTasks = useRef(tasks)

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
      setTasks(
        currentTasks.current.filter((task) =>
          task.name.toLowerCase().includes(searchTasksQuery.toLowerCase())
        )
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
      alert("Failed to fetch tasks:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div id="App">
        <Routes>
          {/* Projects Page */}
          <Route
            path="/"
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

          {/* Project's tasks Page */}
          <Route
            path="/projects/:projectId"
            element={
              <Tasks
                selectedProject={selectedProject}
                setSearchTaskQuery={setSearchTaskQuery}
                tasks={tasks}
                setTasks={setTasks}
                sortTasks={sortTasks}
              />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
