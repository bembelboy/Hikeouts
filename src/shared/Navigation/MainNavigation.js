
import React, { useState, useCallback, useContext } from 'react';
import { uuid } from 'uuidv4';
import classnames from 'classnames';
import { firebaseAuth } from '../../context/provider/AuthProvider';

//COMPONENTS
import NavList from './NavList';
import NavButton from './NavButton';
import Backdrop from '../Backdrop/Backdrop';
//CSS
import styles from './MainNavigation.module.css';

const MainNavigation = (props) => {
    const [navItems] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            link: '/auth/signup',
            active: false,
        },
        {
            name: 'Contact',
            id: uuid(),
            link: '/Contact',
            active: false,
        },
    ]);

    const [navItems_Protected] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            link: '/auth/signup',
            active: false,
        },
        {
            name: 'Profile',
            id: uuid(),
            link: '/profile/:cid',
            active: false,
        },
        {
            name: 'My Posts',
            id: uuid(),
            link: '/myPosts',
            active: false,
        },
        {
            name: 'Fellows',
            id: uuid(),
            link: '/myFellows',
            active: false,

        },
        {
            name: 'Contact',
            id: uuid(),
            link: '/Contact',
            active: false,
        },
    ]);

    const [showNavigation, setShowNavigation] = useState(false);
    const { token, handleSignout } = useContext(firebaseAuth);

    let classNames = classnames(styles.MainNavigation_MenuPane, { [styles.active]: showNavigation })

    //FUNCTIONS

    const showNavigationHandler = useCallback(() => {
        setShowNavigation(prevState => !prevState)
    }, [])

    const handleLogout = useCallback(() => {
        showNavigationHandler()
        handleSignout()
    },[showNavigationHandler, handleSignout])


    //RENDER

    let MainNav = (
        <div className={styles.MainNavigation_Container}>
        <NavButton clickHandler={showNavigationHandler} menuOpen={showNavigation} />
        <div className={classNames}>
            <nav className={styles.MainNavigation}>
                <NavList navItems={navItems} clicked={showNavigationHandler} />
            </nav>
        </div>
        <Backdrop show={showNavigation} clicked={showNavigationHandler} />
    </div>
    )

    if(token) {
        MainNav = (
            <div className={styles.MainNavigation_Container}>
            <NavButton clickHandler={showNavigationHandler} menuOpen={showNavigation} />
            <div className={classNames}>
                <nav className={styles.MainNavigation}>
                    <NavList navItems={navItems_Protected} clicked={showNavigationHandler} />
                    <button onClick={handleLogout} className={styles.MainNavigation_Logout}>Logout</button>
                </nav>
            </div>
            <Backdrop show={showNavigation} clicked={showNavigationHandler} />
        </div>
        )
    }
    return (
        MainNav
    );
}

export default MainNavigation;