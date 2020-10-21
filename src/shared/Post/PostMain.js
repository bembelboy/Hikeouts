import React, { useContext, useState, useRef, useMemo, useCallback } from 'react';

//CSS
import styles from './PostMain.module.css';
//COMPONENTS
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostTextBox from './PostTextBox';
import Spinner from '../UI/Spinner/Spinner';

import { firebaseUser } from '../../context/provider/UserInfoProvider';


const Post = (props) => {
    const { editBookmarks, user, loading } = useContext(firebaseUser)

    const [Like, setLike] = useState(false);
    const [User, setUser] = useState(false);
    const [imageModal, setImageModal] = useState(false);

    const likeHandler = () => {
        setLike(prevState => !prevState);
    }

    const userHandler = () => {
        setUser(prevState => !prevState)
    }

    const openImageModal = () => {
        setImageModal(true)
    }

    const closeImageModal = () => {
        setImageModal(false)
    }

    const favorisePostHandler = useCallback((pID) => {
        editBookmarks(pID)
    },[editBookmarks])

    let PostRender = <Spinner centered />
    if(user && props.postId) {
        PostRender =(
                <div className={styles.postContainer} >
                    <PostHeader userImage={props.userImage} username={props.username} userId={user.id} creatorId={props.userId} />
                    <PostImage
                        postImage={props.postImage}
                        likeHandler={likeHandler} like={Like}
                        userHandler={userHandler} user={User}
                        favHandler={favorisePostHandler}
                        postId={props.postId}
                        modalState={imageModal} openModal={openImageModal} closeModal={closeImageModal}
                        bookmarked={user.bookmarks.includes(props.postId)}
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