import React from 'react';

import styles from './NavButton.module.css';

const NavButton = (props) => {
    return (
        <>
            <input type='checkbox' id='openmenu' className={`${styles.NavButton_Checkbox} ${styles.NavButton_OpenMenu}`} />
            <div className={styles.NavButton_Icon} onClick={props.clickHandler}>
                <label htmlFor='openmenu' className={styles.NavButton_HamburgerLabel} >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
        </>
    );
}

export default NavButton;