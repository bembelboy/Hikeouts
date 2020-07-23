import React, { useState } from 'react';

import styles from './Modal.module.css';

import { RiCloseLine } from 'react-icons/ri';

import BackDrop from '../../Backdrop/Backdrop';

const Modal = (props) => {
    const [show, setShow] = useState(true);

    const closeHandler = () => {
        setShow(false);
    }

    let Modal = (
        <>
            <div className={styles.Modal_Container}>
            <RiCloseLine onClick={closeHandler} className={styles.Modal_ClosedButton}/>
                {props.children}
            </div>
            <BackDrop show={show} clicked={closeHandler} />
        </>
    )

    if (show === false) {
        Modal = null;
    }
    return (
        Modal
    );
}

export default Modal;