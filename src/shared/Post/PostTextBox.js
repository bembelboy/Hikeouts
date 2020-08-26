import React from 'react';

import styles from './PostTextBox.module.css';
import maps from '../UI/Buttons/GoogleMapsButton.module.css';

const PostPostTextBox = (props) => {
    return (
        <div className={styles.PostTextBox} >
            <h3 className={styles.PostTextBox_Headline}>{props.headline}</h3>
            <p className={styles.PostTextBox_Paragraph}>{props.paragraph}</p>
            <button className={`${maps.MapsButton} ${styles.PostTextBox_Button}`}>View on Google Maps</button>
            <p className={styles.PostTextBox_TimeMark}>{props.timeMark}</p>
        </div>
    );
}

export default PostPostTextBox;