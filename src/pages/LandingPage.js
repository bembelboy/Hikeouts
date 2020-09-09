import React, { useState } from 'react';

import Header from '../container/Landing/Header/header'

const LandingPage = (props) => {
    //STATE
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showModal, setShowModal] = useState(false);
    //FUNCTIONS 

    const openModalHandler = () => {
        setShowModal(true)
        setShowLoginButton(false)
    }

    const closeModalHandler = () => {
        setShowModal(false)
        setShowLoginButton(true)
    }


    return (
        <Header openModal={openModalHandler} modalShow={showModal}
         loginButtonShow={showLoginButton} closeModal={closeModalHandler}
        />
    );
}

export default LandingPage;