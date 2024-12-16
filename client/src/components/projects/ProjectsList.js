import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../constants/host";
import errorHandler from "../../utils/errorHandler";

const ProjectsList = ({ projects, setProjects, onSelectProject, fetchTasks }) => {
    const navigate = useNavigate();

    const handleSelect = async (project) => {
        /**
         * Handles selections of a project from the list
         * @param {Object} project a project object. 
         */
        await onSelectProject(project);
        await fetchTasks(project);
        navigate(`/projects/${project.id}`);
    };

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`${HOST}/project/${projectId}`)
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        } catch (error) {
            errorHandler(error);
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>
                            <button onClick={() => handleSelect(project)}>
                                View Tasks
                            </button>
                            <button onClick={() => deleteProject(project.id)}>
                                Delete Project
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectsList;
