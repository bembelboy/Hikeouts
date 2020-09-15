import React, { useState } from 'react';

import { authMethods } from '../../firebase/firebaseAuthMethods';

const AuthProvider = (props) => {

    const [inputs, setInputs] = useState({ email: '', password: '', username: '' });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(null);


    const handleSignup = () => {    // middle man between firebase
        // calling signup from firebase server
        return authMethods.signup(inputs.email, inputs.password, setErrors, setToken, token )
    }

    const handleSignin = () => {
        //changed to handleSingin
        console.log('handleSignin!!!!')
        // made signup signin
        authMethods.signin(inputs.email, inputs.password, setErrors, setToken)
        console.log( 'Errors:' ,errors, 'Token:', token)
      }

    return (
        <firebaseAuth.Provider
            value={{
                handleSignup,
                handleSignin,
                inputs,
                setInputs,
                errors,
                token,
            }}>
            {props.children}

        </firebaseAuth.Provider>
    );
};

export const firebaseAuth = React.createContext()

export default AuthProvider;