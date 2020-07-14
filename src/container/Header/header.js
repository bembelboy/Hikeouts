import React from 'react';

//COMPONENTS
import NavItem from '../../shared/Navigation/NavItem';
//STYLING
import styles from './header.module.css';
import AuthLink from '../Landing/AuthLink';

const Header = (props) => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerBox}>
                <h1 className={styles.headerBox_H1}>Spott<span className={styles.headerBox_Span}>R</span> s</h1>
                <h2 className={styles.headerBox_H2}>Discover everything around you!</h2>
                <AuthLink
                    link='/auth'
                    name='Go to Login'
                />
            </div>
        </header>
    );
}

export default Header;