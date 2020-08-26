import React, { useState } from 'react';

//CSS
import styles from './PostMain.module.css';
//COMPONENTS
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostTextBox from './PostTextBox';


const Post = (props) => {
    const [Like, setLike] = useState(false);
    const [User, setUser] = useState(false);

    const likeHandler = () => {
        setLike(prevState => !prevState);
    }

    const userHandler = () => {
        setUser(prevState => !prevState)
    }

    return (
        <div className={styles.postContainer} >
            <PostHeader userImage={props.userImage} username={props.username} />
            <PostImage postImage={props.postImage} likeHandler={likeHandler}
                userHandler={userHandler}
                like={Like} user={User} />
            <PostTextBox paragraph={props.paragraph} headline={props.headline} timeMark={props.timeMark} />
        </div>
    );
}

export default Post;