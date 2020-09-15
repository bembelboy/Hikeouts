
import React, { useState, useCallback } from 'react';
import { uuid } from 'uuidv4';
import classnames from 'classnames';

//COMPONENTS
import NavList from './NavList';
import NavButton from './NavButton';
import Backdrop from '../Backdrop/Backdrop';
//CSS
import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
    const [NavItems ] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            auth: false,
            link: '/auth/signup',
            active: false,
        },
        {
            name: 'Profile',
            id: uuid(),
            auth: false,
            link: '/profile/:cid',
            active: false,
        },
        {
            name: 'My Posts',
            id: uuid(),
            auth: false,
            link: '/myPosts',
            active: false,
        },
        {
            name: 'Fellows',
            id: uuid(),
            auth: false,
            link: '/myFellows',
            active: false,

        },
        {
            name: 'Logout',
            id: uuid(),
            auth: false,
            link: '/myFellows',
            active: false,

        },
    ]);
    const [showNavigation, setShowNavigation] = useState(false);
    let classNames = classnames(styles.MainNavigation_MenuPane, {[styles.active]: showNavigation})


    //FUNCTIONS

    const showNavigationHandler = useCallback(() => {
        setShowNavigation(prevState => !prevState)
    },[])


    //RENDER
    return (
        <div className={styles.MainNavigation_Container}>
            <NavButton clickHandler={showNavigationHandler} menuOpen={showNavigation} />
            <div className={classNames}>
                <nav className={styles.MainNavigation}>
                    <NavList NavItems={NavItems}  clicked={showNavigationHandler} />
                </nav>
            </div>
            <Backdrop show={showNavigation} clicked={showNavigationHandler} />
        </div>
    );
}

export default MainNavigation;