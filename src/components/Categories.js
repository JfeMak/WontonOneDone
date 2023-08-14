import React from "react"

// Categories component

export default function Categories(props) {
    // Display Categories component
    return (
        !props.breakTime && <div className = "categories">
            <h2 className = "catmain-task">
                Main Task
            </h2>
            <h2 className = "cattarget-time">
                Target Time
            </h2>
            <h2 className = "catcurrent-time">
                Current Time
            </h2>
        </div>
    )
}