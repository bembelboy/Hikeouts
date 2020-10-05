import React from 'react';
import { useContext } from 'react';

import EditForm from '../container/Edit/EditForm';
import { firebaseUser } from '../context/provider/UserInfoProvider';

import styles from './EditPage.module.css';

const EditPage = (props) => {
    const {
         setUserInputs,
          editUserInfo,
           profileImage, setProfileImage,
            backgroundImage, setBackgroundImage 
        } = useContext(firebaseUser)

    const resetImageHandler = (event) => {
        event.preventDefault()
        if (event.target.id === 'Profile') {
            setProfileImage([])
        } else if (event.target.id === 'Background') {
            setBackgroundImage([])
        }
    }

    const editFormInputHandler = (event) => {
        const { id, value } = event.target;
        setUserInputs(prev => ({ ...prev, [id]: value }))
    }

     const submitEditFormHandler = (event) => {
         event.preventDefault()
         editUserInfo()
     }

    return (
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
    );
}

export default EditPage;