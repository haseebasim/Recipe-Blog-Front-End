import React from 'react'
import LOGO from '../../assets/logo.svg'
import {Link} from 'react-router-dom' 
import './About.css'

function About() {
    return (
        <div className='aboutus'>
            <div className='about_logo'>
                <img src={LOGO} alt='logo'/>
            </div>
            <div className='about_content'>
                <h1>About Us</h1>
                <p className='about_text'>
                    Cooking is a skill that every individual should possess, it not only makes you independent but if you know how to cook you can make whatever you want to eat, anytime you want to eat. We provide you with recipes of traditional Asian dishes and as well as westren Fast Food. With easy to follow recipes you can learn to cook these exotic and delicious Foods. Want to see what we offer please visit our <span className='about_span'><Link to='/recipes'>Recipes</Link></span> section and if you want to be notified about new recipes we put out please <span className='about_span'><Link to='/login'>Login</Link></span>
                </p>
            </div>
        </div>
    )
}

export default About
