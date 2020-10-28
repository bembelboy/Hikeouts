import React, { useContext, useMemo } from 'react';

import styles from './NewsFeedMenu.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine, RiSearchLine } from 'react-icons/ri';

import { firebasePost } from '../../context/provider/PostProvider';
import SortAfterTimeMenu from './SortAfterTimeButtons';
import SelectTimeSpanMenu from './SelectTimeSpanMenu';
import OrderBy from './OrderBy';

const NewsFeedMenu = (props) => {

    const { getPostsHandler, timeRange } = useContext(firebasePost)

    let Menu = useMemo(() => {
        return (
            <div className={styles.NewsFeedMenu_Container}>
                {props.disablePrev ?
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.prevPage} />
                }
                <SortAfterTimeMenu
                    fromOldestToNewest={props.fromOldestToNewest}
                    fromNewestToOldest={props.fromNewestToOldest}
                    reversed={props.reversed}
                />
                <div className={styles.NewsFeedMenu_SearchBox}>
                    <SelectTimeSpanMenu />
                    <OrderBy />
                    <RiSearchLine onClick={() => getPostsHandler()} className={styles.NewsFeedMenu_SearchButton} />
                </div>
                {props.disableNext ?
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.nextPage} />
                }
            </div>
        );
    }, [props.reversed, props.disableNext, props.disablePrev, timeRange, props.prevPage, props.nextPage])

    return Menu
}

export default React.memo(NewsFeedMenu);