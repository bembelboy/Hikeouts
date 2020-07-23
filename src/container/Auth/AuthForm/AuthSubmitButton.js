import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from '../../../shared/UI/Buttons/AuthButton.module.css';
import './AuthSubmitButton.css';


const AuthSubmitButton = (props) => {

    return (
        <CSSTransition
            unmountOnExit
            in={props.selected}
            timeout={{ appear: 300, enter: 300, exit: 300 }}
            classNames='roll'
            appear
        >
            <button className={styles.Auth_Button}>{props.buttonLabel}</button>
        </CSSTransition>
    );
}

export default AuthSubmitButton;