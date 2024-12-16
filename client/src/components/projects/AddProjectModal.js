import React, { useState } from "react";
import axios from 'axios';
import { HOST } from "../../constants/host";
import errorHandler from "../../utils/errorHandler";

const AddProjectModal = ({ onAdd }) => {
    const [projectName, setProjectName] = useState("");

    const handleSubmit = async () => {
        try {
            const respone = await axios.post(
                `${HOST}/project/`,
                {
                    name: projectName
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const newProject = respone.data
            onAdd(newProject)
        } catch (error) {
            errorHandler(error);
        }
    };

    return (
        <div style={{ marginTop: 8, marginBottom: 8 }}>
            <input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={handleSubmit}>Add Project</button>
        </div>
    );
};

export default AddProjectModal;