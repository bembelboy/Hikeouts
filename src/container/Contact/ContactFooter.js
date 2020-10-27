import React from 'react';

import styles from './ContactFooter.module.css';

const ContactFooter = (props) => {
    return (
        <>
            <div className={styles.ContactFooter_Container_Background} ></div>
            <ul className={styles.ContactFooter_Container_Foreground} >
                <li className={styles.ContactFooter_ListItem}>
                    <span className={styles.ContactFooter_ListItem_Span}>Email: </span>
                    thisIsNotMyRealEmailAdress@not-real.com
                </li>
                <li className={styles.ContactFooter_ListItem}>
                    <span className={styles.ContactFooter_ListItem_Span}>Adress:</span>
                    Am Flüsschen 3b, 64299 im Zauberwald
                </li>
            </ul>
        </>
    );
}

export default ContactFooter;