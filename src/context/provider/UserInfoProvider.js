import React, { useCallback, useEffect, useState } from 'react';

import { userMethods } from '../../firebase/firebaseUserMethods';

const UserProvider = (props) => {

    const [backgroundImage, setBackgroundImage] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userInputs, setUserInputs] = useState({
        About: '',
        Discoveries: '',
        Contact: '',
    });


    const getUser = () => {
        userMethods.getUser(setUser, setLoading)
       // setTimeout(() => console.log(user), 3000)
    }


    const subscribeToUser = () => {
        userMethods.subscribeUser(setUser)
    }
    const editUserInfo = useCallback(() => {
        userMethods.editUser(userInputs, profileImage, backgroundImage, setLoading)
    },[backgroundImage, profileImage, userInputs])

    return (
        <firebaseUser.Provider
            value={{
                setUserInputs,
                userInputs,
                editUserInfo,
                backgroundImage,
                setBackgroundImage,
                profileImage,
                setProfileImage,
                loading,
                getUser,
                user,
                setUser,
                subscribeToUser
            }}>
            {props.children}

        </firebaseUser.Provider>
    );
};

export const firebaseUser = React.createContext()

export default UserProvider;