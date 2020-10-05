import React, { useContext } from 'react';

import EditFormList from './EditFormList';
import ImageInput from './ImageInputs';
import Spinner from '../../shared/UI/Spinner';

import styles from './EditForm.module.css';
import { firebaseUser } from '../../context/provider/UserInfoProvider';


const EditForm = (props) => {
    const { loading } = useContext(firebaseUser)
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
                    Name goes here
                         <span className={styles.EditForm_LabelSpan}></span>
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