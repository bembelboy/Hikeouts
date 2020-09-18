import React from 'react';
import { Link } from 'react-router-dom';


import Modal from '../../shared/UI/Modal/Modal';
import AuthMain from '../Auth/AuthMain';

//CSS
import styles from './AuthLink.module.css';

const AuthLink = (props) => {


    return (
        <>
            {props.loginButtonShow ?
                <Link className={`${styles.AuthLinkBox} ${styles.AuthLinkBox_Link}`} to='/auth/signup'
                    onClick={props.openModal}
                >
                    {props.name}
                </Link>
                :
                null
            }

            <Modal modalShow={props.modalShow} closeModal={props.closeModal}>
                <AuthMain  closeModal={props.closeModal} />
            </Modal>
        </>

    );
}

export default AuthLink;