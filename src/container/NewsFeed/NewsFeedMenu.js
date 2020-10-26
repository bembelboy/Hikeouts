import React, { useContext, useMemo } from 'react';

import styles from './NewsFeedMenu.module.css';
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowDropDownLine, RiArrowDropUpLine, RiSearchLine } from 'react-icons/ri';

import NewsFeedMenuDropDown from './NewsFeedMenuDropDown';
import { firebasePost } from '../../context/provider/PostProvider';

const NewsFeedMenu = (props) => {

    const { getPostsHandler } = useContext(firebasePost)

    let Menu = useMemo(() => {
        return (
            <div className={styles.NewsFeedMenu_Container}>
                {props.disablePrev ?
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowLeftSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.prevPage} />
                }

                <div className={styles.NewsFeedMenu_SortButtonBox}>
                    <NewsFeedMenuDropDown />
                    {props.reversed ?
                        <>
                            <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                            <span className={styles.NewsFeedMenu_UpandDownButton_Span} >From Newest to Oldest</span>
                            <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromOldestToNewest()} / >
                            <span className={styles.NewsFeedMenu_UpandDownButton_Span} >From Oldest to Newest</span>
                        </>
                        :
                        <>
                            <RiArrowDropUpLine className={styles.NewsFeedMenu_UpandDownButton} onClick={() => props.fromNewestToOldest()} />
                            <span className={styles.NewsFeedMenu_UpandDownButton_Span} >From Newest to Oldest</span>
                            <RiArrowDropDownLine className={styles.NewsFeedMenu_UpandDownButton_Disabled} />
                            <span className={styles.NewsFeedMenu_UpandDownButton_Span} >From Oldest to Newest</span>
                        </>
                    }
                    <RiSearchLine  onClick={() => getPostsHandler()} className={styles.NewsFeedMenu_SearchButton} />
                </div>
                {props.disableNext ?
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton_Disabled} />
                    :
                    <RiArrowRightSLine className={styles.NewsFeedMenu_ArrowButton} onClick={props.nextPage} />
                }
            </div>
        );
    }, [getPostsHandler, props])

    return Menu
}

export default React.memo(NewsFeedMenu);