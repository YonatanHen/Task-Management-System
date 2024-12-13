import React, { useState } from "react";

const AddTaskModal = ({ projectId, onAdd }) => {
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState(1);

    const handleSubmit = () => {
        fetch("http://localhost:5000/task/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: taskName,
                priority,
                project_id: projectId,
            }),
        })
            .then((res) => res.json())
            .then((newTask) => {
                onAdd(newTask);
                setTaskName("");
                setPriority(1);
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <input
                type="number"
                min="1"
                max="3"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
            />
            <button onClick={handleSubmit}>Add Task</button>
        </div>
    );
};

export default AddTaskModal;