import React, { useState } from "react";
import axios from "axios";
import { priorities, prioritiesColors } from "../../constants/priorities";
import { HOST } from "../../constants/host";
import errorHandler from "../../utils/errorHandler";

const TasksList = ({ tasks, onTaskUpdate, tasksCount, setTasksCount }) => {
    const [dependencies, setDependencies] = useState({});
    const [completedTasksCount, setCompletedTasksCount] = useState(tasks.filter(task => task.completed).length)

    const changeTaskStatus = async (taskId) => {
        /** Changes task staus (completed or uncompleted).
         * @param {number} taskId the ID of the task that should change it's status 
         */
        try {
            const response = await axios.patch(`${HOST}/task/${taskId}`, {
                change_status: true
            });

            const updatedTask = response.data;

            const value = await updatedTask.completed ? 1 : -1;

            setCompletedTasksCount(completedTasksCount + value);

            onTaskUpdate((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error) {
            errorHandler(error);
        }
    };


    const deleteTask = async (taskId) => {
        /** Handles deletion of a task by it's ID
         * @param {number} taskId the ID of the task that should be deleted.
         */
        try {
            await axios.delete(`${HOST}/task/${taskId}`);
            onTaskUpdate((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            setTasksCount(tasksCount-1)
        } catch (error) {
            errorHandler(error);
        }
    };


    const updateDependency = async (taskId, parentTaskId) => {
        /** Update task dependency by assigning the task to "parent" task.
         * @param {number} taskId the ID of the task we want to assign.
         * @param {number} parent_task_id the ID of the parent task that we want to set as a parent.
         */
        try {
            if (parentTaskId === null) {
                parentTaskId = 'None'
            }
            const response = await axios.patch(`${HOST}/task/${taskId}`, {
                parent_task_id: parentTaskId,
            });
            const updatedTask = response.data;

            onTaskUpdate((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error) {
            errorHandler(error);
        }
    };

    const renderTaskRow = (task, level = 0) => {
        /** Function renders task row
         * @param {Object} task an object that includes task's data.
         * @param {number} level the level of the task in the table, based on his level on its own hirerachy of dependants. 
         */
        const dependentTasks = tasks.filter((t) => t.parent_task_id === task.id);

        return (
            <React.Fragment key={task.id}>
                <tr style={{ paddingLeft: `${level * 20}px` }}>
                    <td id="task-name" style={{ paddingLeft: `${level * 20}px` }}>{task.parent_task_id ? "➡️ " + task.name : "🔷 " + task.name}</td>
                    <td style={{ background: prioritiesColors[task.priority] }}>
                        {priorities[task.priority]}
                    </td>
                    <td>{Intl.DateTimeFormat("en-GB").format(new Date(task.due_date))}</td>
                    <td>{task.completed ? "✔️" : "❌"}</td>
                    <td>
                        <select
                            value={dependencies[task.id] || task.parent_task_id || ""}
                            onChange={(e) => {
                                const selectedParentId = e.target.value;
                                setDependencies((prev) => ({
                                    ...prev,
                                    [task.id]: selectedParentId,
                                }));
                                updateDependency(task.id, selectedParentId || null);
                            }}
                        >
                            <option value="">None</option>
                            {tasks
                                .filter((t) => t.id !== task.id) // Exclude the task itself
                                .map((optionTask) => (
                                    <option key={optionTask.id} value={optionTask.id}>
                                        {optionTask.name}
                                    </option>
                                ))}
                        </select>
                    </td>
                    <td id="tasks-actions-buttons">
                        <button onClick={() => changeTaskStatus(task.id)}>
                            Mark {task.completed ? "Uncompleted" : "Completed"}
                        </button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </td>
                </tr>
                {dependentTasks.map((dependentTask) =>
                    renderTaskRow(dependentTask, level + 1)
                )}
            </React.Fragment>
        );
    };

    return (
        <table style={{ borderSpacing: "20px", width: "100%" }}>
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Dependency</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks
                    .filter((task) => !task.parent_task_id)
                    .map((task) => renderTaskRow(task))}
            </tbody>
            <label style={{ fontWeight: "bold", marginTop: 10, fontSize: 20 }}>Completed Tasks: {completedTasksCount}/{tasksCount}</label>
        </table>
    );
};

export default TasksList;