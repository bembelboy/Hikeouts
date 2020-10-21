import React from 'react';
import classNames from 'classnames';

import styles from './Backdrop.module.css';

const Backdrop = (props) => {

    const backgroundClasses = classNames({
        [styles.Backdrop]: props.show,
        [styles.Backdrop_Background]: props.background
    })

    return (
            <div className={backgroundClasses} onClick={props.clicked}>
            </div>
    );
}

export default Backdrop;