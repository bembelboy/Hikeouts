import React from 'react';

import Modal from '../UI/Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';

//CSS
import styles from './PostImage.module.css';
import IconList from './IconList';


const PostImage = (props) => {

    return (
        <div className={styles.PostImage_Container} src={props.postImage} >
            <img className={styles.PostImage_Image} alt='Userpost' src={props.postImage} onClick={props.openModal} />
            <Modal modalShow={props.modalState} closeModal={props.closeModal} >
                <div className={styles.PostImage_ModalImage_Container} onClick={props.closeModal} >
                    <img className={styles.PostImage_ModalImage} alt='ModalImage' src={props.postImage} onClick={props.closeModal} />
                </div>
                <Backdrop clicked={props.closeModal} show={props.modalState} background />
            </Modal>
            <IconList 
                like={props.like} liked={props.liked} likeHandler={props.likeHandler} likeCount={props.likeCount}
                follow={props.follow} followed={props.followed} followerHandler={props.followerHandler}
                user={props.user}
                bookmarked={props.bookmarked} favHandler={props.favHandler}
                postId={props.postId} creatorId={props.creatorId}
            />
        </div>
    );
}

export default PostImage;