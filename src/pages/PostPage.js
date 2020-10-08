import React, { useContext, useEffect } from 'react';
import { uuid } from 'uuidv4';
import PostInputs from '../container/AddPost/PostInputs';
import { firebasePost } from '../context/provider/PostProvider';
import { firebaseUser } from '../context/provider/UserInfoProvider';
import Spinner from '../shared/UI/Spinner/Spinner';

const PostPage = (props) => {
    const {
        postImage, setPostImage,
        postInputs, setPostInputs,
        setPostId,
        pushPostHandler
    } = useContext(firebasePost)

    const { getUser, user, } = useContext(firebaseUser)

    useEffect(() => {
        let newPostId = uuid().toString()
        console.log(newPostId)
        setPostId(newPostId)
        getUser()
    }, [])


    const postPageInputHandler = (event) => {
        event.preventDefault()
        const { id, value } = event.target;
        setPostInputs(prev => ({ ...prev, [id]: value }))
    }

    const submitPostHandler = (event) => {
        event.preventDefault()
        pushPostHandler()
    }



    let PostP = (
        <Spinner />
    )

    if (user) {
        PostP = (
            <div>
                <h1>This is the PostPage</h1>
                <h2>{user.name}</h2>
                <img src={user.profileImageUrl} alt='ProfileImage' />
                <PostInputs
                    postImage={postImage}
                    setPostImage={setPostImage}
                    postInputs={postInputs}
                    inputHandler={postPageInputHandler}
                    submitPostHandler={submitPostHandler}
                />
            </div>
        )
    }
    return (
        PostP
    );
}

export default PostPage;