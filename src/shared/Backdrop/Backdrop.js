import React from 'react';
import classNames from 'classnames';

import styles from './Backdrop.module.css';

const Backdrop = (props) => {

    const backgroundClasses = classNames({
        [styles.Backdrop]: props.show,
        [styles.Backdrop_FALSE]: !props.show,
        [styles.Backdrop_Background]: props.background
    })

    return (
            <div className={backgroundClasses} onClick={props.clicked}>
                <label htmlFor={props.labelId} className={styles.Backdrop_Label}></label>
            </div>
    );
}

export default Backdrop;