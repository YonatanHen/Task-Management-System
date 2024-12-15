import { useNavigate } from "react-router-dom";

const ProjectsList = ({ projects, onSelectProject, fetchTasks }) => {
    const navigate = useNavigate();

    const handleSelect = async (project) => {
        await onSelectProject(project);
        await fetchTasks(project);
        navigate(`/projects/${project.id}`);
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
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectsList;
