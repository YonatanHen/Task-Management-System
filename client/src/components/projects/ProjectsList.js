import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "../../constants/host";

const ProjectsList = ({ projects, setProjects, onSelectProject, fetchTasks }) => {
    const navigate = useNavigate();

    const handleSelect = async (project) => {
        await onSelectProject(project);
        await fetchTasks(project);
        navigate(`/projects/${project.id}`);
    };

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`${HOST}/project/${projectId}`)
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        } catch (error) {
            alert(error.message);
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
