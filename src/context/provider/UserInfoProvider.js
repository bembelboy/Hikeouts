import React, { useCallback, useState } from 'react';

import { userMethods } from '../methods/firebaseUserMethods';

const UserProvider = (props) => {


    const [user, setUser] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    //EditStates
    const [backgroundImage, setBackgroundImage] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [imageType] = useState(['profile', 'background'])
    const [loading, setLoading] = useState(false)
    const [userInputs, setUserInputs] = useState({
        About: '',
        Discoveries: '',
        Contact: '',
        city: '',
        quarter: '',
    });

    const getUser = useCallback( () => {
        userMethods.getUserData(setUser, setLoading)
    },[])

    const getAllUsers = () => {
        userMethods.getAllUsers(setAllUsers, setLoading)
    }

    const getUserData = () => {
        userMethods.getUserData(setUser, setLoading)
    }

    const editUserInfo = useCallback(() => {
        userMethods.editUser(userInputs, setLoading, user)
        userMethods.uploadImage(profileImage, imageType[0] )
        userMethods.uploadImage(backgroundImage, imageType[1] )
    },[backgroundImage, imageType, profileImage, user, userInputs])

    const editBookmarks = (postId ) => {
         userMethods.editBookmarks(postId, user.bookmarks, setLoading, setUser)
    }

    const editFollowers = ( userToFollow ) => {
        userMethods.editFollowers(userToFollow)
    }

    return (
        <firebaseUser.Provider
            value={{
                userInputs, setUserInputs,
                editUserInfo,
                backgroundImage, setBackgroundImage,
                profileImage,setProfileImage,
                loading,
                user, setUser, getUser,
                getUserData,
                getAllUsers,allUsers,
                editBookmarks,
                editFollowers
            }}>
            {props.children}
        </firebaseUser.Provider>
    );
};

export const firebaseUser = React.createContext()

export default UserProvider;