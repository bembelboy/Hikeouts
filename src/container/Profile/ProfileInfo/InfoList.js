import React from 'react';

import InfoField from './InfoField';
import Spinner from '../../../shared/UI/Spinner/Spinner';

import styles from './InfoList.module.css';

const InfoList = (props) => {

    let UserInfoList = <Spinner />

    if(props.info) {
        UserInfoList = (
            props.info.map(info => {
                return <InfoField  key={info.paragraph} heading={info.heading} paragraph={info.paragraph} />
            })
        )
    }

    return ( 
        <ul className={styles.UserInfoList}>
          {UserInfoList}
        </ul>
     );
}
 
export default InfoList;