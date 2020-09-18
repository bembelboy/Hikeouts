import React, { useMemo } from 'react';

import styles from './ProfileHeader.module.css';

import { RiLandscapeLine, RiUserLine, RiInformationLine } from 'react-icons/ri'



const ProfileHeader = (props) => {

    let HeaderProfilePage = useMemo(() => {
        return (
            <div className={styles.ProfileHeader_Container}>
                <div className={styles.ProfileHeader_ImageBox}>
                    <img src={props.backgroundImage} className={styles.ProfileHeader_BackgroundImage} alt='Background' />
                    <img src={props.profilePic} className={styles.ProfileHeader_Image} id='profilepic' alt='ProfilePicture' />
                    <label className={styles.ProfileHeader_Label} htmlFor='profilepic'>
                        {props.name},
                         <span className={styles.ProfileHeader_LabelSpan}>{props.location.city} {props.location.quarter}</span>
                    </label>
                </div>
                <div className={styles.ProfileHeader_IconBox}>
                    <RiUserLine className={styles.ProfileHeader_Icon} />
                    <RiLandscapeLine className={styles.ProfileHeader_Icon} onClick={props.showPostList} />
                    <RiInformationLine className={styles.ProfileHeader_Icon} onClick={props.showInfoList} />
                </div>
            </div>
        )
    }, [props.backgroundImage, props.location.city, props.location.quarter, props.name, props.profilePic, props.showInfoList, props.showPostList])
    return (
        HeaderProfilePage
    );
}

export default React.memo(ProfileHeader);