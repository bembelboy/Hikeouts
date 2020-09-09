import React from 'react';

import styles from './AuthForm.module.css';


import AuthSubmitButton from './AuthSubmitButton';

const SignUpForm = (props) => {
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
            </div>
            <div className={styles.form_Box}>
                <label htmlFor='Username' className={styles.form_Label}
                >Password:
                </label>
                <input id='Username' type='text' placeholder='Username' className={styles.form_Input} />
                <AuthSubmitButton selected={props.selected} buttonLabel={props.buttonLabel}/>
            </div>
        </form>
     );
}
 
export default SignUpForm;