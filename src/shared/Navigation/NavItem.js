import React from 'react';

import { NavLink } from 'react-router-dom';



const NavItem = (props) => {
    return (
        !props.auth &&
        <div>
            <NavLink to={props.link} >
                <p>{props.name}</p>
            </NavLink>
        </div>
    );
}

export default NavItem;