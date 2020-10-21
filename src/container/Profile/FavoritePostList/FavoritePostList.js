import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './FavoritePostList.module.css';

import Post from '../../../shared/Post/PostMain';
import { firebasePost } from '../../../context/provider/PostProvider';


const PostList = (props) => {
    const { favoritePosts, getFavoritePosts, setFavoritePosts } = useContext(firebasePost)

    useEffect(() => {
        setFavoritePosts([])
        getFavoritePosts(props.bookmarks)
    },[])

    let PostListComponent = (
        <ul className={styles.FavoritePostList_List} >
            {
                favoritePosts.map(post => {
                    return (
                        <Post key={post.postId} postId={props.postId}
                            userImage={post.profileImageURL} username={post.name} userId={post.userId}
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

    if (favoritePosts.length === 0 || favoritePosts[0] === '') {
        PostListComponent = (
            <div className={styles.FavoritePostList_NoPostContainer} >
                <h3 className={styles.FavoritePostList_Heading}>Seems like you didnt have any favorites yet</h3>
                <Link to='/NewsFeed'  className={styles.FavoritePostList_Link}>Discover your first Spotts</Link>
            </div>
        )
    }



    return (
        PostListComponent
    );
}

export default PostList;