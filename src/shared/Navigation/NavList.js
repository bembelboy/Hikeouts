import React from 'react';

import NavItem from './NavItem';

const NavList = (props) => {

    const NavigationList = props.NavItems.map(item => {
        return <NavItem
            name={item.name}
            key={item.id}
            auth={item.auth}
            link={item.link}
        />
    })
    return (
        NavigationList
    );
}

export default NavList;