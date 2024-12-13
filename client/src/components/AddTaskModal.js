import React, { useState } from "react";
import axios from 'axios';
import { priorities } from "../constants/priorities";

const AddTaskModal = ({ project, onAdd }) => {
    const todayDate = new Date().toISOString().split("T")[0]
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState(1);
    const [dueDate, setDueDate] = useState(todayDate);

    const handleSubmit = async () => {
        if (!taskName || !dueDate) {
            alert("Task name and due date are required.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/task/",
                {
                    name: taskName,
                    priority,
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
            if (error.response) {
                console.log(error || "An error occurred.");
            }
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter a New Task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                style={{ marginRight: 5 }}
            />
            <label style={{ marginRight: 2 }}>Task Priority:</label>
            <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
            >
                {Object.entries(priorities).map(([key, value]) => (
                    <option key={key} value={value} onSelect={() => setPriority(value)}>{key}</option>
                ))}
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
            <button onClick={handleSubmit} style={{ marginLeft: 2 }}>Add Task</button>
        </div>
    );
};

export default AddTaskModal;