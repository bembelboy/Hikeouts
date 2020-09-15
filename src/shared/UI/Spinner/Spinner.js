import React from 'react';


import styles from './Spinner.module.css';



const Spinner = (props) => {
    let loader = <div className={styles.loader}>Loading...</div>
    if(props.white) {
        loader = <div className={styles.loader_white}>Loading...</div>
    }
    return (
        loader
     );
}
 
export default Spinner;