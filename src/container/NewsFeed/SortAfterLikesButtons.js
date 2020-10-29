import React from 'react';

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import styles from './SortAfterLikesButtons.module.css'

const SortAfterLikesButtons = (props) => {

    return ( 
        <div className={styles.NewsFeedMenu_SortButtonBox}>
        {!props.reversed ?
            <>
                <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                <span className={styles.NewsFeedMenu_UpandDownButton_Span} >{props.upAndDownButtonText.up}</span>
                <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromNewestToOldest()} />
                <span className={styles.NewsFeedMenu_UpandDownButton_Span} >{props.upAndDownButtonText.down}</span>
            </>
            :
            <>
                <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromOldestToNewest()} />
                <span className={styles.NewsFeedMenu_UpandDownButton_Span} >{props.upAndDownButtonText.up}</span>
                <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                <span className={styles.NewsFeedMenu_UpandDownButton_Span} >{props.upAndDownButtonText.down}</span>
            </>
        }
    </div>
     );
}
 
export default SortAfterLikesButtons;