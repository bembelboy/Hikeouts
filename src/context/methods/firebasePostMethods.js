
import firebaseConfig from '../../firebase/firebaseIndex';
import { database, storage } from '../../firebase/firebaseIndex';

const PostRefFirestore = database.collection("Posts")
const PostRefStorage = storage.ref('/PostImages/')

export const postMethods = {


    pushPostData: (postInputs, postId, setLoading) => {
        setLoading(true)
        PostRefFirestore.doc(postId)
            .set(
                {
                    timeMark: new Date(),
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
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
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

    getPosts: (setAllPosts, setLoading) => {

        PostRefFirestore.get()
        .then((snapshot) => {
        setLoading(true)
          const data = snapshot.docs.map((doc) => ({
            ...doc.data()
          }));
          return data
        })
        .then((data) => {
            setAllPosts(data)
            setLoading(false)
        })
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