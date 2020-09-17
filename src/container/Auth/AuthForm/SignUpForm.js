import React, { useState, useContext, useEffect } from 'react';

import styles from './AuthForm.module.css';

import Spinner from '../../../shared/UI/Spinner/Spinner';
import AuthSubmitButton from './AuthSubmitButton';
import { firebaseAuth } from '../../../context/provider/AuthProvider';
import { withRouter, Redirect } from 'react-router-dom';

const SignUpForm = (props) => {

    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const { handleSignup, inputs, setInputs, token, errors, loading } = useContext(firebaseAuth)

    useEffect(() => {
        if (props.history.location.pathname === '/auth/signup') {
            setTimeout(() => {
                setShowSubmitButton(true)
            }, 500)
        } else {
            setShowSubmitButton(false)
        }
    }, [props.history.location.pathname])

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    const submitFormHandler = (event) => {
        event.preventDefault()
        handleSignup();
        if(errors.length) {
            alert(errors)
        }
    }
    

    let SignUp = (
        <form className={styles.formContainer} onSubmit={(event) => submitFormHandler(event)}>
        <div className={styles.form_Box}>
            <label
                htmlFor='email'
                className={styles.form_Label}
            >
                Email:
            </label>
            <input
                id='email'
                name='email'
                placeholder='email'
                className={styles.form_Input}
                value={inputs.email}
                onChange={(event) => onChangeHandler(event)}
            />
        </div>
        <div className={styles.form_Box}>
            <label
                htmlFor='Username'
                className={styles.form_Label}
            >
                Username:
            </label>
            <input
                id='username'
                name='username'
                placeholder='Username'
                className={styles.form_Input}
                value={inputs.username}
                onChange={(event) => onChangeHandler(event)}
            />
        </div>
        <div className={styles.form_Box}>
            <label
                htmlFor='password'
                className={styles.form_Label}
            >
                Password:
            </label>
            <input
                type='password'
                id='password'
                name='password'
                placeholder='password'
                className={styles.form_Input}
                value={inputs.password}
                onChange={(event) => onChangeHandler(event)} />
            {loading ?
                <Spinner white />
                :
                <AuthSubmitButton
                    selected={showSubmitButton}
                    buttonLabel='Be part of the crew!'
                />
            }
        </div>
    </form>
    )

    if (token) {
       SignUp =  <Redirect to='/myFellows' /> 
    }
    
    return (
        SignUp
    );
}

export default withRouter(SignUpForm);