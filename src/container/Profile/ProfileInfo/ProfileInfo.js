import React from 'react';

import styles from './ProfileInfo.module.css';

import InfoField from './InfoField';

import {RiLandscapeLine, RiUserLine} from 'react-icons/ri'

const ProfileInfo = (props) => {
    const InfoFields = props.info.map(info => {
        return <InfoField heading={info.heading} paragraph={info.paragraph} />
    })
    return (
        <>
            <div className={styles.ProfileInfo_ImageBox}>
                <img src={props.backgroundImage} className={styles.ProfileInfo_BackgroundImage} />
                <img src={props.profilePic} className={styles.ProfileInfo_Image} id='profilepic' />
                <label className={styles.ProfileInfo_Label} for='profilepic'>
                    {props.name}, <span className={styles.ProfileInfo_LabelSpan}>{props.location.city} {props.location.quarter}</span>
                </label>
            <div className={styles.ProfileInfo_IconBox}>
            <RiUserLine  className={styles.ProfileInfo_Icon} />
            <RiLandscapeLine  className={styles.ProfileInfo_Icon} />
            </div>
            </div>
            <div className={styles.ProfileInfoContainer}>
                {InfoFields}
            </div>
        </>
    );
}

export default ProfileInfo;