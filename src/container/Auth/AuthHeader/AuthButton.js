import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthButton.module.css';

const AuthButton = (props) => {

    let AuthButton = 
        <Link className={styles.AuthButton_Link} replace onClick={props.clicked}
        to={props.link}
        >
            {props.name}
        </Link>

    if (props.selected) {
        AuthButton = 
            <Link className={styles.AuthButton_Active_Link} replace onClick={props.clicked}
            to={props.link}
             >
                {props.name}
            </Link>
    }


    return (
        AuthButton
    );
}

export default AuthButton;