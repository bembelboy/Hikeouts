import React, { useContext } from 'react';

import EditFormList from './EditFormList';
import ImageInput from './ImageInputs';
import Spinner from '../../shared/UI/Spinner/Spinner';

import styles from './EditForm.module.css';
import { firebaseUser } from '../../context/provider/UserInfoProvider';


const EditForm = (props) => {
    const { loading, user, userInputs } = useContext(firebaseUser)
    return (
        <form className={styles.EditForm_Container} onSubmit={(event) => props.submitHandler(event)}>
            <div className={styles.EditForm_ImageBox}>
                <ImageInput
                    text='Drag or Click to set your ProfileImage'
                    file={props.profileImage}
                    setFile={props.setProfileImage}
                    ImageInput_Profile
                />
                <ImageInput
                    text='Drag or Click to set your BackgroundImage'
                    file={props.backgroundImage}
                    setFile={props.setBackgroundImage}
                    ImageInput_Background
                />
                <label className={styles.EditForm_Label} htmlFor='profilepic'>
                    {user.name},
                    <span className={styles.EditForm_LabelSpan}>
                        <input  type='text' id= 'city'
                         className={styles.EditForm_ImageBox_Input}  
                         onChange={(event) => props.editFormListHandler(event)}
                         value={userInputs.city}
                         placeholder='Enter here where'
                         /> 
                        <input  type='text' id= 'quarter'
                         className={styles.EditForm_ImageBox_Input} 
                         onChange={(event) => props.editFormListHandler(event)}
                         value={userInputs.quarter}
                         placeholder='you live '
                         />
                    </span>
                </label>
            </div>
            <div className={styles.EditForm_Descriptionbox}>
                <button
                    className={styles.EditForm_ResetButton}
                    onClick={(event => props.resetImage(event))}
                    id='Profile'
                >Reset ProfilePicture
                 </button>
                {!loading ?
                    <button className={styles.EditForm_SubmitButton} >
                        Submit Changes
                    </button>
                    :
                    <Spinner />
                }
                <button
                    className={styles.EditForm_ResetButton}
                    onClick={(event => props.resetImage(event))}
                    id='Background'
                >Reset BackgroundPicture
                </button>
            </div>
            <EditFormList
                editFormListHandler={props.editFormListHandler}
            />
        </form>
    )


}

export default React.memo(EditForm);