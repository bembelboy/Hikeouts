import React from 'react';
import styles from './NavList.module.css';
//COMPONENTS
import NavItem from './NavItem';



const NavList = (props) => { //Used to show the NavItems

    const NavigationList = props.NavItems.map(item => {
        return <NavItem
            name={item.name}
            key={item.id}
            auth={item.auth}
            link={item.link}
        />
    })
    return (
        <ul className={styles.NavList_MenuLinks} >
            {NavigationList}
        </ul>
    );
}

export default NavList;