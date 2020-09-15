import React, { useState, useContext, useEffect } from 'react';
import firebase from '../../../firebase/firebaseIndex';


import styles from './AuthForm.module.css';


import AuthSubmitButton from './AuthSubmitButton';
import { firebaseAuth } from '../../../context/provider/AuthProvider';
import { withRouter } from 'react-router-dom';

const SignUpForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);



    const { handleSignup, inputs, setInputs } = useContext(firebaseAuth)

    useEffect( () => {
        if(props.history.location.pathname === '/auth/signup') {
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
            case 'username':
                setUsername(event.target.value);
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
        console.log('HANdler SUBMITTO')
    }

    return (
        <form className={styles.formContainer} onSubmit={() => console.log('SUBMITTED')}>
            <div className={styles.form_Box}>
                <label
                    htmlFor='email'
                    className={styles.form_Label}
                >
                    Email:
                </label>
                <input
                    id='email'
                    type='email'
                    placeholder='email'
                    className={styles.form_Input}
                    value={email}
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
                    type='text'
                    placeholder='Username'
                    className={styles.form_Input}
                    value={username}
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
                    id='password'
                    type='password'
                    placeholder='password'
                    className={styles.form_Input}
                    value={password}
                    onChange={(event) => onChangeHandler(event)} />
                <AuthSubmitButton
                    selected={showSubmitButton}
                    buttonLabel='Be part of the crew!'
                    sendForm={(event) => submitFormHandler(event)}
                />
            </div>
        </form>
    );
}

export default withRouter(SignUpForm);