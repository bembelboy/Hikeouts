import React from 'react';
import ImageInput from '../Edit/ImageInputs';


const PostInputs = (props) => {

    return (
        <form onSubmit={(event) => props.submitPostHandler(event)}>
            <ImageInput
                text='Drag or Click to set your Image to Post here'
                file={props.postImage}
                setFile={props.setPostImage}
                ImageInput_Profile
            />
            <input placeholder='Title' id='Title'
                value={props.postInputs.Title}
                onChange={event => props.inputHandler(event)}
            />
            <input placeholder='Description' id='Description'
                value={props.postInputs.Description}
                onChange={event => props.inputHandler(event)}
            />
            <button>Post</button>
        </form>
    );
}

export default PostInputs;