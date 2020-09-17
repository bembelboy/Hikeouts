import React from 'react';
import styles from './NavList.module.css';
//COMPONENTS
import NavItem from './NavItem';



const NavList = (props) => { //Used to show the NavItems

    const NavigationList = props.navItems.map(item => {
        return <NavItem
            name={item.name}
            key={item.id}
            link={item.link}
            clicked={props.clicked}
            activeLinkHandler={props.activeLinkHandler}
        />
    })
    return (
        <ul className={styles.NavList_MenuLinks} >
            {NavigationList}
        </ul>
    );
}

export default NavList;