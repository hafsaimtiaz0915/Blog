import { auth, db, onAuthStateChanged, signOut, getDoc, doc, collection, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, orderBy, query, where } from "../firebaseConfig.js"

const { userPostId, userAuthUid } = JSON.parse(localStorage.getItem('userBlog'));
// console.log(ids);

const blogContainer = document.querySelector('.blogContainer')
console.log(blogContainer)

async function getAuthData(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}


createPost(userPostId, userAuthUid)


async function createPost(postId, uid) {
    blogContainer.innerHTML = ``;
    const docRef = doc(db, "blogs", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { BlogContent, BlogTitle, author, timestamp } = docSnap.data()


        const gettingUserData = await getAuthData(uid)
        console.log(gettingUserData)

        let div = document.createElement('div')
        div.setAttribute('class', 'postConatiner postInputContainer my-3')
        div.innerHTML = `<div class="d-flex justify-content-between ">
                    <div class="authorsDetails d-flex align-items-center">
                        <div class="post-header-container d-flex align-items-center">
                            <div class="image">
                                <img src=${gettingUserData.profilePicture || "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1685543404~exp=1685544004~hmac=d07ea3ce3ef8f3935685c31c8166ad233839e12607dfb08424f2e5a129f3d691"}
                                    alt="" class="img-fluid rounded mx-auto d-block">
                            </div>
                            <div class="userName-id ms-2">
                                <h4 class="mb-1 blogTitle" style="color: #868686;">
                                    ${BlogTitle}</h4>
                                <div class="d-flex align-items-center justify-content-center">
                                    <h6 class="mb-1 username">${gettingUserData.firstName} ${gettingUserData.lastName}</h6>
                                    <h6 class="mb-0 ms-2">${moment(timestamp.toDate()).fromNow()}</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="blogDetails">
                    <p id="post-text" class="mt-2">${BlogContent}</p>
                </div>`
        blogContainer.prepend(div)
        // blogTitleInput.value = ""
        // blogTextArea.value = ""

    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    // const postsCollectionRef = collection(db, "blogs");

    // Create a query to order the documents by "time" field in descending order
    // const sortedQuery = query(collection(db, "blogs"), where("author", "==", uid)); // "desc"
    // const querySnapshot = await getDocs(sortedQuery);
    // querySnapshot.forEach(async (doc) => {
    //     let postId = doc.id
    //     // doc.data() is never undefined for query doc snapshots
    //     const { BlogContent, BlogTitle, author, timestamp } = doc.data()


    // });
}