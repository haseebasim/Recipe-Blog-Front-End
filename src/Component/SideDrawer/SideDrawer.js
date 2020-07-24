import React from 'react'
import './SideDrawer.css'
import { Link } from 'react-router-dom'
function SideDrawer({sideDrawer}) {
    let styleCLassName = ''
    if(!sideDrawer){
        styleCLassName = 'sidedrawer_container'
    }
    else{
        styleCLassName = 'sidedrawer_container open'
    }


    return (

        <div className={styleCLassName}>
            <div className='sidedrawer_item'>
                <Link to='/home' className='sidedrawer_link'>Home</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/about' className='sidedrawer_link'>About</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/recipes' className='sidedrawer_link'>Recipes</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/contact' className='sidedrawer_link'>Contact us</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/suggestion' className='sidedrawer_link'>Suggestions</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/saved_recipes' className='sidedrawer_link'>Saved Recipes</Link>
            </div>
            <div className='sidedrawer_item'>
                <Link to='/login' className='sidedrawer_link'>Login / Signup</Link>
            </div>
        </div>
    )
}

export default SideDrawer
