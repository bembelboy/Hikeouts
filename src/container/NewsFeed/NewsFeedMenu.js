import React, { useMemo } from 'react';

import styles from './NewsFeedMenu.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const NewsFeedMenu = (props) => {

    let Menu = useMemo(() => {
        return ( 
            <div className={styles.NewsFeedMenu_Container}>
            {props.disablePrev ?
            <RiArrowLeftSLine  className={styles.NewsFeedMenu_ArrowButton_Disabled} />
            :
            <RiArrowLeftSLine  className={styles.NewsFeedMenu_ArrowButton} onClick={props.prevPage} />
            }
            <button>Sort after Date </button>
            {
                props.disableNext ?
                <RiArrowRightSLine  className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                :
                <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.nextPage} />
            }
    
    
            </div>
         );
    },[props.disableNext, props.disablePrev, props.nextPage, props.prevPage])

    return Menu
}
 
export default React.memo(NewsFeedMenu);