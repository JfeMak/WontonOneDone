import React from "react"

// Up Next component

export default function UpNext(props) {
    // Display Up Next component
    return (
        !props.breakTime && <h2 className = "up-next">Up Next</h2>
    )
}