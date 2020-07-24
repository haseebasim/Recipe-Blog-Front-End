import React from 'react'
import './TogglerBtn.css'
function TogglerBtn({handleToggler}) {
    return (
        <div className='navbar_toggler' onClick={handleToggler}>
            <span className='bar line1'></span>

            <span className='bar line2'></span>

            <span className='bar line3'></span>
        </div>
    )
}

export default TogglerBtn
