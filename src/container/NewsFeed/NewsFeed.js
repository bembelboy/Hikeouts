import React from 'react';

import Post from '../../shared/Post/PostMain';

import styles from './NewsFeed.module.css'

const NewsFeed = (props) => {
    let Feed
    if (props.allPosts.length !== 0) {
        Feed = props.allPosts.map(postObj => {
            return <Post
                key={postObj.postId}
                postId={postObj.postId}
                creatorId={postObj.userId}
                creatorImage={postObj.profileImageURL}
                creatorName={postObj.name}
                postImage={postObj.imgUrl}
                paragraph={postObj.text.description}
                headline={postObj.text.title}
                timeMark={postObj.timeMark.seconds}
                likes={postObj.likes}
            />
        })
    } else if (props.allPosts.length === 0) {
        Feed = (
            <div>
                <h3>Sorry there are no Posts with your Filter available Right now</h3>
            </div>
        )
    }

    if (props.reversed && props.allPosts.length !== 0) {
        Feed.reverse()
    }


    return (
        <ul className={styles.NewsFeed_Container} >
            {Feed}
        </ul>
    );
}

export default NewsFeed;