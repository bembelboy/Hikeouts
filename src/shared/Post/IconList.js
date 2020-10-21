import React from 'react';

//ICONS
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiUserAddLine, RiUserLine, RiBookmarkLine } from 'react-icons/ri'


//CSS
import styles from './IconList.module.css';

const IconList = (props) => {
    return ( 
        <div className={styles.IconList_Container}>
        <ul className={styles.IconList_List} >
            <li className={styles.IconList_ListItem} onClick={props.likeHandler} >
                {props.like ?
                    <FcLike className={styles.IconList_Icon} />
                    :
                    <FcLikePlaceholder className={styles.IconList_Icon} />
                }
                <span className={styles.IconList_Span}>Like</span>
            </li>
            <li className={styles.IconList_ListItem} onClick={props.userHandler}>
                {props.user ?
                    <>
                        <RiUserLine className={styles.IconList_Icon} />
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