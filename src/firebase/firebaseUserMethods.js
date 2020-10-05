import firebaseConfig from './firebaseIndex';
import firebase from 'firebase';
import { database } from './firebaseIndex';
import cloneDeep from 'lodash.clonedeep';

const usersRef = database.collection("Nutzer")

export const userMethods = {

    getUser: (setUser, setLoading) => {
        setLoading(true)
        usersRef.doc(localStorage.userId).get()
            .then(async(snapshot) => {
                let userdata = await  {...snapshot.data()}
                return userdata
            })
            .then((data) => {
                  setUser(data)
                  setLoading(false)
            })
    },

    subscribeUser: (setUserData) => {
        usersRef.doc(localStorage.userId)
            .onSnapshot((doc) => {
                if (!doc.exists) {//makes sure the doc exists
                    return 
                } else {
                    setUserData(doc.data())
                }
                // console.log(doc.data())
            })
    },

    editUser: (userInputs, profileImage, backgroundImage, setLoading) => {
        setLoading(true)
        usersRef.doc(localStorage.userId)
            .set({
                info: Object.assign({}, userInputs)
            }, { merge: true })
            .then(() => [
                setLoading(false)
            ])
            .catch(error => console.log(error))
    }

}