import React, { useState, useEffect, useCallback } from 'react';

import AuthHeader from '../container/Auth/AuthHeader/AuthHeader';
import SignupForm from '../container/Auth/AuthForm/SignUpForm';
import LoginForm from '../container/Auth/AuthForm/LoginForm';

import styles from './AuthPage.module.css';



const AuthPage = (props) => {

    const [switchAuth, setSwitchAuth] = useState({
        signup: true,
        login: false,
        link: 'auth/login'
    });


    useEffect(() => {
        setSwitchAuth({
            signup: true,
            login: false,
            link: 'login'
        })
    }, [])


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

    return (
        <div className={styles.AuthFormContainer}>
            <AuthHeader status={switchAuth} clicked={switchAuthHandler} />
            {switchAuth.signup ?
                <SignupForm selected={switchAuth.signup} /> :
                <LoginForm selected={switchAuth.login} />
            }
        </div>
    );
}

export default AuthPage;