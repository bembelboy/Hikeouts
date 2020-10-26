import React, { useContext } from 'react';
import { firebasePost } from '../../context/provider/PostProvider';

import styles from './NewsFeedMenuDropDown.module.css';

const NewsFeedMenuDropDown = (props) => {
    const { timeRange, dispatchTimeRange } = useContext(firebasePost)
    return (
        <div className={styles.NewsFeedMenuDropDown_Container}>
            <button className={styles.NewsFeedMenuDropDown_Button}>{timeRange.buttonText}</button>
            <div className={styles.NewsFeedMenuDropDown_ContentBox}>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'all' })} >
                    Show all Posts
                </span>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'lastYear' })} >
                    Show Posts of the last Year
                </span>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'lastMonth' })} >
                    Show Posts of the last Month
                </span>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'lastWeek' })} >
                    Show Posts of the last Week
                </span>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'lastDay' })} >
                    Show Posts of the last Day
                </span>
                <span className={styles.NewsFeedMenuDropDown_Span} onClick={() => dispatchTimeRange({ type: 'lastHour' })} >
                    Show Posts of the last Hour
                </span>
            </div>
        </div>
    );
}

export default NewsFeedMenuDropDown;