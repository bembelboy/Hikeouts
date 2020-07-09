
import React, { useState } from 'react';
import { uuid } from 'uuidv4';

import NavList from './NavList';

const MainNavigation = (props) => {
    const [NavItems, setNavItems] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            auth: false,
            link: '/auth',
        },
        {
            name: 'Profile',
            id: uuid(),
            auth: true,
            link: '/profile/:cid',
        },
        {
            name: 'My Posts',
            id: uuid(),
            auth: true,
            link: '/myPosts',
        },
        {
            name: 'Fellows',
            id: uuid(),
            auth: true,
            link: '/myFellows',

        },
        {
            name: 'Logout',
            id: uuid(),
            auth: true,
            link: '/myFellows',

        },
    ]);
    return ( 
        <nav>
        <NavList NavItems={NavItems} />
        </nav>
     );
}
 
export default MainNavigation;