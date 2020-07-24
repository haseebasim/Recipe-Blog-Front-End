import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import FooterLogo from '../../assets/logo_footer.svg'


function Footer() {
    return (
        <footer>
            <div className='logo_container'>
                <div className='site_footer_logo'>
                    <Link to='/home'>
                        <img src={FooterLogo} alt='Footer logo'/>
                    </Link>
                </div>
                <div className='social_links'>
                    <a href='/' ><span className='fab fa-facebook-square'></span></a>

                    <a href='/' ><span className='fab fa-instagram'></span></a>

                    <a href='/' ><span className='fab fa-youtube'></span></a>
                </div>
            </div>
            <div>
                <div className='footer_nav_container'>
                    <div className='footer_item'>
                        <Link to='/home' className='footer_link'>Home</Link>
                    </div>
                    <div className='footer_item'>
                        <Link to='/about' className='footer_link'>About</Link>
                    </div>
                    <div className='footer_item'>
                        <Link to='/recipes' className='footer_link'>Recipes</Link>
                    </div>
                    <div className='footer_item'>
                        <Link to='/contact' className='footer_link'>Contact us</Link>
                    </div>
                    <div className='footer_item'>
                        <Link to='/suggestion' className='footer_link'>Suggestions</Link>
                    </div>
                    <div className='footer_item'>
                        <Link to='/saved_recipes' className='footer_link'>Saved Recipes</Link>
                    </div>
                    <div className='footer_item'>
                            <Link to='/login' className='footer_link'>Login / Signup</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
