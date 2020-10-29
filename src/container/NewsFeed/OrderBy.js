import React, { useContext } from 'react';
import { firebasePost } from '../../context/provider/PostProvider';

import styles from './OrderBy.module.css';

const OrderBy = (props) => {

    const  { orderByVal, getPostsAfterTimeHandler, getPostsAfterLikesHandler } =  useContext(firebasePost)
    return (
        <div className={styles.OrderBy_Container}>
            <input
                type='radio' id='Time' checked={orderByVal ==='timeMarkInMilliseconds'}
                name='check' className={styles.OrderBy_CheckBox}
            />
            <label htmlFor='Time' className={styles.OrderBy_Label} onClick={() => getPostsAfterTimeHandler()} >Time</label>


            <input
                type='radio' id='Likes' name='check'
                className={styles.OrderBy_CheckBox}
            />
            <label htmlFor='Likes' className={styles.OrderBy_Label} onClick={() => getPostsAfterLikesHandler()}>Likes</label>
        </div>
    );
}

export default OrderBy;