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
    const [timeRange, dispatchTimeRange] = useReducer(timeRangeReducer, initialTimeRangeState) // the initialState is currentTime
    const [orderByVal, setOrderByVal] = useState('timeMarkInMilliseconds')

    //States for Posting an Image
    const [postId, setPostId] = useState('')
    const [postImage, setPostImage] = useState([])
    const [postImageUrl, setPostImageUrl] = useState('')
    const [postInputs, setPostInputs] = useState({
        Title: '',
        Description: '',
    })
    const [submittedPost, setSubmittedPost] = useState(false)


    const pushPostHandler = (profileImageURL, username) => {
        postMethods.pushPostData(postInputs, postId, profileImageURL, username, setLoading, setSubmittedPost)
        postMethods.uploadPostImage(postImage, postId, setPostImageUrl)
    }

    const getPostsHandler = () => { // gets 3 posts at a time 
        setReversed(false)
        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0; // is needed to set the range dependent on which filter is active
        postMethods.getPosts(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
    }
    const getPostsReversedHandler = () => {
        setReversed(true)
        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0;
        postMethods.getPostsReversed(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
    }

    const getPostsAfterTimeHandler = () => {
        setOrderByVal('timeMarkInMilliseconds')
        if (reversed) {
            let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0;
            postMethods.getPostsReversed(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
        } else if(!reversed){
            let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0; // is needed to set the range dependent on which filter is active
            postMethods.getPosts(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
        }
    }

    const getPostsAfterLikesHandler = () => {
        setOrderByVal('likeCount')
        setReversed(false)
        if (reversed) {
            let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0;
            postMethods.getPostsReversed(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
        } else if(!reversed){
            let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0; // is needed to set the range dependent on which filter is active
            postMethods.getPosts(setAllPosts, setLoading, setLastVisible, setFirstVisble, setfirstPostQueryId, setLastPostQueryId, range, orderByVal)
        }
    }

    const getUserPostHandler = () => { // gets All Posts from one User
        postMethods.getUserPosts(setUserPosts, setLoading)
    }

    const nextPageHandler = () => {
        if (reversed) {
            postMethods.getNextPageReversed(setAllPosts, setLoading, setLastVisible, setFirstVisble, lastVisible, timeRange, orderByVal)
        } else {
            postMethods.getNextPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, lastVisible, timeRange, orderByVal)
        }
    }

    const prevPageHandler = () => {
        if (reversed) {
            postMethods.getPreviousPageReversed(setAllPosts, setLoading, setLastVisible, setFirstVisble, firstVisible, timeRange, orderByVal)
        } else {
            postMethods.getPreviousPage(setAllPosts, setLoading, setLastVisible, setFirstVisble, firstVisible, timeRange, orderByVal)
        }

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
                firstVisible, lastVisible, firstPostQueryId, lastPostQueryId,
                favoritePosts, getFavoritePosts, setFavoritePosts,
                editLikes,
                reversed, getPostsReversedHandler,
                timeRange, dispatchTimeRange,
                orderByVal, setOrderByVal,
                submittedPost, setSubmittedPost,
                getPostsAfterTimeHandler, getPostsAfterLikesHandler,
            }}>
            {props.children}
        </firebasePost.Provider>
    );
};

export const firebasePost = React.createContext()

export default PostProvider;