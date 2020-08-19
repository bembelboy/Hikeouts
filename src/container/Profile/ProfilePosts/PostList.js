import React from 'react';

import Post from '../../../shared/Post/Post';

const PostList = (props) => {
    let PostListArray = props.PostArray.map( post => {
        return <Post 
        userImage={post.userInfo.userImage} userName={post.userInfo.userName} userId={props.userInfo.userId}
        postImage={post.postInfo.postImage} headline={post.postInfo.headline}
         paragraph={post.postInfo.paragraph} timeMark={post.postInfo.timeMark}
        location={post.postInfo.location}
        />
    })
    return ( 
        <ul>
            {PostListArray}
        </ul>
     );
}
 
export default PostList;