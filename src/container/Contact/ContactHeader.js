import React from 'react';

import myImage from '../../images/Profilbild.png'


import styles from './ContactHeader.module.css';

const ContactHeader = (props) => {
    return (
        <>
            <div className={styles.ContactHeader_Container_Background}></div>
            <div className={styles.ContactHeader_Container_Foreground}>
                <h1 className={styles.ContactHeader_Heading}>Glad you make it !</h1>
                <img className={styles.ContactHeader_MyImage} alt='myImage' src={myImage} />
            </div>
        </>
    );
}

export default ContactHeader;