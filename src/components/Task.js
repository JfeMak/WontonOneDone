import React from "react"

// Task component

export default function Task(props) {
    // Different colored square for different tiers of importance
    const styles = {
        backgroundColor: props.importance <= 2 ? "#59ff00" 
            : props.importance <= 4 ? "#b7ff00"
            : props.importance <= 6 ? "#fff200"
            : props.importance <= 8 ? "#fc9d03"
            : "#ff0000"
    }
    
    // Function to handle the click event to set this task as the main task
    function handleClick(event) {
        props.changeMainTask(
            props.task,
            props.time,
            props.importance,
            props.id,
            false
        )
        props.deleteTask(event, props.id)
    }

    // Display the Task component
    return (
        !props.breakTime && <div className = "task">
            <div className = "importance" style = {styles}>_</div>
            <h3 className = "task-name">
                {props.task.length <= 80 ? props.task : props.task.substring(0, 80) + "..."}
            </h3>
            <h4 className = "task-time">
                {parseInt(props.time[0]) < 10 ? "0" + parseInt(props.time[0]) : parseInt(props.time[0])}:
                {parseInt(props.time[1]) < 10 ? "0" + parseInt(props.time[1]) : parseInt(props.time[1])}:
                {parseInt(props.time[2]) < 10 ? "0" + parseInt(props.time[2]) : parseInt(props.time[2])}
            </h4>
            <button 
                className = "task-button" 
                onClick = {(event) => handleClick(event)}
            >
                Switch
            </button>
            <button 
                className = "task-button"
                onClick = {(event) => props.deleteTask(
                    event,
                    props.id
                )}
            >
                Delete
            </button>
        </div>
    )
}