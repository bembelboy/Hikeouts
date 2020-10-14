import React from 'react';

import styles from './CreatePostHeader.module.css';
import button from '../../shared/UI/Buttons/EditButton.module.css';
import classNames from 'classnames'

const CreatePostHeader = (props) => {

     const buttonClasses = classNames([styles.CreatePostHeader_Button], [button.EditButton])

    return (
        <div className={styles.CreatePostHeader_Container}>
            <img src={props.profileImage} alt='ProfileImage'  className={styles.CreatePostHeader_ProfileImage}/>
            <label className={styles.CreatePostHeader_Label}>{props.username}</label>
            <button className={buttonClasses} onClick={props.resetImageHandler}>Reset Image</button>
        </div>

    );
}

export default CreatePostHeader;