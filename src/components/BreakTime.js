import React from "react"

// Break Time component

export default function BreakTime(props) {
    // Track time data from input
    const [timeData, setTimeData] = React.useState("")
    // Track time from break time
    const [breakTimeTime, setBreakTimeTime] = React.useState(1)
    // Track whether the timer should be running
    const [isRunning, setIsRunning] = React.useState(false)

    // Timer for the break time
    React.useEffect(() => {
        if (breakTimeTime <= 0) {
            props.setBreakTime(false)
            setIsRunning(false)
            setTimeData("")
        }
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => setBreakTimeTime(breakTimeTime - 1), 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, breakTimeTime]);

    // Handle any change in the input
    function handleChange(event) {
        const {value} = event.target
        setTimeData(value)
    }

    // Handle the event where the user clicks the start button
    function handleClickStart() {
        const breakTimeArr = timeData.split(":")
        setIsRunning(true)
        if (isNaN(parseInt(breakTimeArr[0]) * 60 + parseInt(breakTimeArr[1]))) {
            setBreakTimeTime(0)
        } else {
            setBreakTimeTime(parseInt(breakTimeArr[0]) * 60 + parseInt(breakTimeArr[1]))
        }
    }

    // Handle the event where the user clicks the skip button
    function handleClickSkip() {
        props.setBreakTime(false)
        setIsRunning(false)
        setTimeData("")
        setBreakTimeTime(0)
    }

    // Display the Break Time component
    return (
        props.breakTime && <div className = "break-time">
            <h2 className = "break-time-gj">Great Job!</h2>
            <h2 className = "break-time-break">You deserve a break!</h2>
            {isRunning && 
                <h1
                    className = "break-time-countdown"
                >
                    {((breakTimeTime % 3600) / 60) | 0}:{breakTimeTime % 60 < 10 ? "0" + breakTimeTime % 60 : breakTimeTime % 60}
                </h1>
            }
            {!isRunning && <h3 className = "break-time-st">Set time:</h3>}
            {!isRunning && <input 
                type="text" 
                placeholder = "minutes:seconds"
                className = "break-time-input"
                onChange = {(event) => handleChange(event)}
                value = {timeData}
            />}
            <div className = "break-time-buttons">
                {!isRunning && <button
                    className = "break-time-b-start"
                    onClick = {handleClickStart}
                >
                    <b>
                        Start
                    </b>
                </button>}
                <button
                    className = "break-time-b-skip"
                    onClick = {handleClickSkip}
                >
                    <b>
                        Skip
                    </b>
                </button>
            </div>
        </div>
    )
}