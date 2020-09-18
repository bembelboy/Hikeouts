import React, { useState, useEffect } from 'react';

import { authMethods } from '../../firebase/firebaseAuthMethods';

const AuthProvider = (props) => {

    const [inputs, setInputs] = useState({ email: '', password: '', username: '' });
    const [errors, setErrors] = useState([]);
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState('')
    const [ loading, setLoading] = useState(false);

    useEffect( () => { // makes sure the token  and userId is in the state if someone reloads the page
        if(!token) {
            setToken(window.localStorage.token)
        }
    },[token])

    useEffect(() => {
        if(!userId) {
            setUserId(window.localStorage.userId)
        }
    },[userId])


    const handleSignup = () => {    // middle man between firebase
        // calling signup from firebase server
        return authMethods.signup(inputs.email, inputs.password, inputs.username, setErrors, setToken, setLoading, setUserId )
    }

    const handleSignin = () => {
        //changed to handleSingin
       // console.log('handleSignin!!!!')
        // made signup signin
        authMethods.signin(inputs.email, inputs.password, setErrors, setToken, setLoading, setUserId)
      //  console.log( 'Errors:' ,errors, 'Token:', token, 'Loading:' , loading)
      }

      const handleSignout = () => {
        authMethods.signout(setErrors, setToken, setUserId)
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
                userId,
                loading,
            }}>
            {props.children}

        </firebaseAuth.Provider>
    );
};

export const firebaseAuth = React.createContext()

export default AuthProvider;