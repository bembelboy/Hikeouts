import React, { useState } from 'react';

import { postMethods } from '../methods/firebasePostMethods';

const AuthProvider = (props) => {

    const [loading, setLoading] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])

    //States for Posting an Image
    const [postId, setPostId] = useState('')
    const [postImage, setPostImage] = useState([])
    const [postImageUrl, setPostImageUrl] = useState('')
    const [postInputs, setPostInputs] = useState({
        Title: '',
        Description: '',
    })



    const pushPostHandler = () => {
        postMethods.pushPostData(postInputs, postId, setLoading)
        postMethods.uploadPostImage(postImage, postId, setPostImageUrl)
    }

    const getPostsHandler = () => {
        postMethods.getPosts(setAllPosts, setLoading)
    }

    const getUserPostHandler = () => {
        postMethods.getUserPosts(setUserPosts, setLoading)
    }


    return (
        <firebasePost.Provider
            value={{
                postImage, setPostImage,
                postInputs, setPostInputs,
                postId, setPostId,
                pushPostHandler,
                postImageUrl,
                allPosts, getPostsHandler,
                userPosts, getUserPostHandler,
                loading,

            }}>
            {props.children}
        </firebasePost.Provider>
    );
};

export const firebasePost = React.createContext()

export default AuthProvider;