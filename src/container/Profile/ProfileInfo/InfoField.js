import React from 'react';

const InfoField = (props) => {
    return ( 
        <div>
            <h3>{props.heading}</h3>
            <p>{props.paragraph}</p>
        </div>
     );
}
 
export default InfoField;