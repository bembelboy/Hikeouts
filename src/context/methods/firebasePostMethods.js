
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
                    likeCount: 10000000, // the COunter is needed to get the Elements after Likes in decendent Order
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

    getPosts: (setAllPosts, setLoading, setLastVisible, setFirstVisible, setFirstPostQueryId, setLastPostQuery, range, orderByVal) => {

        PostRefFirestore.where(orderByVal, '>=', range ).orderBy(orderByVal)
        .limit(3).get() // gets the first 3 elements of the ordered array
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                console.log(data)
                const lastVisiblePost = snapshot.docs[snapshot.docs.length  -1];
                const firstVisiblePost = snapshot.docs[0]
                setLastVisible(lastVisiblePost) // sets the last visible post on te page so you can go further
                setFirstVisible(firstVisiblePost)
                setFirstPostQueryId(data[0].postId) // sets the first so you cant go past it
                console.log('LastVisiblePostId',lastVisiblePost)
                console.log('FirstVisiblePostId',firstVisiblePost)
                console.log('firstPostQuery', data[0].postId )
                return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
                PostRefFirestore.where(orderByVal, '>=', range ).orderBy(orderByVal)
                .limitToLast(3).get() //gets the last three Elements of the 3
                .then((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        ...doc.data()
                    }));
                    const lastPost = data[data.length - 1];
                    setLastPostQuery(lastPost.postId) // sets the last one so you cant go past it
                    console.log('data',data)
                    console.log('lastPostQuery',lastPost.postId)
                })
            })
    },

    getPostsReversed: (setAllPosts, setLoading, setLastVisible, setFirstVisible, setFirstPostQueryId, setLastPostQueryId, range, orderByVal) => {

        PostRefFirestore.where(orderByVal, '>=', range ).orderBy(orderByVal)
        .limitToLast(3).get() // gets the first 3 elements of the ordered array
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const lastVisiblePost =  snapshot.docs[0];
                const firstVisiblePost = snapshot.docs[snapshot.docs.length - 1];
                setLastVisible(lastVisiblePost)
                setFirstVisible(firstVisiblePost)
                setFirstPostQueryId(data[data.length -1].postId) // sets the first so you cant go past it Note that it is the last of the 3 because it gets reversed in the NewsFeedComponent
                return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
                PostRefFirestore.where(orderByVal, '>=', range ).orderBy(orderByVal)
                .limit(3).get() //gets the last three Elements of the 3
                .then((snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        ...doc.data()
                    }));
                    const lastPost = data[0];
                    setLastPostQueryId(lastPost.postId) // sets the last one so you cant go past it
                    console.log(data)
                    console.log(lastPost.postId)
                })
            })
    },


    getNextPage: (setAllPosts, setLoading, setLastVisble, setFirstVisible, lastVisible, timeRange, orderByVal ) => {


        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0; // is needed to set the range dependent on which filter is active  
            return PostRefFirestore.where(orderByVal, '>', range ).orderBy(orderByVal)
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
                    console.log('LastVisibleInNext', lastVisiblePost.id)
                    return data
                })
                .then((data) => {
                    setAllPosts(data)
                    setLoading(false)
                })
    },

    getNextPageReversed: (setAllPosts, setLoading, setLastVisble, setFirstVisible, lastVisible, timeRange, orderByVal ) => {

        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0; // is needed to set the range dependent on which filter is active  
        return PostRefFirestore.where(orderByVal, '>', range ).orderBy(orderByVal)
        .endBefore(lastVisible).limitToLast(3).get()
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const firstVisiblePost = snapshot.docs[snapshot.docs.length  -1];
                const lastVisiblePost =  snapshot.docs[0];
                setLastVisble(lastVisiblePost)
                setFirstVisible(firstVisiblePost)
                console.log('LastVisibleInNext', lastVisiblePost.id)
                return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
            })
    },

    getPreviousPage: (setAllPosts,  setLoading, setLastVisible, setFirstVisible, firstVisible, timeRange, orderByVal ) => {

        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0 // is needed to set the range dependent on which filter is active  
        return PostRefFirestore.where(orderByVal, '>', range ).orderBy(orderByVal).endBefore(firstVisible).limitToLast(3).get()
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

    getPreviousPageReversed: (setAllPosts,  setLoading, setLastVisible, setFirstVisible, firstVisible, timeRange, orderByVal ) => {

        let range = orderByVal === 'timeMarkInMilliseconds' ? timeRange.timeInMilliSeconds : 0 // is needed to set the range dependent on which filter is active  
        return PostRefFirestore.where(orderByVal, '>', range ).orderBy(orderByVal).startAfter(firstVisible).limit(3).get()
            .then((snapshot) => {
                setLoading(true)
                const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                const firstVisiblePost = snapshot.docs[snapshot.docs.length - 1];
                const lastVisiblePost =  snapshot.docs[0];
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
           return {
               likes: data.likes,
               likeCount: data.likeCount
           }
        })
        .then( dataObj => {
            if(dataObj.likes.includes(localStorage.userId)) {// checks if the user already liked the post
               let newLikesArray = dataObj.likes.filter(uid => uid !== localStorage.userId) //TRUE = removes the like
               let newLikeCount = dataObj.likeCount -1
                PostRefFirestore.doc(postId).set({
                    likes: newLikesArray,
                    likeCount: newLikeCount
                }, {merge: true})
            } else {
                let newLikesArray = [...dataObj.likes, localStorage.userId ]
                let newLikeCount = dataObj.likeCount +1
                PostRefFirestore.doc(postId).set({ //FALSE =  added the like
                    likes: newLikesArray,
                    likeCount: newLikeCount,
                }, {merge: true})
            }
        })
    },


}