import React from 'react';

import styles from './PostHeader.module.css';
import edit from '../UI/Buttons/EditButton.module.css';

const PostHeader = (props) => {


    return (
        
        <div className={styles.PostHeader}>
            <img className={styles.PostHeader_Image} alt='User' src={props.userImage} />
            <label className={styles.PostHeader_Label} >{props.username}</label>
            <button className={`${styles.PostHeader_EditButton} ${edit.EditButton}`}> Edit </button>
        </div>
    );
}

export default PostHeader;