import React from 'react';

//ICONS
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiUserAddLine, RiUserLine, RiBookmarkLine } from 'react-icons/ri'


//CSS
import styles from './IconList.module.css';

const IconList = (props) => {

    let realLikeCount
    if((props.liked && !props.like) || (!props.liked && !props.like)){// cases when user didnt like the Post before and the data came directly from the server
        realLikeCount = props.likeCount
    } else if(!props.liked && props.like) { // case when the user liked the post but the data from the server isnt updated
        realLikeCount = props.likeCount + 1
    }else if(props.liked && props.like) { // case when the data came from the server and the user disliked the post again
        realLikeCount = props.likeCount - 1
    }

    let realFollowState
    if((!props.followed && !props.follow) ||( props.followed && props.follow)) { //case1: user didnt follow case2: user unfollowed but page isnt reloaded yet
        realFollowState = false;
    }else {
        realFollowState = true
    }

    return (
        <div className={styles.IconList_Container}>
            <ul className={styles.IconList_List} >

                <li className={styles.IconList_ListItem} onClick={() => props.likeHandler(props.postId)} >
                    {props.like || props.liked ?
                        <>
                            <FcLike className={styles.IconList_Icon} />
                            <span className={styles.IconList_Span}>
                                {realLikeCount} {realLikeCount === 1 ? ' Like' : ' Likes'}
                            </span>
                        </>
                        :
                        <>
                            <FcLikePlaceholder className={styles.IconList_Icon} />
                            <span className={styles.IconList_Span}>
                                {realLikeCount} {realLikeCount === 1 ? ' Like' : ' Likes'} 
                            </span>
                        </>
                    }
                </li>

                <li className={styles.IconList_ListItem} onClick={() => props.followerHandler(props.creatorId)}>
                    {realFollowState ? 
                        <>
                            <RiUserLine className={styles.IconList_Icon_Green} />
                            <span className={styles.IconList_Span}>Unfollow</span>
                        </>
                        :
                        <>
                            <RiUserAddLine className={styles.IconList_Icon} />
                            <span className={styles.IconList_Span}>Follow</span>
                        </>
                    }
                </li>

                <li className={styles.IconList_ListItem} onClick={() => props.favHandler(props.postId)} >
                    {props.bookmarked ?
                        <>
                            <RiBookmarkLine className={styles.IconList_Icon_Blue} />
                            <span className={styles.IconList_Span}>Unmark</span>
                        </>
                        :
                        <>
                            <RiBookmarkLine className={styles.IconList_Icon} />
                            <span className={styles.IconList_Span}>Bookmark</span>
                        </>
                    }
                </li>

            </ul>
        </div>
    );
}

export default IconList;