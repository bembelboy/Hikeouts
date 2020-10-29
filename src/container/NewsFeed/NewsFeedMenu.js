import React, { useContext, useMemo } from 'react';

import styles from './NewsFeedMenu.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { firebasePost } from '../../context/provider/PostProvider';
import SortAfterTimeMenu from './SortAfterTimeButtons';
import SelectTimeSpanMenu from './SelectTimeSpanMenu';
import OrderBy from './OrderBy';
import SortAfterLikesButtons from './SortAfterLikesButtons';

const NewsFeedMenu = (props) => {

    const { timeRange } = useContext(firebasePost)

    let Menu = useMemo(() => {
        return (
            <div className={styles.NewsFeedMenu_Container}>
                {props.disablePrev ?
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.prevPage} />
                }
                {props.orderByVal === 'timeMarkInMilliseconds' ? 
                <SortAfterTimeMenu
                    fromOldestToNewest={props.fromOldestToNewest}
                    fromNewestToOldest={props.fromNewestToOldest}
                    reversed={props.reversed}
                    upAndDownButtonText={props.upAndDownButtonText}
                />
                :
                <SortAfterLikesButtons
                        fromOldestToNewest={props.fromOldestToNewest}
                        fromNewestToOldest={props.fromNewestToOldest}
                        reversed={props.reversed}
                        upAndDownButtonText={props.upAndDownButtonText}  
                />
                }
                <div className={styles.NewsFeedMenu_SearchBox}>
                    <SelectTimeSpanMenu  orderByVal={props.orderByVal} />
                    <OrderBy />
                </div>
                {props.disableNext ?
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.nextPage} />
                }
            </div>
        );
    }, [props.reversed, props.disableNext, props.disablePrev, timeRange, props.prevPage, props.nextPage, props.upAndDownButtonText])

    return Menu
}

export default React.memo(NewsFeedMenu);