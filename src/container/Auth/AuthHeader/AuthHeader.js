import React from 'react';
import { withRouter } from 'react-router-dom';


import styles from './AuthForm.module.css';

import AuthButton from './AuthButton';
import AuthHeadline from './AuthHeadline';


const AuthHeader = (props) => {


    return (
        <>
            <AuthHeadline selected={props.status.signup} />
            <ul className={styles.AuthForm_List} >
                <AuthButton name='Sign Up' selected={props.status.signup}
                    clicked={props.clicked} link={props.link}
                />
                <AuthButton name='Login' selected={props.status.login}
                    clicked={props.clicked} link={props.link}
                />
            </ul>
        </>
    );
}

export default withRouter(AuthHeader);