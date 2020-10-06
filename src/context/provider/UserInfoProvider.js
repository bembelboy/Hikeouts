import React, { useCallback, useState } from 'react';

import { userMethods } from '../methods/firebaseUserMethods';

const UserProvider = (props) => {

    const [backgroundImage, setBackgroundImage] = useState([]);
    const [backgroundImageURL, setBackgroundImageURL] = useState({})
    const [profileImage, setProfileImage] = useState([]);
    const [profileImageURL, setProfileImageURL] = useState({});
    const [imageType] = useState(['profile', 'background'])
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userInputs, setUserInputs] = useState({
        About: '',
        Discoveries: '',
        Contact: '',
        city: '',
        quarter: '',
    });


    const getUser = () => {
        userMethods.getUserData(setUser, setLoading)
        userMethods.getImageURL(setBackgroundImageURL, setProfileImageURL ,imageType)
    }


    const getUserData = () => {
        userMethods.getUserData(setUser, setLoading)
    }
    const editUserInfo = useCallback(() => {
        userMethods.editUser(userInputs, setLoading, user)
        userMethods.uploadImage(profileImage,setProfileImageURL, imageType[0] )
        userMethods.uploadImage(backgroundImage,setBackgroundImageURL, imageType[1] )
    },[backgroundImage, imageType, profileImage, userInputs])

    return (
        <firebaseUser.Provider
            value={{
                userInputs, setUserInputs,
                editUserInfo,
                backgroundImageURL, backgroundImage, setBackgroundImage,
                profileImageURL, profileImage,setProfileImage,
                loading,
                user, setUser, getUser,
                getUserData
            }}>
            {props.children}

        </firebaseUser.Provider>
    );
};

export const firebaseUser = React.createContext()

export default UserProvider;