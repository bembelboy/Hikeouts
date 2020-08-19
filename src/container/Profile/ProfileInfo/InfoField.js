import React from 'react';

import styles from './InfoField.module.css';

const InfoField = (props) => {
    return ( 
        <div className={styles.InfoField_Box}>
            <h3 className={styles.InfoField_Heading} >{props.heading}</h3>
            <hr/>
            <p className={styles.InfoField_Paragraph} >{props.paragraph}</p>
        </div>
     );
}
 
export default InfoField;