import React from "react";

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
                        <td>{task.priority}</td>
                        <td>{task.completed ? "Yes" : "No"}</td>
                        <td>
                            {!task.completed && (
                                <button onClick={() => markCompleted(task.id)}>Complete</button>
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