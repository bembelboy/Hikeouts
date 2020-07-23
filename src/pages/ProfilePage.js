import React, { useState } from 'react';

import ProfileInfo from '../container/Profile/ProfileInfo/ProfileInfo';

const ProfilePage = (props) => {
    const [user, setUser] = useState({
        id: 1,
        name: 'DerpDerp',
        image: 'https://www.sebastiangahntz.de/design/wp-content/uploads/2019/04/Sebastian_Gahntz_Geile_Sau_2011.jpg',
        backgroundImage: 'https://www.paintgallery.de/stilleben_mit_pflaumen_trauben_pfirsichen_und_haselnuessen_k010113.jpg',
        from: {
            city: 'Berlin',
            quarter: 'Neuköln'
        },
        info: [
            {
                heading: 'Likes',
                paragraph: 'Hiking, Jogging and having Fun'
            },
            {
                heading: 'What am I looking for',
                paragraph: 'For the hottest places in an Suburban area'
            }
        ],
        posts: [],
    })


    return (
        <div>
            <ProfileInfo  id={user.id}
             name={user.name} location={user.from}
             info={user.info} profilePic={user.image} backgroundImage={user.backgroundImage}
             />
        </div>
    );
}

export default ProfilePage;