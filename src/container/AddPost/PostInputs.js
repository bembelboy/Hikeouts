import React from 'react';
import ImageInput from '../Edit/ImageInputs';

import styles from './PostInputs.module.css';


const PostInputs = (props) => {

    return (
        <form onSubmit={(event) => props.submitPostHandler(event)}>
            <div className={styles.PostInput_ImageInputBox} >
                <ImageInput
                    text='Drag or Click to set your Image to Post here'
                    file={props.postImage}
                    setFile={props.setPostImage}
                    ImageInput_Post
                />
            </div>
            <div className={styles.PostInput_TextInputsBox}>
                <input placeholder='Title' id='Title'
                    value={props.postInputs.Title}
                    onChange={event => props.inputHandler(event)}
                    className={styles.PostInput_TitleInput}
                />
                <input placeholder='Description' id='Description'
                    value={props.postInputs.Description}
                    onChange={event => props.inputHandler(event)}
                    className={styles.PostInput_DescriptionInput}
                />
                <button className={styles.PostInput_SubmitButton} type='submit' >Post</button>
            </div>
        </form>
    );
}

export default PostInputs;