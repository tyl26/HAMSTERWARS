import React from 'react'
import { Link } from 'react-router-dom'
import hamsterLogo from '../logo.svg'

function Starts() {
    return (
        <div className="startPage">
            <section className='startContainer'>
                <h1 className='title'>Hamsterswars</h1>
                <h3 className='intro'>pick who is the cutest</h3>

                <img className='logo' src={hamsterLogo} alt="hamster logo" />

                

                <Link className='primaryBtn' to='/gallery'>Gallery</Link>
                <Link className='primaryBtn' to='/battle'>Start Battle</Link>
            </section>
        </div>
    )
}

export default Starts
