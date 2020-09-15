import React, { useState, useEffect } from 'react';

import styles from './AuthForm.module.css';

import AuthSubmitButton from './AuthSubmitButton';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    useEffect( () => {
        if(props.history.location.pathname === '/auth/login') {
            setTimeout(() => {
                setShowSubmitButton(true)
            }, 500)
        } else {
            setShowSubmitButton(false)
        }
    },[props.history.location.pathname])

    const onChangeHandler = (event) => {
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            default:
                break;
        }
    }

    const submitFormHandler = (event) => {
        event.preventDefault()
    }

    return (
        <form className={styles.formContainer}>
            <div className={styles.form_Box}>
                <label htmlFor='email' className={styles.form_Label}>
                    Email:
                </label>
                <input id='email' type='email' placeholder='email' className={styles.form_Input} value={email} onChange={(event) => onChangeHandler(event)} />
            </div>
            <div className={styles.form_Box}>
                <label htmlFor='password' className={styles.form_Label}
                >Password:
                </label>
                <input id='password' type='password' placeholder='password' className={styles.form_Input} value={password} onChange={(event) => onChangeHandler(event)} />
                <AuthSubmitButton selected={showSubmitButton} buttonLabel='Welcome back!' sendForm={submitFormHandler} />
            </div>
        </form>
    );
}

export default LoginForm;