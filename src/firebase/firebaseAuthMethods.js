import firebaseConfig from './firebaseIndex';
import firebase from 'firebase';

export const authMethods = {

  signup: (email, password, setErrors, setToken, setLoading) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage 
         await localStorage.setItem('token', token)
        //grab token from local storage and set to state. 
        setToken(token)
        setLoading(true)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        //saving error messages here
        setErrors(prev => ([...prev, err.message]))
      })
  },

  signin: (email, password, setErrors, setToken, setLoading) => {
    //change from create users to...
    firebase.auth().signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async res => {
        const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage 
         await localStorage.setItem('token', token)
        setToken(token)
        setLoading(true)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        setErrors(prev => ([...prev, err.message]))
      })
  },

  signout: (setErrors, setToken) => {
    // signOut is a no argument function
  firebase.auth().signOut().then( res => {
    //remove the token
    localStorage.removeItem('token')
      //set the token back to original state
      setToken(null)
  })
  .catch(err => {
    //there shouldn't every be an error from firebase but just in case
    setErrors(prev => ([...prev, err.message]))
    //whether firebase does the trick or not i want my user to do there thing.
      localStorage.removeItem('token')
        setToken(null)
          console.error(err.message)
  })
  },
}
