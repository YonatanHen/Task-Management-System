import React, { useState } from "react";

const AddProjectModal = ({ onAdd }) => {
    const [projectName, setProjectName] = useState("");

    const handleSubmit = () => {
        fetch("${HOST}/project", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: projectName }),
        })
            .then((res) => res.json())
            .then((newProject) => {
                onAdd(newProject);
                setProjectName("");
            });
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