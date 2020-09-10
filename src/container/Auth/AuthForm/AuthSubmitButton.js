import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './AuthSubmitButton.module.css';


const AuthSubmitButton = (props) => {
    

    return (
        <CSSTransition
            in={props.selected}
            timeout={400}
            unmountOnExit
            appear
            classNames={{
                appear: `${styles.AuthSubmitButton_appear}`,
                enter: `${styles.AuthSubmitButton_enter}`,
                enterActive: `${styles.AuthSubmitButton_enterActive}`,
                exit: `${styles.AuthSubmitButton_exit}`,
                exitActive: `${styles.AuthSubmitButton_exitActive}`,
            }}
        >
        <button className={styles.AuthSubmitButton}>{props.buttonLabel}</button>
        </CSSTransition>
    );
}

export default AuthSubmitButton;