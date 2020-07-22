import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import styles from './AuthHeadline.module.css';
import './AuthHeadline.css';

const AuthHeadline = (props) => {

    let AuthForm_H2 = (
        <SwitchTransition mode='out-in' >
            <CSSTransition key={props.selected ? 'Signup' : 'Login'}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames='fade'
            >
                <h2 className={styles.AuthForm_H2}>{props.selected ?
                'Become a SpottR' : 'Welcome Back!'}
                </h2>
            </CSSTransition>
        </SwitchTransition>
    )

    return (
        AuthForm_H2
    );
}

export default AuthHeadline;