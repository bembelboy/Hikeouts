import React from 'react';

import styles from './SortAfterTimeButton.module.css';

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

const SortAfterTimeMenu = (props) => {

    return (
        <div className={styles.NewsFeedMenu_SortButtonBox}>
            {props.reversed ?
                <>
                    <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                    <span className={styles.NewsFeedMenu_UpandDownButton_Span} >Newest First</span>
                    <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromOldestToNewest()} />
                    <span className={styles.NewsFeedMenu_UpandDownButton_Span} >Oldest First</span>
                </>
                :
                <>
                    <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromNewestToOldest()} />
                    <span className={styles.NewsFeedMenu_UpandDownButton_Span} >Newest First</span>
                    <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                    <span className={styles.NewsFeedMenu_UpandDownButton_Span} >Oldest First</span>
                </>
            }
        </div>
    )
}

export default SortAfterTimeMenu;