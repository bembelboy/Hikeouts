import React, { useCallback, useContext, useEffect } from 'react';

import { firebasePost } from '../context/provider/PostProvider';
import { firebaseUser } from '../context/provider/UserInfoProvider';

import NewsFeed from '../container/NewsFeed/NewsFeed';
import NewsFeedMenu from '../container/NewsFeed/NewsFeedMenu';
import Spinner from '../shared/UI/Spinner/Spinner';

const NewsFeedPage = (props) => {
    const {
         getPostsHandler, allPosts,
         nextPageHandler, prevPageHandler,
         lastVisible,firstPostQueryId, lastPostQueryId
        } = useContext(firebasePost)

    const { getUser } = useContext(firebaseUser)

    useEffect(useCallback(() => {
        let mounted = true
        if (mounted) {
            getPostsHandler()
            getUser()
        }
        return () => mounted = false;
    }, [getPostsHandler, getUser]), [])

    let NewsFeedRender = <Spinner  centered />;

    if (allPosts && lastVisible) {
         NewsFeedRender = (
         <div>
         <NewsFeedMenu 
             nextPage={nextPageHandler}
             prevPage={prevPageHandler}
             disablePrev={lastVisible.id === firstPostQueryId}
             disableNext={lastVisible.id === lastPostQueryId}
         />
         <NewsFeed allPosts={allPosts} />
         </div>
         )
    }


return NewsFeedRender

}

export default NewsFeedPage;