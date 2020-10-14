// eslint-disable-next-line no-unused-vars
import firebaseConfig from '../../firebase/firebaseIndex';
import firebase from 'firebase';
import { database } from '../../firebase/firebaseIndex';


export const authMethods = {

  signup: (email, password, username, setErrors, setToken, setLoading, setUserId) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async res => {
        const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage 
        await localStorage.setItem('token', token)
        //grab token from local storage and set to state. 
        setToken(token)
        setUserId(token.h)
        setLoading(true)
        return token
      })
      .then( async token => {
        const userId = token.h;
        await localStorage.setItem('userId', userId);
        database.collection('Nutzer').doc(userId).set({
          id: userId,
          name: username,
          image: '',
          backgroundImage: '',
          from: {
            city: '',
            quarter: ''
          },
          info: [],
        })
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        //saving error messages here
        setErrors(prev => ([...prev, err.message]))
      })
  },

  signin: (email, password, setErrors, setToken, setLoading, setUserId) => {
    //change from create users to...
    firebase.auth().signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async res => {
        const token = await Object.entries(res.user)[5][1].b
        //console.log(token)
        //set token to localStorage 
        await localStorage.setItem('token', token)
        await localStorage.setItem('userId', token.h)
        setToken(token)
        setUserId(token.h)
        setLoading(true)
      })
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        setErrors(prev => ([...prev, err.message]))
      })
  },

  signout: (setErrors, setToken, setUserId) => {
    // signOut is a no argument function
    firebase.auth().signOut().then(res => {
      //remove the token
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      //set the token back to original state
      setToken(null)
      setUserId(null)
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
