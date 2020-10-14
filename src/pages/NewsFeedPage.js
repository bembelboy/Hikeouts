import React, { useContext, useEffect } from 'react';

import { firebasePost } from '../context/provider/PostProvider';

import NewsFeed from '../container/NewsFeed/NewsFeed';
import NewsFeedMenu from '../container/NewsFeed/NewsFeedMenu';
import Spinner from '../shared/UI/Spinner/Spinner';

const NewsFeedPage = (props) => {

    const { getPostsHandler, allPosts, nextPageHandler, prevPageHandler } = useContext(firebasePost)

    useEffect(() => {
        getPostsHandler()
    }, [])

    let Feed = <Spinner />;

    if (allPosts) {
        Feed = <NewsFeed 
        allPosts={allPosts}
        />
    }

    return (
        <div>
        <NewsFeedMenu 
            nextPage={nextPageHandler}
            prevPage={prevPageHandler}
        />
                {Feed}
        </div>

    );
}

export default NewsFeedPage;