import React, { useState, useEffect, useCallback, useContext } from 'react';
import { DUMMY_POST_ARRAY } from '../DUMMY_DATA/DUMMY_POSTS';
import { firebaseAuth } from '../context/provider/AuthProvider';
import { database } from '../firebase/firebaseIndex';
import { Link, Redirect, Route, useRouteMatch, withRouter } from 'react-router-dom';
import cloneDeep from 'lodash.clonedeep';

import ProfileHeader from '../container/Profile/ProfileHeader';
import InfoList from '../container/Profile/ProfileInfo/InfoList';
import PostList from '../container/Profile/ProfilePosts/PostList';
import Spinner from '../shared/UI/Spinner/Spinner';

import styles from './ProfilePage.module.css';
import button from '../shared/UI/Buttons/EditButton.module.css';
import EditPage from './EditPage';



const userRef = database.collection('Nutzer');

const ProfilePage = (props) => {

    //STATE
    const [user, setUser] = useState();
    const [PostListState, setPostListState] = useState(false);
    const [PostArray, setPostArray] = useState();
    const { userId } = useContext(firebaseAuth)


    //LIFECYCLE
    useEffect(() => {
        let usersObject
        userRef.get()
            .then((snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                return data
            })
            .then((data) => {
                let userArray = data.filter(userObject => userId === userObject.id);
                userArray.map(userdata => {
                    return usersObject = cloneDeep(userdata)
                })
                setUser(usersObject);
            })
        // DUMMY_DATA
        setPostArray(DUMMY_POST_ARRAY)
    }, [userId])


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
                    profilePic={user.image}
                    backgroundImage={user.backgroundImage}
                    showPostList={showPostList}
                    showInfoList={showInfoList}
                />
                UserPage = <InfoList info={user.infos} />
                <div className={styles.EditButton_Box}>
                    <Link className={button.EditButton}  to={ '/profile/'+ user.id + '/edit'} >Edit</Link>
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
                    profilePic={user.image}
                    backgroundImage={user.backgroundImage}
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
        <>
        {UserPage}
        </>
    );
}

export default withRouter(ProfilePage);