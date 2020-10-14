import firebaseConfig from '../../firebase/firebaseIndex';
import { database, storage } from '../../firebase/firebaseIndex';

const usersRef = database.collection("Nutzer")

export const userMethods = {

    getUserData: (setUser, setLoading) => {
        setLoading(true)
        if(!localStorage.userId) {
            return
        } else {
            usersRef.doc(localStorage.userId).get()
            .then(async (snapshot) => {
                let userdata = await { ...snapshot.data() }
                return userdata
            })
            .then((data) => {
                setUser(data)
                setLoading(false)
            })
        }
    },

    getAllUsers: (setAllUsers, setLoading) => {
        setLoading(true)
        usersRef.get()
        .then((snapShot) => {
            const allUserData = snapShot.docs.map(doc => doc.data())
            setAllUsers(allUserData)
        })
        .then(() => {
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

    editUser: (userInputs, setLoading, user) => {
        setLoading(true)
        usersRef.doc(localStorage.userId)
            .set({
                from: Object.assign({},
                    {
                        city: userInputs.city.length === 0 ? user.from.city : userInputs.city,
                        quarter: userInputs.quarter.length === 0 ? user.from.quarter : userInputs.quarter
                    }
                ),
                info: Object.assign({},
                    {
                        About: userInputs.About.length === 0 ? user.info.About : userInputs.About,
                        Discoveries: userInputs.Discoveries.length === 0 ? user.info.Discoveries : userInputs.Discoveries,
                        Contact: userInputs.Contact.length === 0 ? user.info.Contact : userInputs.Contact,
                    }
                )
            }, { merge: true })
            .then(() => [
                setLoading(false)
            ])
            .catch(error => console.log(error))
    },

    uploadImage: (image, type) => {

        if (image.length === 0) {
            return
        } else {
            const uploadTask = storage.ref(`/images/${localStorage.userId}+${type}`).put(image[0])
            //initiates the firebase side uploading 
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref(`/images/${localStorage.userId}+${type}`).getDownloadURL()
                        .then(fireBaseUrl => {
                            if (type === 'profile') {
                                usersRef.doc(localStorage.userId)
                                .set(
                                    {
                                    profileImageURL: fireBaseUrl
                                }
                                ,{merge: true}
                                )
                            } else if (type === 'background') {
                                usersRef.doc(localStorage.userId)
                                .set(
                                    {
                                    backgroundImageURL: fireBaseUrl
                                }
                                ,{merge: true}
                                )
                            }
                        })
                })
        }
    },

    getImageURL: (setBackgroundImageURL, setProfileImageURL, type) => { //DEPECRATED
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref(`/images/${localStorage.userId}+${type[0]}`).getDownloadURL()
            .then(fireBaseUrl => {
                setProfileImageURL(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
            })
        storage.ref(`/images/${localStorage.userId}+${type[1]}`).getDownloadURL()
            .then(fireBaseUrl => {
                setBackgroundImageURL(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
            })

    }

}