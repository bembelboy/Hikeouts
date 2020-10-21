import React, { useState } from 'react';

import { postMethods } from '../methods/firebasePostMethods';

const PostProvider = (props) => {

    const [loading, setLoading] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])

    //States for FavoritePosts
    const [favoritePosts, setFavoritePosts] = useState([])

    //States for Pagination
    const [lastVisible, setLastVisible] = useState([])
    const [firstVisible, setFirstVisble] = useState([])
    const [firstPostQueryId, setfirstPostQueryId] = useState() //needed for disabling buttons
    const [lastPostQueryId, setLastPostQueryId] = useState() // needed for disabling buttons

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
        postMethods.getPosts(setAllPosts, setLoading, setLastVisible, setfirstPostQueryId, setLastPostQueryId)
    }

    const getUserPostHandler = () => {
        postMethods.getUserPosts(setUserPosts, setLoading)
    }

    const nextPageHandler = () => {
        postMethods.getNextPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, lastVisible, firstVisible)
    }

    const prevPageHandler = () => {
        postMethods.getPreviousPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, firstVisible)
    }

    const getFavoritePosts = (bookmarks) => {
        postMethods.getUserFavoritePost(setFavoritePosts, bookmarks)
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
                nextPageHandler, prevPageHandler,
                lastVisible, firstPostQueryId, lastPostQueryId,
                favoritePosts, getFavoritePosts, setFavoritePosts
            }}>
            {props.children}
        </firebasePost.Provider>
    );
};

export const firebasePost = React.createContext()

export default PostProvider;