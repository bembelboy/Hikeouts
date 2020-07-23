import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthLink.module.css';

const AuthLink = (props) => {
    return (
            <Link className={`${styles.AuthLinkBox} ${styles.AuthLinkBox_Link}`} 
            to={props.link} onClick={props.clicked}
            >
                {props.name}
            </Link>

    );
}

export default AuthLink;