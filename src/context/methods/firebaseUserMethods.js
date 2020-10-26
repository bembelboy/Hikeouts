import firebaseConfig from '../../firebase/firebaseIndex';
import { database, storage } from '../../firebase/firebaseIndex';

const usersRef = database.collection("Nutzer")

export const userMethods = {

    getUserData: (setUser, setLoading) => {
        setLoading(true)
        if (!localStorage.userId) {
            return
        } else {
            usersRef.doc(localStorage.userId).get()
                .then( (snapshot) => {
                    let userdata = { ...snapshot.data() }
                    setUser(userdata)
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

    editBookmarks: (postId, currentBookmarks, setLoading, setUser) => {
        setLoading(true)
        let newBookmarks
            if (currentBookmarks.includes(postId)) { //checks in the database if the bookmark has already been set
                newBookmarks = currentBookmarks.filter(bookmark => bookmark !== postId) //when true the postId will be removed
                usersRef.doc(localStorage.userId)
                    .set({
                        bookmarks: newBookmarks
                    }, { merge: true })
                    .then(() => { //synchronizes changes with the State 
                        usersRef.doc(localStorage.userId).get()
                        .then((snapshot) => {
                            const data = snapshot.data()
                            setUser(data)
                         })
                    })
                    .catch(error => console.log(error))
                    setLoading(false)
            } else { //when false the postId will be added

                newBookmarks = [...currentBookmarks, postId]
                usersRef.doc(localStorage.userId)
                    .set({
                        bookmarks: newBookmarks
                    }, { merge: true })
                    .catch(error => console.log(error))
                    .then(() => { //synchronizes changes with the State 
                        usersRef.doc(localStorage.userId).get()
                        .then((snapshot) => {
                            const data = snapshot.data()
                            setUser(data)
                         })
                    })
                    setLoading(false)
            }


    },

    editFollowers: (userToFollow) => {
        usersRef.doc(userToFollow).get() // gets the user u want to follow
        .then((snapshot) => {
            const data  = snapshot.data();
            return data.followers
        })
        .then(followers => {
            if( followers.includes(localStorage.userId)) {

                let newFollowers = followers.filter( followerId => followerId !== localStorage.userId)   
                usersRef.doc(userToFollow).set({ // if you already followed you will unfollow by True
                    followers: newFollowers,
                }, { merge: true })
                
                usersRef.doc(localStorage.userId).get()
                .then((snapshot) => {
                    const data = snapshot.data()
                    return data.followed
                })
                .then((followed) => {
                    let newFollowed = followed.filter( f => f !== userToFollow)
                    usersRef.doc(localStorage.userId).set({ // it will dissapear from your followed List
                        followed: newFollowed,
                    }, {merge: true})
                })

            }else { // you will follow if the statement is false

                usersRef.doc(userToFollow).set({ //you will be on the followerList of the creator
                    followers: [...followers, localStorage.userId],
                }, { merge: true })

                usersRef.doc(localStorage.userId).get()
                .then((snapshot) => {
                    const data = snapshot.data()
                    return data.followed
                })
                .then((followed) => {
                    usersRef.doc(localStorage.userId).set({ // it will dissapear from your followed List
                        followed: [...followed,userToFollow]
                    },{merge: true})
                })
            }
        })
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
                                        , { merge: true }
                                    )
                            } else if (type === 'background') {
                                usersRef.doc(localStorage.userId)
                                    .set(
                                        {
                                            backgroundImageURL: fireBaseUrl
                                        }
                                        , { merge: true }
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