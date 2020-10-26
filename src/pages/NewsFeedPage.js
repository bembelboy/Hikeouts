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
         lastVisible,firstPostQueryId, lastPostQueryId,
         getPostsReversedHandler, reversed
        } = useContext(firebasePost)

    const { getUser } = useContext(firebaseUser)

    //SIDE EFFECTS
    useEffect(useCallback(() => {
        let mounted = true
        if (mounted) {
            getPostsHandler({type: 'all'})
            getUser()
        }
        return () => mounted = false;
    }, [getPostsHandler, getUser]), [])

    //LOGIC

    const nextPHandler = () => {
        if(!reversed) {
            nextPageHandler()
        } else {
            prevPageHandler()
        }
    }

    const prevPHandler = () => {
        if(!reversed) {
            prevPageHandler()
        } else {
            nextPageHandler()
        }
    }

    //RENDER
    let NewsFeedRender = <Spinner  centered />;
    if (allPosts && lastVisible) {
         NewsFeedRender = (
         <div>
         <NewsFeedMenu 
             nextPage={nextPHandler}
             prevPage={prevPHandler}
             disablePrev={lastVisible.id === firstPostQueryId}
             disableNext={lastVisible.id === lastPostQueryId}
             reversed={reversed}
             fromOldestToNewest={getPostsHandler}
             fromNewestToOldest={getPostsReversedHandler}
         />
         <NewsFeed allPosts={allPosts}  reversed={reversed} />
         </div>
         )
    }


return NewsFeedRender

}

export default NewsFeedPage;