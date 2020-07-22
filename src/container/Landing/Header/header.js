import React from 'react';

//COMPONENTS
import Backdrop from '../../../shared/Backdrop/Backdrop';
import AuthLink from '../AuthLink';
//STYLING
import styles from './header.module.css';



const Header = (props) => {

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerBox} >
                    <h1 className={styles.headerBox_H1}>Spott<span className={styles.headerBox_Span}>R</span> s</h1>
                    <h2 className={styles.headerBox_H2}>Discover everything around you!</h2>
                    <AuthLink
                        link='/auth/signup'
                        name='Go to Login'
                    />
                </div>
            </header>
            <Backdrop show />
        </>
    );
}

export default Header;