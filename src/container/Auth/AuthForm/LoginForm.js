import React, { useState, useEffect, useContext } from 'react';
import { firebaseAuth } from '../../../context/provider/AuthProvider';
import { withRouter, Redirect } from 'react-router-dom';

import styles from './AuthForm.module.css';

import AuthSubmitButton from './AuthSubmitButton';
import Spinner from '../../../shared/UI/Spinner/Spinner';

const LoginForm = (props) => {
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const { handleSignin, inputs, setInputs, errors, loading, userId } = useContext(firebaseAuth)

    useEffect(() => {
        if (props.history.location.pathname === '/auth/login') {
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
        handleSignin()
        if (errors.length) {
            alert(errors)
        }
    }

    let Login = (
        <form className={styles.formContainer} onSubmit={(event) => submitFormHandler(event)}>
        <div className={styles.form_Box}>
            <label htmlFor='email' className={styles.form_Label}>
                Email:
            </label>
            <input
                name='email'
                type='email'
                placeholder='email'
                className={styles.form_Input}
                value={inputs.email}
                onChange={(event) => onChangeHandler(event)} />
        </div>
        <div className={styles.form_Box}>
            <label htmlFor='password' className={styles.form_Label}
            >Password:
            </label>
            <input
                name='password'
                type='password'
                placeholder='password'
                className={styles.form_Input}
                value={inputs.password}
                onChange={(event) => onChangeHandler(event)} />
            {loading ? 
            <Spinner white />
                :
            <AuthSubmitButton selected={showSubmitButton} buttonLabel='Welcome back!' />
            }
        </div>
    </form>
    )

    if(userId) {
        Login = <Redirect to={'/profile/' + userId} />
    }

    return (
        Login
    );
}

export default withRouter(LoginForm);