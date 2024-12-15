import React, { useState } from "react";
import axios from 'axios';
import { HOST } from "../../constants/host";

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
            if (error.name === 'AxiosError') {
                alert(error.response.data)
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <div>
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