import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostList.module.css';

import Post from '../../../shared/Post/PostMain';
import { firebasePost } from '../../../context/provider/PostProvider';
import { firebaseUser } from '../../../context/provider/UserInfoProvider';


const PostList = (props) => {
    const { userPosts } = useContext(firebasePost)
    const { user } = useContext(firebaseUser)

    let PostListComponent = (
        <ul className={styles.PostList_List} >
            {
                userPosts.map(post => {
                    return (
                        <Post key={post.postId}
                            userImage={user.profileImageURL} username={user.name} userId={user.id}
                            postImage={post.imgUrl}
                            headline={post.text.title} paragraph={post.text.description}
                            timeMark={post.timeMark.seconds}
                        // location='Not there yet'
                        />
                    )
                })
            }
        </ul>
    )

    if (userPosts.length === 0) {
        PostListComponent = (
            <div className={styles.PostList_NoPostContainer} >
                <h3 className={styles.PostList_Heading}>Seems like you didnt created a Post yet</h3>
                <Link to='/createPost'  className={styles.PostList_Link}>Share your first Post here</Link>
            </div>
        )
    }



    return (
        PostListComponent
    );
}

export default PostList;