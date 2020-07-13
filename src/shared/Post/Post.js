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
                <img className={styles.userBox_Image} alt='User' src='data:image/png;base64,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' />
                <label className={styles.userBox_Label} >Username</label>
                <button className={`${styles.userBox_EditButton} ${edit.EditButton}`}> Edit </button>
            </div>
            <div className={styles.imageBox} src=''>
                <img className={styles.imageBox_Image} alt='Userpost' src='data:image/png;base64,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' />
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
                <h3 className={styles.textBox_Headline}>Here comes the Headline of the Post</h3>
                <p className={styles.textBox_Paragraph}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <button className={`${maps.MapsButton} ${styles.textBox_Button}`}>View on Google Maps</button>
            </div>
        </div>
    );
}

export default Post;