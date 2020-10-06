import React, { useContext } from 'react';

import styles from './EditFormList.module.css';

import { firebaseUser } from '../../context/provider/UserInfoProvider';

const EditFormList = (props) => {

    const { userInputs } = useContext(firebaseUser)

    return (
        <div className={styles.EditFormList_Container}>
            <div className={styles.EditForm_Box}>
                <h3 className={styles.EditForm_Box_Heading} >
                    About me
                </h3>
                <input
                    className={styles.EditForm_Box_Input}
                    placeholder='Write something nice about yourself'
                    id='About'
                    value={userInputs.About}
                    onChange={event => props.editFormListHandler(event)}
                />
            </div>
            <div className={styles.EditForm_Box}>
                <h3 className={styles.EditForm_Box_Heading} >
                    My favorite Spots
                </h3>
                <input
                    className={styles.EditForm_Box_Input}
                    placeholder='Tell us about your best Discoveries'
                    id='Discoveries'
                    value={userInputs.Discoveries}
                    onChange={event => props.editFormListHandler(event)}
                />
            </div>
            <div className={styles.EditForm_Box}>
                <h3 className={styles.EditForm_Box_Heading}>
                    Contact
                </h3>
                <input
                    className={styles.EditForm_Box_Input}
                    placeholder='How should people reach you to plan their next adventure with you ? '
                    id='Contact'
                    value={userInputs.Contact}
                    onChange={event => props.editFormListHandler(event)}
                />
            </div>
        </div>

    );
}

export default EditFormList;