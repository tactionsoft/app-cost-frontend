import React from "react";
import logo2 from './Taction-Logo.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className="logo">
            <img className='' style={{width: '200px'}} src={logo2} alt='logo'/>
            <span className="mt3 f4"></span>
        </div>
    )
}

export default Logo;