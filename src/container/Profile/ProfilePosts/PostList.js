import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostList.module.css';

import Post from '../../../shared/Post/PostMain';
import { firebasePost } from '../../../context/provider/PostProvider';


const PostList = (props) => {
    const { userPosts } = useContext(firebasePost)

    let PostListComponent = (
        <ul className={styles.PostList_List} >
            {
                userPosts.map(post => {
                    return (
                        <Post key={post.postId}
                            creatorImage={post.profileImageURL} creatorName={post.name} creatorId={post.userId}
                            postImage={post.imgUrl}
                            headline={post.text.title} paragraph={post.text.description}
                            timeMark={post.timeMark.seconds}
                            likes={post.likes}
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