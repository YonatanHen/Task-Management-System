import React from "react";
import FindModal from "../shared/FindModal";
import ProjectsList from "./ProjectsList";
import AddProjectModal from "./AddProjectModal";
import Pagination from "./Pagination";

const Projects = ({ setSearchProjectsQuery, projects, setProjects, fetchTasks, currentPage, totalProjects, pageSize, handlePageChange, setSelectedProject}) => {

    return (
        <div>
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
    )
}

export default Projects;