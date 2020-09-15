import React, { useContext } from 'react';
import { firebaseAuth } from '../context/provider/AuthProvider';
import { Redirect } from 'react-router-dom';


const Home = (props) => {
    const { token } = useContext(firebaseAuth)

    let homepage = (
        <div>
        Congrats this is the Homepage
    </div>
    )

    if(!token) {
        homepage = <Redirect to='/' /> 
    }

    return (
        homepage
    );
}

export default Home;
