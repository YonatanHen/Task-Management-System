import React from "react";
import { priorities, prioritiesColors } from "../constants/priorities";

const TasksList = ({ tasks, onTaskUpdate }) => {
    const markCompleted = (taskId) => {
        fetch(`http://localhost:5000/task/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true }),
        })
            .then((res) => res.json())
            .then((updatedTask) => {
                onTaskUpdate((prevTasks) =>
                    prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
                );
            });
    };

    const deleteTask = (taskId) => {
        fetch(`http://localhost:5000/task/${taskId}`, { method: "DELETE" }).then(() => {
            onTaskUpdate((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td style={{background: prioritiesColors[task.priority]}}>{priorities[task.priority]}</td>
                        <td>{task.completed ? "V" : "X"}</td>
                        <td>
                            {!task.completed && (
                                <button onClick={() => markCompleted(task.id)}>Mark {task.completed ? "Uncompleted" : "Completed"}</button>
                            )}
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TasksList;