import React from 'react';

import InfoField from './InfoField';
import Spinner from '../../../shared/UI/Spinner/Spinner';

import styles from './InfoList.module.css';

const InfoList = (props) => {

    let UserInfoList = <Spinner />

    if(!props.loading) {
        UserInfoList = (
            <ul className={styles.UserInfoList}>
            <InfoField heading='About'  paragraph={props.info.About}
            />
            <InfoField  heading='Discoveries' paragraph={props.info.Discoveries} 
            /> 
            <InfoField  heading='Contact' paragraph={props.info.Contact} 
            />
            </ul>
        )
    }


    return ( 
        UserInfoList
     );
}
 
export default InfoList;