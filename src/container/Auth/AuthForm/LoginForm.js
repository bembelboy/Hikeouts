import React from 'react';

import styles from './AuthForm.module.css';
import styles2 from './LoginForm.module.css';
import styles3 from '../../../shared/UI/Buttons/AuthButton.module.css';

import AuthSubmitButton from './AuthSubmitButton';

const LoginForm = (props) => {
    return (
        <form className={styles.formContainer}>
            <div className={styles.form_Box}>
                <label htmlFor='email' className={styles.form_Label}>
                    Email:
                </label>
                <input id='email' type='email' placeholder='email'  className={styles.form_Input} />
            </div>
            <div className={styles.form_Box}>
                <label htmlFor='password' className={styles.form_Label}
                >Password:
                </label>
                <input id='password' type='password' placeholder='password' className={styles.form_Input} />
                <AuthSubmitButton selected={props.selected} />
            </div>
        </form>
    );
}

export default LoginForm;