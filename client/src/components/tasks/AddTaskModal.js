import React, { useState } from "react";
import axios from 'axios';
import { priorities } from "../../constants/priorities";
import { HOST } from "../../constants/host";
import errorHandler from "../../utils/errorHandler";

const AddTaskModal = ({ project, onAdd }) => {
    const todayDate = new Date().toISOString().split("T")[0]
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState(todayDate);

    const handleSubmit = async () => {
        /** Handles the submission of adding a new task */
        if (!taskName || !dueDate) {
            alert("Task name and due date are required.");
            return;
        }

        try {
            const response = await axios.post(
                `${HOST}/task/`,
                {
                    name: taskName,
                    priority: priority || 1,
                    project_id: project.id,
                    due_date: dueDate,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            onAdd(response.data.task);
            setTaskName("");
            setPriority(priorities.Low);
            setDueDate(new Date().toISOString().split("T")[0]);
        } catch (error) {
            errorHandler(error);
        }
    };

    return (
        <div style={{ marginTop: 12 }}>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                style={{ marginRight: 5 }}
            />
            <label style={{ marginRight: 8 }}>Task Priority:</label>
            <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
            >
                {Object.entries(priorities).map(([key, value]) => (
                    <option key={value} value={key} onSelect={() => setPriority(key)}>{value}</option>
                ))}
            </select>
            <label style={{ marginInline: 8 }}>Due Date:</label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
            <button onClick={handleSubmit} style={{ marginLeft: 8 }}>Add Task</button>
        </div>
    );
};

export default AddTaskModal;