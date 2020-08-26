
import React, { useState } from 'react';
import { uuid } from 'uuidv4';

//COMPONENTS
import NavList from './NavList';
import NavButton from './NavButton';
import Backdrop from '../Backdrop/Backdrop';
//CSS
import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
    const [NavItems, setNavItems] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            auth: false,
            link: '/auth/signup',
        },
        {
            name: 'Profile',
            id: uuid(),
            auth: false,
            link: '/profile/:cid',
        },
        {
            name: 'My Posts',
            id: uuid(),
            auth: false,
            link: '/myPosts',
        },
        {
            name: 'Fellows',
            id: uuid(),
            auth: false,
            link: '/myFellows',

        },
        {
            name: 'Logout',
            id: uuid(),
            auth: false,
            link: '/myFellows',

        },
    ]);

    const [showNavigation, setShowNavigation] = useState(false)

    const NavButtonClickHandler = () => {
        setShowNavigation(prevState => !prevState)
    }




    let NavigationPanel = (
        <div className={styles.MainNavigation_MenuPane}>
            <nav className={styles.MainNavigation}>
                <NavList NavItems={NavItems} />
            </nav>
        </div>
    );

    if(showNavigation) {
        NavigationPanel = (
            <div className={`${styles.MainNavigation_MenuPane} ${styles.MainNavigation_MenuPane_TRUE}`}>
                <nav className={styles.MainNavigation}>
                    <NavList NavItems={NavItems} />
                </nav>
            </div>
        )
    }
    return (
        <div className={styles.MainNavigation_Container}>
            <NavButton  clickHandler={NavButtonClickHandler}/>
            {NavigationPanel}
            <Backdrop show={showNavigation} clicked={NavButtonClickHandler}/>
        </div>
    );
}

export default MainNavigation;