import React, { useReducer, useState } from 'react';

import { initialTimeRangeState, timeRangeReducer } from '../reducer/TimeRangeReducer'
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

    //States for sorting within Pagination
    const [reversed, setReversed] = useState(false)
    const [timeRange,dispatchTimeRange] = useReducer(timeRangeReducer, initialTimeRangeState) // the initialState is currentTime

    //States for Posting an Image
    const [postId, setPostId] = useState('')
    const [postImage, setPostImage] = useState([])
    const [postImageUrl, setPostImageUrl] = useState('')
    const [postInputs, setPostInputs] = useState({
        Title: '',
        Description: '',
    })

    const getTimeRangeFromUser = (action) => {
        dispatchTimeRange(action)
        getPostsHandler()
    }


    const pushPostHandler = (profileImageURL, username) => {
        postMethods.pushPostData(postInputs, postId, profileImageURL, username, setLoading)
        postMethods.uploadPostImage(postImage, postId, setPostImageUrl)
    }

    const getPostsHandler = () => { // gets 3 posts at a time 
        postMethods.getPosts(setAllPosts, setLoading, setLastVisible, setfirstPostQueryId, setLastPostQueryId, timeRange, setReversed)
    }
    const getPostsReversedHandler = () => {
        postMethods.getPostsReversed (setAllPosts, setLoading, setLastVisible, setfirstPostQueryId, setLastPostQueryId, timeRange, setReversed)
    }

    const getUserPostHandler = () => {
        postMethods.getUserPosts(setUserPosts, setLoading)
    }

    const nextPageHandler = () => {
        console.log(timeRange)
        postMethods.getNextPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, lastVisible, timeRange)
    }

    const prevPageHandler = () => {
        postMethods.getPreviousPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, firstVisible, timeRange)
    }

    const getFavoritePosts = (bookmarks) => {
        postMethods.getUserFavoritePost(setFavoritePosts, bookmarks)
    }

    const editLikes = (postId) => {
        postMethods.editLikes(postId)
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
                favoritePosts, getFavoritePosts, setFavoritePosts,
                editLikes,
                reversed, getPostsReversedHandler,
                timeRange, getTimeRangeFromUser, dispatchTimeRange
            }}>
            {props.children}
        </firebasePost.Provider>
    );
};

export const firebasePost = React.createContext()

export default PostProvider;