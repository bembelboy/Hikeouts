import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

//CSS
import styles from './Modal.module.css';
//ICONS
import { RiCloseLine } from 'react-icons/ri';
//COMPONENTS

const Modal = (props) => {
    const ModalContainerClasses = classNames({
        [styles.Modal_Container]: true,
        [styles.Modal_Container_centered]: props.centered,
    })


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
            <div className={ModalContainerClasses}>
                <RiCloseLine onClick={props.closeModal} className={styles.Modal_ClosedButton} />
                {props.children}
            </div>
        </CSSTransition>
    )
}

export default Modal;