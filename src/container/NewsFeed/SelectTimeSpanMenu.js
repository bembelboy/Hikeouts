import React, { useContext } from 'react';
import { firebasePost } from '../../context/provider/PostProvider';

import styles from './SelectTimeSpanMenu.module.css';

const SelectTimeSpanMenu = (props) => {
    const { timeRange, dispatchTimeRange } = useContext(firebasePost)
    return (
        <>
            {props.orderByVal === 'timeMarkInMilliseconds' ?
                <div className={styles.SelectTimeSpanMenu_Container}>
                    <button className={styles.SelectTimeSpanMenu_Button}>{timeRange.buttonText}</button>
                    <div className={styles.SelectTimeSpanMenu_ContentBox}>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'all' })} >
                            Show all Posts
                </span>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'lastYear' })} >
                            Show Posts of the last Year
                </span>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'lastMonth' })} >
                            Show Posts of the last Month
                </span>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'lastWeek' })} >
                            Show Posts of the last Week
                </span>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'lastDay' })} >
                            Show Posts of the last Day
                </span>
                        <span className={styles.SelectTimeSpanMenu_Span} onClick={() => dispatchTimeRange({ type: 'lastHour' })} >
                            Show Posts of the last Hour
                </span>
                    </div>
                </div>
                :
                <div className={styles.SelectTimeSpanMenu_Container_Empty}>

                </div>
            }
        </>
    );
}

export default SelectTimeSpanMenu;