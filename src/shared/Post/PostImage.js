import React from 'react';

//ICONS
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiUserAddLine, RiUserLine, RiShareLine } from 'react-icons/ri'
//CSS
import styles from './PostImage.module.css';

const PostImage = (props) => {

    return (
        <div className={styles.PostImage_Container} src={props.postImage} >
            <img className={styles.PostImage_Image} alt='Userpost' src={props.postImage} />
            <div className={styles.PostImage_Icons}>
                <ul className={styles.PostImage_List} >
                    <li className={styles.PostImage_ListItem} onClick={props.likeHandler} >
                        {props.like ?
                            <FcLike className={styles.PostImage_Icon} />
                            :
                            <FcLikePlaceholder className={styles.PostImage_Icon} />}
                        <span className={styles.PostImage_Span}>Like</span>
                    </li>
                    <li className={styles.PostImage_ListItem} onClick={props.userHandler}>
                        {props.user ?
                            <>
                                <RiUserLine className={styles.PostImage_Icon} />
                                <span className={styles.PostImage_Span}>Unfollow</span>
                            </>
                            :
                            <>
                                <RiUserAddLine className={styles.PostImage_Icon} />
                                <span className={styles.PostImage_Span}>Follow</span>
                            </>}

                    </li>
                    <li className={styles.PostImage_ListItem} >
                        <RiShareLine className={styles.PostImage_Icon} />
                        <span className={styles.PostImage_Span}>Share</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PostImage;