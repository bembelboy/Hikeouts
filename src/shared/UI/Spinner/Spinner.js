import React from 'react';
import classNames from 'classnames';


import styles from './Spinner.module.css';


import Backdrop from '../../Backdrop/Backdrop';





const Spinner = (props) => {

    const spinnerClasses = classNames({
        [styles.loader]: !props.white,
        [styles.loader_white]: props.white,
    })

    const containerClasses = classNames({
            [styles.loader_centered]: props.centered
    })


    return (
        <div className={containerClasses} >
           <div className={spinnerClasses}>Loading...</div>
           <Backdrop show={props.withBackdrop} background /> 
        </div>


     );
}
 
export default Spinner;