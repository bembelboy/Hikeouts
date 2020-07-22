import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthButton.module.css';

const AuthButton = (props) => {

    let ListItem = <li className={styles.ListItem} onClick={props.clicked}>
        <Link className={styles.ListItem_Link} replace
        to={location => ({...location, pathname: 'auth', hash: props.hash})}
        >
            {props.name}
        </Link>
    </li>

    if (props.selected) {
        ListItem = <li className={styles.ListItem_Active} onClick={props.clicked}>
            <Link className={styles.ListItem_Active_Link} replace
            to={location => ({...location, pathname: 'auth', hash: props.hash})}
             >
                {props.name}
            </Link>
        </li>
    }


    return (
        ListItem
    );
}

export default AuthButton;