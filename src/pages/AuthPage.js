import React, { useState, useEffect, useCallback } from 'react';

import AuthHeader from '../container/Auth/AuthHeader/AuthHeader';
import SignupForm from '../container/Auth/AuthForm/SignUpForm';
import LoginForm from '../container/Auth/AuthForm/LoginForm';
import Modal from '../shared/UI/Modal/Modal';

import styles from './AuthPage.module.css';



const AuthPage = (props) => {

    const [switchAuth, setSwitchAuth] = useState({
        signup: true,
        login: false,
        link: 'auth/login',
        buttonLabel: 'Be part of the crew'
    });


    useEffect(() => {
        setSwitchAuth({
            signup: true,
            login: false,
            link: 'login',
            buttonLabel: 'Be part of the crew'
        })
    }, [])


    const switchAuthHandler = useCallback(() => {
        let authObject = {};
        if (switchAuth.signup) {
            authObject = {...authObject,
                signup: false,
                login: true,
                link: '/auth/signup',
                buttonLabel: 'Welcome back'
            }
        } else {
            authObject = {
                ...authObject,
                signup: true,
                login: false,
                link: '/auth/login',
                buttonLabel: 'Be part of the crew'

            }
        }
        setSwitchAuth(authObject);
    })

    return (
        <Modal>
            <div className={styles.AuthFormContainer}>
                <AuthHeader status={switchAuth} clicked={switchAuthHandler}/>
                {switchAuth.signup ?
                    <SignupForm selected={switchAuth.signup} buttonLabel={switchAuth.buttonLabel}/> :
                    <LoginForm selected={switchAuth.login}  buttonLabel={switchAuth.buttonLabel}/>
                }
            </div>
        </Modal>
        
    );
}

export default AuthPage;