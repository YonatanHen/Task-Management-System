import React from "react";
import axios from 'axios';
import { priorities, prioritiesColors } from "../constants/priorities";
import { HOST } from "../constants/host";

const TasksList = ({ tasks, onTaskUpdate }) => {
    const markCompleted = async (taskId) => {
        try {
            const response = await axios.patch(`${HOST}/task/${taskId}`,
                { completed: true },
                { "Content-Type": "application/json" }
            );

            const updatedTask = response.data;

            onTaskUpdate((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error) {
            alert(error.response);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${HOST}/task/${taskId}`)
            onTaskUpdate((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } catch (error) {
            alert(error.message);
        }
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
                        <td style={{ background: prioritiesColors[task.priority] }}>{priorities[task.priority]}</td>
                        <td>{task.completed ? "V" : "X"}</td>
                        <td>
                            <button onClick={() => markCompleted(task.id)}>Mark {task.completed ? "Uncompleted" : "Completed"}</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TasksList;