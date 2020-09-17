import React, { useState, useEffect } from 'react';

import { authMethods } from '../../firebase/firebaseAuthMethods';

const AuthProvider = (props) => {

    const [inputs, setInputs] = useState({ email: '', password: '', username: '' });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(false);
    const [ loading, setLoading] = useState(false);

    useEffect( () => { // makes sure the token is in the state if someone reloads the page
        if(!token) {
            setToken(window.localStorage.token)
        }
    },[token])


    const handleSignup = () => {    // middle man between firebase
        // calling signup from firebase server
        return authMethods.signup(inputs.email, inputs.password, setErrors, setToken, setLoading )
    }

    const handleSignin = () => {
        //changed to handleSingin
       // console.log('handleSignin!!!!')
        // made signup signin
        authMethods.signin(inputs.email, inputs.password, setErrors, setToken, setLoading)
      //  console.log( 'Errors:' ,errors, 'Token:', token, 'Loading:' , loading)
      }

      const handleSignout = () => {
        authMethods.signout(setErrors, setToken)
      }

    return (
        <firebaseAuth.Provider
            value={{
                handleSignup,
                handleSignin,
                handleSignout,
                inputs,
                setInputs,
                errors,
                token,
                loading,
            }}>
            {props.children}

        </firebaseAuth.Provider>
    );
};

export const firebaseAuth = React.createContext()

export default AuthProvider;