import React from 'react';

import styles from './PostList.module.css';

import Post from '../../../shared/Post/PostMain';


const PostList = (props) => {
    let PostListArray = props.PostArray.map( post => {
        return <Post 
        userImage={post.userInfo.userImage} username={post.userInfo.username} userId={post.userInfo.userId}
        postImage={post.postInfo.postImage} headline={post.postInfo.headline}
         paragraph={post.postInfo.paragraph} timeMark={post.postInfo.timeMark}
        location={post.postInfo.location}
        />
    })
    return ( 
        <ul className={styles.PostList} >
            {PostListArray}
        </ul>
     );
}
 
export default PostList;