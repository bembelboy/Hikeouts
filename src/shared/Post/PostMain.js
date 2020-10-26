import React, { useContext, useState, useCallback } from 'react';

//CSS
import styles from './PostMain.module.css';
//COMPONENTS
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostTextBox from './PostTextBox';
import Spinner from '../UI/Spinner/Spinner';

import { firebaseUser } from '../../context/provider/UserInfoProvider';
import { firebasePost } from '../../context/provider/PostProvider';


const Post = (props) => {
    const { editBookmarks, user, loading, editFollowers } = useContext(firebaseUser)
    const { editLikes,} = useContext(firebasePost)

    const [like, setLike] = useState(false);
    const [follow, setFollow] = useState(false);
    const [imageModal, setImageModal] = useState(false);


    const openImageModal = () => {
        setImageModal(true)
    }

    const closeImageModal = () => {
        setImageModal(false)
    }

    const favorisePostHandler = useCallback((pID) => {
        editBookmarks(pID)
    },[editBookmarks])

    const likePostHandler = useCallback((pID) => {
        editLikes(pID) 
        setLike(prev => !prev)
    },[editLikes])

    const followerHandler = useCallback((userToFollow) => {
        editFollowers(userToFollow)
        setFollow(prev => !prev)
    },[editFollowers])

    let PostRender = <Spinner centered />
    if(user && props.postId) {
        PostRender =(
                <div className={styles.postContainer} >
                    <PostHeader creatorImage={props.creatorImage} creatorName={props.creatorName} userId={user.id} creatorId={props.creatorId} />
                    <PostImage
                        postImage={props.postImage}
                        likeHandler={likePostHandler} like={like} liked={props.likes.includes(localStorage.userId)} likeCount={props.likes.length}
                        followerHandler={followerHandler} follow={follow} followed={user.followed.includes(props.creatorId)}
                        favHandler={favorisePostHandler} bookmarked={user.bookmarks.includes(props.postId)}
                        postId={props.postId} creatorId={props.creatorId}
                        modalState={imageModal} openModal={openImageModal} closeModal={closeImageModal}
                        loading={loading}
                    />
                    <PostTextBox
                        paragraph={props.paragraph}
                        headline={props.headline}
                        timeMark={props.timeMark}
                    />
                </div>
            )

    }

    return PostRender
}

export default React.memo(Post);