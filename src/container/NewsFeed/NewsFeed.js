import React from 'react';

import Post from '../../shared/Post/PostMain';

import styles from './NewsFeed.module.css'

const NewsFeed = (props) => {


        let  Feed = props.allPosts.map(postObj => {
            return <Post
                userImage={postObj.profileImageURL}
                username={postObj.username}
                postImage={postObj.imgUrl}
                paragraph={postObj.text.description}
                headline={postObj.text.title}
                timeMark={postObj.timeMark.seconds}
            />
        })




    return ( 
        <ul className={styles.NewsFeed_Container} >
            {Feed}
        </ul>
     );
}
 
export default NewsFeed;