import React, { useEffect } from 'react';
import { useContext } from 'react';

import EditForm from '../container/Edit/EditForm';
import { firebaseUser } from '../context/provider/UserInfoProvider';
import Spinner from '../shared/UI/Spinner/Spinner';

import styles from './EditPage.module.css';

const EditPage = (props) => {

    const {
        getUserData, setUserInputs,
        editUserInfo,
        profileImage, setProfileImage,
        backgroundImage, setBackgroundImage,
        loading
    } = useContext(firebaseUser)

    useEffect(() => {
        setUserInputs({
            About: '',
            Discoveries: '',
            Contact: '',
            city: '',
            quarter: '',
        })
        getUserData()
    }, [])

    const resetImageHandler = (event) => {
        event.preventDefault()
        if (event.target.id === 'Profile') {
            setProfileImage([])
        } else if (event.target.id === 'Background') {
            setBackgroundImage([])
        }
        console.log(profileImage, backgroundImage)
    }

    const editFormInputHandler = (event) => {
        event.preventDefault()
        const { id, value } = event.target;
        setUserInputs(prev => ({ ...prev, [id]: value }))
    }

    const submitEditFormHandler = (event) => {
        event.preventDefault()
        editUserInfo()
    }

    let EditP = (
        <div className={styles.EditPage_SpinnerBox} >
            <Spinner />
        </div>
    )

    if (!loading) {
        EditP = (
            <div className={styles.EditPage_Container}>
                <EditForm
                    backgroundImage={backgroundImage}
                    setBackgroundImage={setBackgroundImage}
                    profileImage={profileImage}
                    setProfileImage={setProfileImage}
                    resetImage={resetImageHandler}
                    editFormListHandler={editFormInputHandler}
                    submitHandler={submitEditFormHandler}
                />
            </div>
        )
    }
    return (
        EditP
    );
}

export default EditPage;