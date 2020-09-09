import React from 'react';
import { CSSTransition } from 'react-transition-group';
//CSS
import styles from './Modal.module.css';
//ICONS
import { RiCloseLine } from 'react-icons/ri';
//COMPONENTS

const Modal = (props) => {


    return (
        <CSSTransition
            in={props.modalShow}
            timeout={300}
            unmountOnExit
            onExited={props.closeModal}
            classNames={{
                appear: `${styles.Modal_enter}`,
                enter: `${styles.Modal_enter}`,
                enterActive: `${styles.Modal_enterActive}`,
                exit: `${styles.Modal_exit}`,
                exitActive: `${styles.Modal_exitActive}`,
            }}
        >
            <div className={styles.Modal_Container}>
                <RiCloseLine onClick={props.closeModal} className={styles.Modal_ClosedButton} />
                {props.children}
            </div>
        </CSSTransition>
    )
}

export default Modal;