
import { get } from 'superagent';
import firebaseConfig from '../../firebase/firebaseIndex';
import { database, storage } from '../../firebase/firebaseIndex';

const PostRefFirestore = database.collection("Posts")
const PostRefStorage = storage.ref('/PostImages/')

export const postMethods = {


    pushPostData: (postInputs, postId, profileImageURL, username, setLoading) => {
        const timeMark = new Date()
        setLoading(true)
        PostRefFirestore.doc(postId)
            .set(
                {
                    name: username,
                    profileImageURL: profileImageURL,
                    timeMark: timeMark,
                    timeMarkInMilliseconds: timeMark.getTime(),
                    postId: postId,
                    userId: localStorage.userId,
                    text:{
                            description: postInputs.Description,
                            title: postInputs.Title
                        }
                }
                , { merge: true })
            .then(() => {
                setLoading(false)
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
                            ,{merge: true}
                            )
                        })
                })
        }
    },

    getPosts: (setAllPosts, setLoading, setPostQuery) => {

        PostRefFirestore.orderBy('timeMarkInMilliseconds').limit(3).get()
        .then((snapshot) => {
        setLoading(true)
          const data = snapshot.docs.map((doc) => ({
            ...doc.data()
          }));
          const lastVisible = snapshot.docs[snapshot.docs.length-1];
          setPostQuery(lastVisible)
          console.log(data)
          return data
        })
        .then((data) => {
            setAllPosts(data)
            setLoading(false)
        })
    },

    getNextPage: (setAllPosts, allPosts, setLoading, setPostQuery, postQuery) => {
        if(allPosts.length < 3) {

            PostRefFirestore.orderBy('timeMarkInMilliseconds').limitToLast(3).get()
            .then((snapshot) => {
            setLoading(true)
              const data = snapshot.docs.map((doc) => ({
                ...doc.data()
              }));
              const lastVisible = snapshot.docs[snapshot.docs.length-1];
              setPostQuery(lastVisible)
              return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
            })
        } else {

            return PostRefFirestore.orderBy('timeMarkInMilliseconds').startAfter(postQuery).limit(3).get()
            .then((snapshot) => {
                setLoading(true)
                  const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                  }));
                  const lastVisible = snapshot.docs[snapshot.docs.length-1];
                  setPostQuery(lastVisible)
                  return data
                })
                .then((data) => {
                    setAllPosts(data)
                    setLoading(false)
                })
        }
    },

    getPreviousPage: (setAllPosts, allPosts, setLoading, setPostQuery, postQuery) => {
        if(allPosts.length < 3) {
            return PostRefFirestore.orderBy('timeMark').limit(3).get()
            .then((snapshot) => {
                setLoading(true)
                  const data = snapshot.docs.map((doc) => ({
                    ...doc.data()
                  }));
                  const lastVisible = snapshot.docs[snapshot.docs.length-1];
                  setPostQuery(lastVisible)
                  return data
                })
                .then((data) => {
                    setAllPosts(data)
                    setLoading(false)
                })

        } else {
            
        return PostRefFirestore.orderBy('timeMark').endBefore(postQuery).limit(3).get()
        .then((snapshot) => {
            setLoading(true)
              const data = snapshot.docs.map((doc) => ({
                ...doc.data()
              }));
              const lastVisible = snapshot.docs[snapshot.docs.length-1];
              setPostQuery(lastVisible)
              return data
            })
            .then((data) => {
                setAllPosts(data)
                setLoading(false)
            })
        }

    },

    getUserPosts: (setUsersPost,setLoading) => {

        PostRefFirestore.get()
        .then((snapshot) => {
        setLoading(true)
          const data = snapshot.docs.map((doc) => ({
            ...doc.data()
          }))
          .filter(post => post.userId === localStorage.userId);
          return data
        })
        .then((data) => {
            setUsersPost(data)
            setLoading(false)
        })
    },

    
}