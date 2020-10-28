import React from 'react';

import styles from './ContactBody.module.css';

const ContactBody = (props) => {
    return (
        <div className={styles.ContactBody_Container}>
            <div className={styles.ContactBody_Textbox}>
                <h2 className={styles.ContactBody_Heading} > Welcome to my first Coding Project</h2>
                <p className={styles.ContactBody_Paragraph}>
                    This App has the purpose to share nice Locations with each other. Primarily I build this App to show how far my Programmingskills are.
                    It took me about 2 to 3 months to code this App so i hope you enjoy it. If you have any suggestions what I could improve you can write
        me <a href='https://www.linkedin.com/in/robert-vollweiter-0952691b8/' target='_blank' rel='noopener noreferrer'>here</a>.
        </p>
            </div>
            <div className={styles.ContactBody_Textbox} >
                <h2 className={styles.ContactBody_Heading} >About me:</h2>
                <p className={styles.ContactBody_Paragraph}>
                Right now I am a student for Computer Science in Germany but I am not very successful at studying. <br/>
                Over the the combination of working creativly and my degree course I started coding the frontend of WebApps.
                Right now I am looking for opportunities to get some experience on a bigger Project.
                 Or to improve my coding skills even further.

        </p>
            </div>
        </div>
    );
}

export default ContactBody;