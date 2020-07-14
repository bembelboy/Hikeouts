import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthLink.module.css';

const AuthLink = (props) => {
    return (
            <Link to={props.link} className={`${styles.AuthLinkBox} ${styles.AuthLinkBox_Link}`}>
                {props.name}
            </Link>

    );
}

export default AuthLink;