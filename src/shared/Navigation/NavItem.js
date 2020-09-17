import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';





const NavItem = (props) => {
    return (
        <div className={styles.NavItem_Box} onClick={props.clicked}>
            <NavLink to={props.link} className={styles.NavItem_Link} activeClassName={styles.NavItem_LinkActive}>
                <p>{props.name}</p>
            </NavLink>
        </div>
    );
}

export default NavItem;