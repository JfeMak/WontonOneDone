import React from "react"

// Navbar component

export default function Navbar(props) {
    // Display the Navbar component
    return (
        <nav className = "navbar">
            <img className = "logo" src={require("../images/Dumping.png")} alt = "Dumping Logo"/>
            <h1 className = "logo-name">WontonOneDone</h1>
            <button 
                className = "has-break-button"
                onClick = {() => props.setHasBreakTime(!props.hasBreakTime)}
            >
                {props.hasBreakTime ? "Break Time" : "No Break Time"}
            </button>
        </nav>
    )
}