import React from 'react';
import classnames from 'classnames';

import styles from './NavButton.module.css';


const NavButton = (props) => {
    let classNames = classnames(styles.NavButton_Icon, { [styles.active]: props.menuOpen })
    return (
        <div className={classNames}
            onClick={props.clickHandler}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
        </div>
    );
}

export default NavButton;