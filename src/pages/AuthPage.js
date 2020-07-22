import React, { useState, useEffect, useCallback } from 'react';

import AuthHeader from '../container/AuthHeader/AuthHeader';

import styles from './AuthPage.module.css';



const AuthPage = (props) => {

    const [switchAuth, setSwitchAuth] = useState({
        signup: true,
        login: false,
        link: 'auth/login'
    });

    const switchAuthHandler = useCallback(() => {
        let authObject;
        if (switchAuth.signup) {
            authObject = {
                signup: false,
                login: true,
                link: '/auth/signup'
            }
        } else {
            authObject = {
                signup: true,
                login: false,
                link: '/auth/login'
            }
        }
        setSwitchAuth(authObject);
    })

    useEffect(() => {
        setSwitchAuth({
            signup: true,
            login: false,
            link: 'auth/login'
        })
    }, [])

    return ( 
        <div className={styles.AuthFormContainer}>
            <AuthHeader status={switchAuth} clicked={switchAuthHandler} />
        </div>
     );
}
 
export default AuthPage;