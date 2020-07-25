import React from 'react'
import './SideDrawer.css'
import { NavLink } from 'react-router-dom'
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
                <NavLink activeClassName='active_nav' to='/home' className='sidedrawer_link'>Home</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/about' className='sidedrawer_link'>About</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/recipes' className='sidedrawer_link'>Recipes</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/contact' className='sidedrawer_link'>Contact us</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/suggestion' className='sidedrawer_link'>Suggestions</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/saved_recipes' className='sidedrawer_link'>Saved Recipes</NavLink>
            </div>
            <div className='sidedrawer_item'>
                <NavLink activeClassName='active_nav' to='/login' className='sidedrawer_link'>Login / Signup</NavLink>
            </div>
        </div>
    )
}

export default SideDrawer
