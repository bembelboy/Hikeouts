import React, { useState } from 'react';

export const AuthContext = React.createContext({
    auth: {
        loggedIn: false,
        id: 1234,
        myPosts: [],
        posts: [],
    }
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthContext);

    const loginHandler =  () => {
        console.log(isAuthenticated);
        setIsAuthenticated({
            ...isAuthenticated,
            loggedIn: true
        });
    }

    return (
        <AuthContext.Provider value={{isAuth: isAuthenticated, login: loginHandler }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;