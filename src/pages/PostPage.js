import React, { useCallback, useContext, useEffect } from 'react';
import { uuid } from 'uuidv4';

import { firebasePost } from '../context/provider/PostProvider';
import { firebaseUser } from '../context/provider/UserInfoProvider';

import PostInputs from '../container/AddPost/PostInputs';
import Spinner from '../shared/UI/Spinner/Spinner';
import CreatePostHeader from '../container/AddPost/CreatePostHeader';
import Backdrop from '../shared/Backdrop/Backdrop'

import styles from './PostPage.module.css';
import { Redirect } from 'react-router-dom';

const PostPage = (props) => {
    const {
        postImage, setPostImage,
        postInputs, setPostInputs,
        setPostId,
        pushPostHandler,
        submittedPost, setSubmittedPost
    } = useContext(firebasePost)

    const { getUser, user, } = useContext(firebaseUser)

    useEffect(() => {
        let newPostId = uuid().toString()
        console.log(newPostId)
        setPostId(newPostId)
        setPostInputs({
            Title: '',
            Description: '',
        })

        setPostImage([])
        setSubmittedPost(false)
        getUser()
    }, [])


    const postPageInputHandler = useCallback((event) => {
        event.preventDefault()
        const { id, value } = event.target;
        setPostInputs(prev => ({ ...prev, [id]: value }))
    }, [setPostInputs])

    const submitPostHandler = (event) => {
        event.preventDefault()
        pushPostHandler(user.profileImageURL, user.name)
    }

    const resetImageHandler = () => {
        setPostImage([])
    }



    let PostP = (
        <Spinner  withBackdrop white centered />
    )

    if (user) {
        PostP = (
            <div className={styles.PostPage_Container}>
                <h2 className={styles.PostPage_Heading}>Create yout post here</h2>
                <div className={styles.PostPage_PostBox}>
                    <CreatePostHeader 
                    username={user.name} 
                    profileImage={user.profileImageURL}
                    resetImageHandler={resetImageHandler}
                    />
                    <PostInputs
                        postImage={postImage}
                        setPostImage={setPostImage}
                        postInputs={postInputs}
                        inputHandler={postPageInputHandler}
                        submitPostHandler={submitPostHandler}
                    />
                </div>
                <Backdrop  show background />
            </div>
        )
    }

    if(submittedPost && user) {
      PostP = <Redirect  to='/Feed' /> 
    }

    if(!localStorage.userId) {
      PostP = <Redirect to='/' />
    }
    return (
        PostP
    );
}

export default PostPage;