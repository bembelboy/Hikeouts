import React from 'react';


import ContactHeader from '../container/Contact/ContactHeader';
import ContactBody from '../container/Contact/ContactBody';
import ContactFooter from '../container/Contact/ContactFooter';

const ContactPage = (props) => {
    return (
        <div>
            <ContactHeader />
            <ContactBody />
            <ContactFooter />
        </div>
    );
}

export default ContactPage;