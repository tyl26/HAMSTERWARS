import React from 'react'
import { Link } from 'react-router-dom'

function Starts() {
    return (
        <div className="App">

            Welcome to hamsterwars!

            <Link to='/gallery'>Gallery</Link>
            <Link to='/battle'>Start Battle!</Link>
        </div>
    )
}

export default Starts
