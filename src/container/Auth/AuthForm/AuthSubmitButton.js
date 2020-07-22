import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import styles from '../../../shared/UI/Buttons/AuthButton.module.css';
const AuthSubmitButton = (props) => {

    return (
        <SwitchTransition>
            <CSSTransition key={props.selected ? 'Signup' : 'Login'}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                }}
                classNames='fade'
            >
                <button className={styles.Auth_Button}>
                    {props.selected ?
                        'Disover Now !' :
                        'Go to NewsFeed'
                    }
                </button>
            </CSSTransition>
        </SwitchTransition>
    );
}

export default AuthSubmitButton;