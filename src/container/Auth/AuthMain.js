import React, { useState, useEffect, useCallback } from 'react';

import AuthHeader from './AuthHeader/AuthHeader';
import SignupForm from './AuthForm/SignUpForm';
import LoginForm from './AuthForm/LoginForm';
//CSS
import styles from './AuthMain.module.css';
//ICONS
import { RiCloseLine } from 'react-icons/ri';



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
            authObject = {...switchAuth,
                signup: false,
                login: true,
                link: '/home/signup',
                buttonLabel: 'Welcome back'
            }
        } else {
            authObject = {
                ...switchAuth,
                signup: true,
                login: false,
                link: '/home/login',
                buttonLabel: 'Be part of the crew'

            }
        }
        setSwitchAuth(authObject);
    },[switchAuth])

    return (
            <div className={styles.AuthPage_AuthFormContainer}>
             <RiCloseLine onClick={props.closeModal} className={styles.AuthMain_ClosedButton} />
                <AuthHeader status={switchAuth} link={switchAuth.link} clicked={switchAuthHandler}/>
                {switchAuth.signup ?
                    <SignupForm selected={switchAuth.signup} buttonLabel={switchAuth.buttonLabel}/> :
                    <LoginForm selected={switchAuth.login}  buttonLabel={switchAuth.buttonLabel}/>
                }
            </div>
        
    );
}

export default AuthPage;