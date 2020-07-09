import React, { useContext } from 'react';

import AuthContextProvider, { AuthContext } from '../hoc/context/ThemeContext';




const AuthPage = (props) => {
    const authContext = useContext(AuthContext)
    const showValue = () => {
        console.log(authContext.isAuth._currentValue)
    }
    return ( 
        <div>
            <h2>Authorization</h2>
            <button onClick={showValue} >Login</button>
        </div>
     );
}
 
export default AuthPage;