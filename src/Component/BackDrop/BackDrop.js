import React from 'react'
import './BackDrop.css'

function BackDrop({handleBackDrop}) {
    return (
        <div className='backdrop' onClick={handleBackDrop} >
        </div>
    )
}

export default BackDrop
