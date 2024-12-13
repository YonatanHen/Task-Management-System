import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./components/ProjectsList";
import AddProjectModal from "./components/AddProjectModal";
import TasksList from "./components/TasksList";
import AddTaskModal from "./components/AddTaskModal";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects
  useEffect(() => {
    fetch("http://localhost:5000/project")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  // Fetch tasks for the selected project
  useEffect(() => {
    if (selectedProject) {
      fetch(`http://localhost:5000/project/${selectedProject}/task`)
        .then((res) => res.json())
        .then(setTasks);
    }
  }, [selectedProject]);

  return (
    <Router>
      <div>
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
                    <h2>Tasks for Project {selectedProject}</h2>
                    <AddTaskModal
                      projectId={selectedProject}
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
