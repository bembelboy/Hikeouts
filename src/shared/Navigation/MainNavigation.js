
import React, { useState, useCallback, useContext, useEffect } from 'react';
import { uuid } from 'uuidv4';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

//COMPONENTS
import NavList from './NavList';
import NavButton from './NavButton';
import Backdrop from '../Backdrop/Backdrop';

//CSS
import styles from './MainNavigation.module.css';

//CONTEXT
import { firebaseAuth } from '../../context/provider/AuthProvider';

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

    const [navItems_Protected, setNavItems_Protected] = useState([
        {
            name: 'Login/SignUp',
            id: uuid(),
            link: '/auth/signup',
            active: false,
        },
        {
            name: 'Profile',
            id: uuid(),
            link: '/profile/',
            active: false,
        },
        {
            name: 'new Post',
            id: uuid(),
            link: '/createPost',
            active: false,
        },
        {
            name: 'Feed',
            id: uuid(),
            link: '/Feed',
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
    const { token, handleSignout, userId } = useContext(firebaseAuth);
    let classNames = classnames(styles.MainNavigation_MenuPane, { [styles.active]: showNavigation })

    useEffect(() => {
        const newNav = navItems_Protected.map(obj => {
            if(obj.name === 'Profile') // check if fieldName equals to cityId
               return {
                 ...obj,
                 link: '/profile/' + userId,
               }
            return obj
          });
        setNavItems_Protected(newNav);
    },[userId])

    //FUNCTIONS

    const showNavigationHandler = useCallback(() => {
        setShowNavigation(prevState => !prevState)
    }, [])

    const handleLogout = useCallback(() => {
        showNavigationHandler()
        handleSignout()
        props.history.replace('/')
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

export default withRouter(MainNavigation);