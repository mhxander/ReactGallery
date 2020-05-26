import React from 'react';
import {NavLink} from 'react-router-dom';

//Main Topics
import mainTopics from '../mainTopics';

function Nav() {
    return(
        <nav className="main-nav">
            <ul>
                {mainTopics.map( (topic, index) => <li key={index}><NavLink to={`/${topic}`} >{topic}</NavLink></li>)}
            </ul>
        </nav>
    )
}

export default Nav;