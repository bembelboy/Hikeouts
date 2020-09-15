import React, { useState, useEffect, useCallback } from 'react';
import firebase from '../../firebase/firebaseIndex';

import AuthHeader from './AuthHeader/AuthHeader';
import SignupForm from './AuthForm/SignUpForm';
import LoginForm from './AuthForm/LoginForm';
import Spinner from '../../shared/UI/Spinner/Spinner';
//CSS
import styles from './AuthMain.module.css';
//ICONS
import { RiCloseLine } from 'react-icons/ri';
import { Route, withRouter } from 'react-router-dom';



const AuthPage = (props) => {

    const [switchAuth, setSwitchAuth] = useState({
        signup: true,
        login: false,
        link: 'auth/login',
        buttonLabel: 'Be part of the crew'
    });

    const [baseURL, setBaseURL] = useState() 


    useEffect(() => {
        setSwitchAuth({
            signup: true,
            login: false,
            link: '/auth/login',
        })
        setBaseURL(props.match.url)
    }, [props.match.url])


    const switchAuthHandler = useCallback(() => {
        let authObject = {};
        if (switchAuth.signup) {
            authObject = {
                ...switchAuth,
                signup: false,
                login: true,
                link: '/auth/signup',
            }
        } else {
            authObject = {
                ...switchAuth,
                signup: true,
                login: false,
                link: '/auth/login',
            }
        }
        setSwitchAuth(authObject);
    }, [switchAuth])

    let AuthMain = (
        <div>
            <Spinner white />
        </div>
    );

    if (true) {
        AuthMain = (
            <div className={styles.AuthPage_AuthFormContainer}>
                <RiCloseLine onClick={props.closeModal} className={styles.AuthMain_ClosedButton} />
                <AuthHeader status={switchAuth} link={switchAuth.link} clicked={switchAuthHandler} />
                <Route
                    path={ baseURL +'auth/signup' }
                    component={SignupForm}
                />
                <Route
                    path={ baseURL  +'auth/login' }
                    component={LoginForm}
                />
            </div>
        )
    }

    return (
        AuthMain
    );
}

export default withRouter(AuthPage);