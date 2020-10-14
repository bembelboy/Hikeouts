import React, { useState } from 'react';

import { postMethods } from '../methods/firebasePostMethods';

const AuthProvider = (props) => {

    const [loading, setLoading] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [postQuery, setPostQuery] = useState([])

    //States for Posting an Image
    const [postId, setPostId] = useState('')
    const [postImage, setPostImage] = useState([])
    const [postImageUrl, setPostImageUrl] = useState('')
    const [postInputs, setPostInputs] = useState({
        Title: '',
        Description: '',
    })



    const pushPostHandler = (profileImageURL, username) => {
        postMethods.pushPostData(postInputs, postId, profileImageURL, username, setLoading)
        postMethods.uploadPostImage(postImage, postId, setPostImageUrl)
    }

    const getPostsHandler = () => { // gets 3 posts at a time 
        postMethods.getPosts(setAllPosts, setLoading, setPostQuery)
    }

    const getUserPostHandler = () => {
        postMethods.getUserPosts(setUserPosts, setLoading)
    }

    const nextPageHandler = () => {
        postMethods.getNextPage(setAllPosts, allPosts, setLoading,setPostQuery, postQuery)
    }

    const prevPageHandler = () => {
        postMethods.getPreviousPage(setAllPosts, allPosts, setLoading, setPostQuery, postQuery)
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
                nextPageHandler, prevPageHandler
            }}>
            {props.children}
        </firebasePost.Provider>
    );
};

export const firebasePost = React.createContext()

export default AuthProvider;