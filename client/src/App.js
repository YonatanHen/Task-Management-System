import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./components/projects/ProjectsList";
import AddProjectModal from "./components/projects/AddProjectModal";
import TasksList from "./components/tasks/TasksList";
import AddTaskModal from "./components/tasks/AddTaskModal";
import Pagination from "./components/projects/Pagination";
import FindProjectModal from "./components/projects/FindProjectModal";
import { HOST } from "./constants/host";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchQuery, setSearchQuery] = useState("")
  const pageSize = 10;

  // Fetch projects
  useEffect(() => {
    fetch(`${HOST}/project?page=${currentPage}&page_size=${pageSize}${searchQuery.length > 0 ? `&input=${searchQuery}` : ""}`)
      .then((res) => res.json())
      .then(data => {
        setProjects(data)
        setTotalProjects(data.length)
      });
  }, [currentPage, searchQuery]);

  // Fetch tasks for the selected project
  const fetchTasks = async (project) => {
    if (!project) return; 
    try {
      const response = await axios.get(`${HOST}/project/${project.id}`);
      const tasks = response.data.tasks;
      setTasks(tasks);
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
        <h1>Task Manager</h1>
        <Routes>
          {/* Projects Page */}
          <Route
            path="/"
            element={
              <div>
                <FindProjectModal setSearchQuery={setSearchQuery} />
                <ProjectsList
                  projects={projects}
                  setProjects={setProjects}
                  onSelectProject={(project) => setSelectedProject(project)}
                  fetchTasks={fetchTasks}
                />
                <AddProjectModal onAdd={(newProject) => setProjects([...projects, newProject])} />
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalProjects}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                />
              </div>
            }
          />

          {/* Tasks Page */}
          <Route
            path="/projects/:projectId"
            element={
              <div>
                {selectedProject && (
                  <>
                    <h2>Tasks for Project "{selectedProject.name}"</h2>
                    <AddTaskModal
                      project={selectedProject}
                      onAdd={(newTask) => setTasks([...tasks, newTask])}
                    />
                    <TasksList
                      tasks={tasks}
                      onTaskUpdate={setTasks}
                    />
                  </>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
