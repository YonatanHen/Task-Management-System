import React from "react";
import { Link } from "react-router-dom";

const ProjectsList = ({ projects }) => {
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
                            <Link to={`/projects/${project.id}`}>View Tasks</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProjectsList;
