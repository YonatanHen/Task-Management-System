import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import AddProjectModal from "./components/AddProjectModal";
import TasksList from "./components/TasksList";
import AddTaskModal from "./components/AddTaskModal";
import Pagination from "./components/Pagination";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const pageSize = 10;

  // Fetch projects
  useEffect(() => {
    fetch(`http://localhost:5000/project?page=${currentPage}&page_size=${pageSize}`)
      .then((res) => res.json())
      .then(data => {
        setProjects(data)
        setTotalProjects(data.length)
      });
  }, [currentPage]);

  // Fetch tasks for the selected project
  useEffect(() => {
    if (selectedProject) {
      fetch(`http://localhost:5000/project/${selectedProject.id}`)
        .then((res) => res.json())
        .then(data => {
          setTasks(data.tasks)
        });
    }
  }, [selectedProject]);

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
                <AddProjectModal onAdd={(newProject) => setProjects([...projects, newProject])} />
                <ProjectsList
                  projects={projects}
                  onSelectProject={(id) => setSelectedProject(id)}
                />
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
