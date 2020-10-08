import React, { useContext } from 'react';

import styles from './PostList.module.css';

import Post from '../../../shared/Post/PostMain';
import { firebasePost } from '../../../context/provider/PostProvider';
import { firebaseUser } from '../../../context/provider/UserInfoProvider';


const PostList = (props) => {
    const { userPosts } = useContext(firebasePost)
    const { user, profileImageURL } = useContext(firebaseUser)

    let PostListArray = userPosts.map(post => {
        return <Post key={post.postId}
            userImage={profileImageURL.imgUrl} username={user.name} userId={user.id}
            postImage={post.imgUrl}
            headline={post.text.title} paragraph={post.text.description}
              timeMark={post.timeMark.seconds}
            // location='Not there yet'
        />
    })
    return (
        <ul className={styles.PostList} >
            {PostListArray}
        </ul>
    );
}

export default PostList;