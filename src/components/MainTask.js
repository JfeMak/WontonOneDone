import React from "react"

// Main Task component

export default function MainTask(props) {
    // Different colored square for different tiers of importance
    const styles = {
        backgroundColor: props.importance <= 2 ? "#59ff00" 
            : props.importance <= 4 ? "#b7ff00"
            : props.importance <= 6 ? "#fff200"
            : props.importance <= 8 ? "#fc9d03"
            : "#ff0000"
    }

    // Handle when the user clicks the "Done!" button
    function handleClick() {
        props.changeMainTask(
            "None - Press the switch button!",
            [0, 0, 0],
            0,
            "-1",
            true
        )
        if (props.id !== "-1" && props.hasBreakTime) {
            props.setBreakTime(true)
        }
    }

    // Display the Main Task component
    return (
        !props.breakTime && <div>
            <div className = "main-task">
                <div className = "importance" style = {styles}>_</div>
                <h3 className = "main-task-name">
                    {props.task.length <= 31 ? props.task : props.task.substring(0, 31) + "..."}
                </h3>
                <h4 className = "main-task-time">
                    {parseInt(props.time[0]) < 10 ? "0" + parseInt(props.time[0]) : parseInt(props.time[0])}:
                    {parseInt(props.time[1]) < 10 ? "0" + parseInt(props.time[1]) : parseInt(props.time[1])}:
                    {parseInt(props.time[2]) < 10 ? "0" + parseInt(props.time[2]) : parseInt(props.time[2])}
                </h4>
                <h4 className = "main-task-current-time">
                    {props.currentTime[0] < 10 ? "0" + props.currentTime[0] : props.currentTime[0]}:
                    {props.currentTime[1] < 10 ? "0" + props.currentTime[1] : props.currentTime[1]}:
                    {props.currentTime[2] < 10 ? "0" + props.currentTime[2] : props.currentTime[2]}
                </h4>
            </div>
            <div className = "main-task-button-container">
                <button 
                    className = "main-task-button"
                    onClick = {handleClick}
                >
                    <b>
                        D O N E !
                    </b>
                </button>
            </div>
            
        </div>
    )
}