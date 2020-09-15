import React, { useState, useEffect, useCallback, useContext } from 'react';
import DUMMY_USER from '../DUMMY_DATA/DUMMY_USER';
import { DUMMY_POST_ARRAY } from '../DUMMY_DATA/DUMMY_POSTS';
import { firebaseAuth } from '../context/provider/AuthProvider';

import ProfileHeader from '../container/Profile/ProfileHeader';
import InfoList from '../container/Profile/ProfileInfo/InfoList';
import PostList from '../container/Profile/ProfilePosts/PostList';
import Spinner from '../shared/UI/Spinner/Spinner';

import styles from './ProfilePage.module.css';
import { Redirect } from 'react-router-dom';

const ProfilePage = (props) => {

    //STATE
    const [user, setUser] = useState();
    const [PostListState, setPostListState] = useState(false);
    const [PostArray, setPostArray] = useState();
    const [userName, setUserName] = useState()
    const [userTOKEN, setUserToken] = useState(null)
    const { token } = useContext(firebaseAuth)


    //LIFECYCLE
    useEffect(() => {
        setUser(DUMMY_USER)
        setPostArray(DUMMY_POST_ARRAY)
        setUserName('Bembelboy')
        setUserToken(token)
    },[token] )


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

    if (user && PostListState === false) {
        UserPage = (
            <>
                <div>
                    <ProfileHeader id={user.id}
                        name={userName} location={user.from}
                        profilePic={user.image} backgroundImage={user.backgroundImage}
                        showPostList={showPostList} showInfoList={showInfoList}
                    />
                </div>
                <InfoList info={user.info} />
            </>
        )
    } else if (user && PostListState === true) {
        UserPage = (
            <>
                <div>
                    <ProfileHeader id={user.id}
                        name={user.name} location={user.from}
                        profilePic={user.image} backgroundImage={user.backgroundImage}
                        showPostList={showPostList} showInfoList={showInfoList}
                    />
                <PostList PostArray={PostArray} />
                </div>
            </>
        )
    }

    if(!userTOKEN) {
       UserPage =  <Redirect to='/' /> 
    }

    return (
        UserPage
    );
}

export default ProfilePage;