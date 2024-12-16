import React from "react";
import FindModal from "../shared/FindModal";
import ProjectsList from "./ProjectsList";
import AddProjectModal from "./AddProjectModal";
import Pagination from "./Pagination";

const Projects = ({ setSearchProjectsQuery, projects, setProjects, fetchTasks, currentPage, totalProjects, pageSize, handlePageChange, setSelectedProject }) => {

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", justifyContent: "center", alignItems: "center" }}>
            <div style={{ gridColumn: "2 / 3", textAlign: "center" }}>
                <FindModal setSearchQuery={setSearchProjectsQuery} searchedItem="project" />
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
        </div>
    );
};

export default Projects;
