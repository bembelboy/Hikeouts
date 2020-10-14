import React from 'react';

import styles from './NewsFeedMenu.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const NewsFeedMenu = (props) => {

    return ( 
        <div className={styles.NewsFeedMenu_Container}>
        <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.prevPage} />
        <button>Sort after Date </button>
        <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.nextPage} />
        </div>
     );
}
 
export default NewsFeedMenu;