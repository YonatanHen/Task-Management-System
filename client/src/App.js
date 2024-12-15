import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsList from "./components/projects/ProjectsList";
import AddProjectModal from "./components/projects/AddProjectModal";
import TasksList from "./components/tasks/TasksList";
import AddTaskModal from "./components/tasks/AddTaskModal";
import Pagination from "./components/projects/Pagination";
import FindModel from './components/shared/FindModal'
import { HOST } from "./constants/host";

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
        setProjects(data.slice((currentPage-1)*pageSize, currentPage*pageSize));
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
      const tasks = response.data.tasks;
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
              <div>
                <FindModel setSearchQuery={setSearchProjectsQuery} searchedItem="project" />
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
                    <FindModel setSearchQuery={setSearchTaskQuery} searchedItem="task" />
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
