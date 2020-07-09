import React from 'react';

import MainNavigation from './../Navigation/MainNavigation';
import { Route } from 'react-router-dom';

const Header = (props) => {
    return ( 
        <header>
        <h1>Hikeouts</h1>
        <MainNavigation />
        </header>
     );
}
 
export default Header;