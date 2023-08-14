import React from "react"

// Add Task component

export default function AddTask(props) {
    // Track the task data from the input boxes
    const [taskData, setTaskData] = React.useState({
        taskName : "",
        targetTime : "",
        importance : ""
    })

    // Function to handle any changes from the input boxes
    function handleChange(event) {
        const {name, value} = event.target
        setTaskData(prevTaskData => {
            return {
                ...prevTaskData,
                [name]: value
            }
        })
    }

    // Display the Add Task component
    return (
        !props.breakTime && <div className = "add-task">
            <h2 className = "add-task-text">Add Task</h2>
            <div className = "add-task-inputs">
                <input 
                    className = "at-task-name" 
                    name = "taskName"
                    type = "text" 
                    placeholder = "Task Name"
                    value = {taskData.taskName}
                    onChange={handleChange}
                />
                <input 
                    className = "at-target-time"
                    name = "targetTime"
                    type = "text" 
                    placeholder = "Target Time (hours:minutes:seconds)"
                    value = {taskData.targetTime}
                    onChange={handleChange}
                />
                <input 
                    className = "at-importance"
                    name = "importance"
                    type = "number" 
                    placeholder = "Importance [0, 10]"
                    value = {taskData.importance}
                    onChange={handleChange}
                />
            </div>
            <button 
                className = "add-task-button" 
                onClick = {() => props.createNewTask(taskData.taskName, taskData.targetTime, taskData.importance)}
            >
                <b>
                    Add
                </b>
            </button>
        </div>
    )
}