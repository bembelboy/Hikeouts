import React, { useMemo } from 'react';

import styles from './PostHeader.module.css';
import edit from '../UI/Buttons/EditButton.module.css';

const PostHeader = (props) => {

   const  PostHeaderRender = useMemo(() => {
        return (
        
            <div className={styles.PostHeader}>
                <img className={styles.PostHeader_Image} alt='User' src={props.userImage} />
                <label className={styles.PostHeader_Label} >{props.username}</label>
                {props.userId === props.creatorId ? 
                    <button className={`${styles.PostHeader_EditButton} ${edit.EditButton}`}> Edit </button>
                    : 
                    null
                }
                
            </div>
        );
    },[props.creatorId, props.userId, props.userImage, props.username])

    return PostHeaderRender
}

export default PostHeader;