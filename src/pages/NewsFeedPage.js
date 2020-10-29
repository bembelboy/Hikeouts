import React, { useCallback, useContext, useEffect } from 'react';

import { firebasePost } from '../context/provider/PostProvider';
import { firebaseUser } from '../context/provider/UserInfoProvider';

import NewsFeed from '../container/NewsFeed/NewsFeed';
import NewsFeedMenu from '../container/NewsFeed/NewsFeedMenu';
import Spinner from '../shared/UI/Spinner/Spinner';

const NewsFeedPage = (props) => {
    //STATE & CONTEXT
    const {
        getPostsHandler, allPosts,
        nextPageHandler, prevPageHandler,
        firstVisible, lastVisible, firstPostQueryId, lastPostQueryId,
        getPostsReversedHandler, reversed,
        orderByVal, setOrderByVal,
    } = useContext(firebasePost)

    const { getUser } = useContext(firebaseUser)

    //SIDE EFFECTS
    useEffect(useCallback(() => {
        let mounted = true
        if (mounted) {
            getPostsHandler({ type: 'all' })
            setOrderByVal('timeMarkInMilliseconds')
            getUser()
        }
        return () => mounted = false;
    }, [getPostsHandler, getUser]), [])

    //LOGIC
    let upAndDownButtonText = {
        up: '',
        down: '',
    }
    if (orderByVal === 'timeMarkInMilliseconds') {
        upAndDownButtonText = {
            up: 'Newsest First',
            down: 'Oldest First'
        }
    } else if (orderByVal === 'likeCount') {
        upAndDownButtonText = {
            up: 'Most popular First',
            down: 'Least Popular First'
        }
    }


    //RENDER
    let NewsFeedRender = <Spinner centered />;
    if (allPosts && lastVisible && firstVisible && firstPostQueryId && lastPostQueryId) {
        NewsFeedRender = (
            <div>
                <NewsFeedMenu
                    nextPage={nextPageHandler}
                    prevPage={prevPageHandler}
                    disablePrev={firstVisible.id === firstPostQueryId}
                    disableNext={lastVisible.id === lastPostQueryId}
                    reversed={reversed}
                    fromOldestToNewest={getPostsHandler}
                    fromNewestToOldest={getPostsReversedHandler}
                    orderByVal={orderByVal}
                    upAndDownButtonText={upAndDownButtonText}
                />
                <NewsFeed allPosts={allPosts} reversed={reversed} />
            </div>
        )
    }


    return NewsFeedRender

}

export default NewsFeedPage;