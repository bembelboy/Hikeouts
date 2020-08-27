import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = (props) => {
    return (
        props.show ?
            <div className={styles.Backdrop} onClick={props.clicked}>
                <label htmlFor={props.labelId} className={styles.Backdrop_Label}></label>
            </div>
            :
            <div className={styles.Backdrop_FALSE} >
                <label htmlFor={props.labelId} className={styles.Backdrop_Label}></label>
            </div>
    );
}

export default Backdrop;