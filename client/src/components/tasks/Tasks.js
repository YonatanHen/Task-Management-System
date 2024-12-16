import React, { useState } from "react";
import FindModal from "../shared/FindModal"
import TasksList from "./TasksList"
import AddTaskModal from "./AddTaskModal"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = ({ selectedProject, setSearchTaskQuery, tasks, setTasks, sortTasks, currentTasks }) => {
    const navigate = useNavigate();
    const [tasksCount, setTasksCount] = useState(currentTasks.length)

    useEffect(() => {
        /** navigate to the main page if no project is loaded (by accessing the tasks page path directly). */
        if (!selectedProject) {
            navigate("/");
        }
    }, [selectedProject, navigate]);

    const handleAddTask = (newTask) => {
        /** Render results once a new task is added
         * @param {Object} task task's object retreived from server.
         */
        setTasks(sortTasks([...tasks, newTask]))
        setTasksCount(tasksCount + 1)
    }

    return (
        <div>
            {selectedProject ? (
                <>
                    <h2>Tasks for Project "{selectedProject.name}"</h2>
                    <FindModal setSearchQuery={setSearchTaskQuery} searchedItem="task" />
                    <TasksList
                        tasks={tasks}
                        onTaskUpdate={setTasks}
                        tasksCount={tasksCount}
                        setTasksCount={setTasksCount}
                    />
                    <AddTaskModal
                        project={selectedProject}
                        onAdd={(newTask) => {
                            handleAddTask(newTask)
                        }}
                    />
                </>
            ) : <h2>Loading...</h2>}
        </div>
    )
}

export default Tasks