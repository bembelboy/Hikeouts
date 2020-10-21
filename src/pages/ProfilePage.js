import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';


import ProfileHeader from '../container/Profile/ProfileHeader';
import InfoList from '../container/Profile/ProfileInfo/InfoList';
import PostList from '../container/Profile/ProfilePosts/PostList';
import FavoritePostList from '../container/Profile/FavoritePostList/FavoritePostList';
import Spinner from '../shared/UI/Spinner/Spinner';

import styles from './ProfilePage.module.css';
import button from '../shared/UI/Buttons/EditButton.module.css';
import { firebaseUser } from '../context/provider/UserInfoProvider';
import { firebasePost } from '../context/provider/PostProvider';

const ProfilePage = (props) => {

    //STATE
    const [ListState, setListState] = useState('Post');
    const { getUser, loading,  user } = useContext(firebaseUser)
    const { getUserPostHandler } = useContext(firebasePost)


    //LIFECYCLE
    useEffect(() => {
        getUser()
        getUserPostHandler()
        setListState('Info')
    }, [])

    //FUNCTIONS
    const showPostList = useCallback(() => {
        setListState('Post');
    }, [])

    const showInfoList = useCallback(() => {
        setListState('Info');
    }, [])

    const showFavoriteList = useCallback(() => {
        setListState('Favorite');
    }, [])

    //COMPONENTLOGIC
    let UserPage = (
        <div className={styles.Spinner_Box}>
            <Spinner />
        </div>
    );

    if (user && ListState === 'Info') { //Switch between Posts, UserInfo and Favorite also makes sure that the site dont 
        
        UserPage = (
            <div >
                <ProfileHeader
                    id={user.id}
                    name={user.name}
                    location={user.from}
                    profilePic={user.profileImageURL}
                    backgroundImage={user.backgroundImageURL}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
                    showFavList={showFavoriteList}
                />
                <InfoList info={user.info}  loading={loading}/>
                <div className={styles.EditButton_Box}>
                    <Link 
                    className={button.EditButton}  
                    to={{
                         pathname: '/profile/'+ user.id + '/edit',
                         state: {user: user}}} 
                        >Edit
                        </Link>
                </div>
            </div>
        )
    } else if (user && ListState === 'Post') {
        UserPage = (
            <div >
                <ProfileHeader
                    id={user.id}
                    name={user.name}
                    location={user.from}
                    profilePic={user.profileImageURL}
                    backgroundImage={user.backgroundImageURL}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
                    showFavList={showFavoriteList}
                />
                <PostList />     
            </div>
        )
    } else if (user && ListState === 'Favorite') {
        UserPage = (
            <div >
                <ProfileHeader
                    id={user.id}
                    name={user.name}
                    location={user.from}
                    profilePic={user.profileImageURL}
                    backgroundImage={user.backgroundImageURL}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
                    showFavList={showFavoriteList}
                />
                <FavoritePostList bookmarks={user.bookmarks} /> 
            </div>
        )
    }

    if (!localStorage.userId) {
        UserPage = <Redirect to='/' />
    }

    return (
        <>
            {UserPage}
        </>
    );
}

export default withRouter(ProfilePage);