import React, { useState, useEffect, useCallback, useContext } from 'react';
import { DUMMY_POST_ARRAY } from '../DUMMY_DATA/DUMMY_POSTS';
import { Link, Redirect, withRouter } from 'react-router-dom';


import ProfileHeader from '../container/Profile/ProfileHeader';
import InfoList from '../container/Profile/ProfileInfo/InfoList';
import PostList from '../container/Profile/ProfilePosts/PostList';
import Spinner from '../shared/UI/Spinner/Spinner';

import styles from './ProfilePage.module.css';
import button from '../shared/UI/Buttons/EditButton.module.css';
import { firebaseUser } from '../context/provider/UserInfoProvider';

const ProfilePage = (props) => {

    //STATE
    const [PostListState, setPostListState] = useState(false);
    const [PostArray, setPostArray] = useState();
    const { getUser, loading,  user, profileImageURL, backgroundImageURL } = useContext(firebaseUser)


    //LIFECYCLE
    useEffect(() => {
        getUser()
        setPostArray(DUMMY_POST_ARRAY)
    }, [])


    //FUNCTIONS
    const showPostList = useCallback(() => {
        setPostListState(true);
    }, [])

    const showInfoList = useCallback(() => {
        setPostListState(false);
    }, [])

    //COMPONENTLOGIC
    let UserPage = (
        <div className={styles.Spinner_Box}>
            <Spinner />
        </div>
    );

    if (user && PostListState === false) { //Switch between Posts and UserInfo also makes sure that the site dont 
        UserPage = (
            <div >
                <ProfileHeader
                    id={user.id}
                    name={user.name}
                    location={user.from}
                    profilePic={profileImageURL.imgUrl}
                    backgroundImage={backgroundImageURL.imgUrl}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
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
    } else if (user && PostListState === true) {
        UserPage = (
            <div >
                <ProfileHeader
                    id={user.id}
                    name={user.name}
                    location={user.from}
                    profilePic={profileImageURL.imgUrl}
                    backgroundImage={backgroundImageURL.imgUrl}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
                />
                <PostList PostArray={PostArray} />
            </div>
        )
    }

    if (!localStorage.userId) {
        UserPage = <Redirect to='/' />
    }

    return (
        UserPage
    );
}

export default withRouter(ProfilePage);