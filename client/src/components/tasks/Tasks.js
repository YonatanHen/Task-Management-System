import React from "react";
import FindModal from "../shared/FindModal"
import TasksList from "./TasksList"
import AddTaskModal from "./AddTaskModal"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = ({ selectedProject, setSearchTaskQuery, tasks, setTasks, sortTasks }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedProject) {
            navigate("/");
        }
    }, [selectedProject, navigate]);

    return (
        <div>
            {selectedProject ? (
                <>
                    <h2>Tasks for Project "{selectedProject.name}"</h2>
                    <FindModal setSearchQuery={setSearchTaskQuery} searchedItem="task" />
                    <TasksList
                        tasks={tasks}
                        onTaskUpdate={setTasks}
                    />
                    <AddTaskModal
                        project={selectedProject}
                        onAdd={(newTask) => setTasks(sortTasks([...tasks, newTask]))}
                    />
                </>
            ) : <h2>Loading...</h2>}
        </div>
    )
}

export default Tasks