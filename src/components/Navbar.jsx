import React, { useEffect, useState } from 'react'
import '../css/Navbar.css';

import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
    // const [mode,setState]=useState('darkmode')
    
    // function lightMode(){
    //     document.getElementById('dot').classList.toggle('active')

    //     mode==='darkmode' ? setState('lightmode') : setState('darkmode')

    // }
    // document.body.className=mode
    
    function toggle(e) {
        document.getElementById('header').classList.toggle('active')
        document.getElementById('tog').classList.toggle('active')
    }

    function removeToggle() {
        document.getElementById('header').classList.remove('active')
        document.getElementById('tog').classList.remove('active')

    }


    return (
        <div id='body'>
            <div className='menu' onClick={toggle}><RxHamburgerMenu/></div>

            <div id='header' className="header">
                <ul>
                    <p onClick={removeToggle}><NavLink className='allLists' to="/"><p className='allLinks navHome'>Home</p></NavLink></p>
                    <p onClick={removeToggle}><NavLink className='allLists' to="/about"><p className='allLinks navAbout'>About</p></NavLink></p>
                </ul>
            </div>

        </div>
    )
}
