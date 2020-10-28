
import firebaseConfig from '../../firebase/firebaseIndex';
import { database, storage } from '../../firebase/firebaseIndex';

const PostRefFirestore = database.collection("Posts")
const PostRefStorage = storage.ref('/PostImages/')

export const postMethods = {


    pushPostData: (postInputs, postId, profileImageURL, username, setLoading, setSubmitted) => {

        let profileImage = profileImageURL === undefined ? '' : profileImageURL
        const timeMark = new Date()
        setLoading(true)
        PostRefFirestore.doc(postId)
            .set(
                {
                    name: username,
                    profileImageURL: profileImage,
                    timeMark: timeMark,
                    timeMarkInMilliseconds: timeMark.getTime(),
                    postId: postId,
                    userId: localStorage.userId,
                    likes: [],
                    likeCount: 0,
                    text: {
                        description: postInputs.Description,
                        title: postInputs.Title
                    }
                }
                , { merge: true })
            .then(() => {
                setLoading(false)
                setSubmitted(true)
            })
            .catch(error => console.log(error))
    },


    uploadPostImage: (image, postId) => {

        if (image.length === 0) {
            return
        } else {
            const uploadTask = PostRefStorage.child(postId).put(image[0])
            //initiates the firebase side uploading 
            uploadTask.on('state_changed',
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    // console.log(snapShot)
                }, (err) => {
                    //catches the errors
                    console.log(err)
                }, () => {
                    // sets the ImageUrl in Firestore to the name of the document in storage so I can retrive it later
                    storage.ref('/PostImages/').child(postId).getDownloadURL()
                        .then(fireBaseUrl => {
                            PostRefFirestore.doc(postId)
                                .set(
                                    {
                                        imgUrl: fireBaseUrl
                                    }
                                    , { merge: true }
                                )
                        })
                })
        }
    },

    getPosts: (setAllPosts, setLoading, setLastVisible, setFirstPostQueryId, setLastPostQuery, timeRange, setReversed, orderByVal) => {

console.log( timeRange)
        setReversed(false)
        PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy(orderByVal)
        .limit(3).get() // gets the first 3 elements of the ordered array
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const lastVisiblePost = snapshot.docs[snapshot.docs.length - 1];
                setLastVisible(lastVisiblePost) // sets the last visible post on te page so you can go further
                setFirstPostQueryId(lastVisiblePost.id) // sets the first so you cant go past it
                return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
                PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy(orderByVal)
                .limitToLast(3).get() //gets the last three Elements of the 3
                .then((snapshot) => {
                    const lastPost = snapshot.docs[snapshot.docs.length - 1];
                    setLastPostQuery(lastPost.id) // sets the last one so you cant go past it
                })
            })
    },

    getPostsReversed: (setAllPosts, setLoading, setLastVisible, setFirstPostQueryId, setLastPostQuery,timeRange, setReversed, orderByVal) => {

        setReversed(true)
        PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy(orderByVal)
        .limitToLast(3).get() // gets the first 3 elements of the ordered array
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const lastVisiblePost = snapshot.docs[snapshot.docs.length - 1];
                setLastVisible(lastVisiblePost)
                setFirstPostQueryId(lastVisiblePost.id) // sets the first so you cant go past it
                return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
                PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy(orderByVal)
                .limit(3).get() //gets the last three Elements of the 3
                .then((snapshot) => {
                    const lastPost = snapshot.docs[snapshot.docs.length - 1];
                    setLastPostQuery(lastPost.id) // sets the last one so you cant go past it
                })
            })
    },


    getNextPage: (setAllPosts, setLoading, setLastVisble, setFirstVisible, lastVisible, timeRange ) => {
            return PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy('timeMarkInMilliseconds')
            .startAfter(lastVisible).limit(3).get()
                .then((snapshot) => {
                    setLoading(true)
                    const data = snapshot.docs.map((doc) => ({
                        ...doc.data()
                    }));
                    const firstVisiblePost = snapshot.docs[0]
                    const lastVisiblePost = snapshot.docs[snapshot.docs.length  -1];
                    setLastVisble(lastVisiblePost)
                    setFirstVisible(firstVisiblePost)
                    return data
                })
                .then((data) => {
                    setAllPosts(data)
                    setLoading(false)
                })
    },

    getPreviousPage: (setAllPosts,  setLoading, setLastVisible, setFirstVisible, firstVisible, timeRange ) => {

        return PostRefFirestore.where('timeMarkInMilliseconds', '>', timeRange.timeInMilliSeconds ).orderBy('timeMarkInMilliseconds').endBefore(firstVisible).limitToLast(3).get()
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const firstVisiblePost = snapshot.docs[0]
                const lastVisiblePost = snapshot.docs[snapshot.docs.length - 1];
                setFirstVisible(firstVisiblePost)
                setLastVisible(lastVisiblePost)
                return data 
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
            })

    },

    getUserPosts: (setUsersPost, setLoading) => {

        PostRefFirestore.get()
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }))
                    .filter(post => post.userId === localStorage.userId );
                return data
            })
            .then((data) => {
                setUsersPost(data)
                setLoading(false)
            })
    },

    getUserFavoritePost: (setUserFavoritePost, bookmarks) => {
        if(bookmarks.lentgh === 0 || bookmarks[0] === '') {//Note that this operation is not as expensive as it looks like due to firebase Pipelining
            return
        } else {
            bookmarks.map(bookmark => {
                return  PostRefFirestore.doc(bookmark).get()
                 .then(data => {
                     setUserFavoritePost(prev => [...prev, data.data()])
                 })
             })
        }

            // console.log('Connected')
            // PostRefFirestore.where('postId', 'in', [`${bookmarks[0]}`]).get()
            //     .then((snapshot) => {
            //         const data = snapshot.docs.map((doc) => ({
            //             ...doc.data()
            //         }))
            //         console.log(data)
            //         return data
            //     })
            //     .then((data) => {
            //         setUserFavoritePost(data)
            //     })

    },

    editLikes: ( postId) => {
        PostRefFirestore.doc(postId).get()
        .then((snapshot) => { //Getting the requested Post likes Array
           const  data = snapshot.data()
           return data.likes
        })
        .then( currentLikesArray => {
            if(currentLikesArray.includes(localStorage.userId)) {// checks if the user already liked the post
               let newLikesArray = currentLikesArray.filter(uid => uid !== localStorage.userId) //TRUE = removes the like
                PostRefFirestore.doc(postId).set({
                    likes: newLikesArray,
                    likeCount: newLikesArray.length
                }, {merge: true})
            } else {
                let newLikesArray = [...currentLikesArray, localStorage.userId ]
                PostRefFirestore.doc(postId).set({ //FALSE =  added the like
                    likes: newLikesArray,
                    likeCount: newLikesArray.length,
                }, {merge: true})
            }
        })
    },


}