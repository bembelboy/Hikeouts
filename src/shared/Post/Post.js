import React, { useState } from 'react';

//CSS
import styles from './Post.module.css';
import edit from '../UI/Buttons/EditButton.module.css';
import maps from '../UI/Buttons/GoogleMapsButton.module.css';
//ICONS
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { RiUserAddLine, RiUserLine, RiShareLine } from 'react-icons/ri'


const Post = (props) => {
    const [Like, setLike] = useState(false);
    const [User, setUser] = useState(false);

    const likeHandler = () => {
        setLike(prevState => !prevState);
    }

    const userHandler = () => {
        setUser(prevState => !prevState)
    }

    return (
        <div className={styles.postContainer} >

            <div className={styles.userBox}>
                <img className={styles.userBox_Image} alt='User' src={props.userImage} />
                <label className={styles.userBox_Label} >{props.username}</label>
                <button className={`${styles.userBox_EditButton} ${edit.EditButton}`}> Edit </button>
            </div>

            <div className={styles.imageBox} src={props.postImage} >
                <img className={styles.imageBox_Image} alt='Userpost' src={props.postImage} />
                <div className={styles.imageBox_Icons}>
                    <ul className={styles.imageBox_List} >
                        <li className={styles.imageBox_ListItem} onClick={likeHandler} >
                            {Like ?
                                <FcLike className={styles.imageBox_Icon} />
                                :
                                <FcLikePlaceholder className={styles.imageBox_Icon} />}
                            <span className={styles.imageBox_Span}>Like</span>
                        </li>
                        <li className={styles.imageBox_ListItem} onClick={userHandler}>
                            {User ?
                                <>
                                    <RiUserLine className={styles.imageBox_Icon} />
                                    <span className={styles.imageBox_Span}>Unfollow</span>
                                </>
                                :
                                <>
                                    <RiUserAddLine className={styles.imageBox_Icon} />
                                    <span className={styles.imageBox_Span}>Follow</span>
                                </>}

                        </li>
                        <li className={styles.imageBox_ListItem} >
                            <RiShareLine className={styles.imageBox_Icon} />
                            <span className={styles.imageBox_Span}>Share</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles.textBox} >
                <h3 className={styles.textBox_Headline}>{props.headline}</h3>
                <p className={styles.textBox_Paragraph}>{props.paragraph}</p>
                <button className={`${maps.MapsButton} ${styles.textBox_Button}`}>View on Google Maps</button>
                <p className={styles.textBox_TimeMark}>{props.timeMark}</p>
            </div>
        </div>
    );
}

export default Post;