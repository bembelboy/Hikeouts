import React from 'react';

import Modal from '../UI/Modal/Modal';
import Backdrop from '../Backdrop/Backdrop';

//CSS
import styles from './PostImage.module.css';
import IconList from './IconList';
import Spinner from '../UI/Spinner/Spinner';


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
                like={props.like}
                user={props.user}
                bookmarked={props.bookmarked} favHandler={props.favHandler}
                postId={props.postId}
            />
        </div>
    );
}

export default PostImage;