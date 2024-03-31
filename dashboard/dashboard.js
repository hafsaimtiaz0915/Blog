import { auth, db, onAuthStateChanged, signOut, getDoc, doc, collection, addDoc, getDocs, deleteDoc, updateDoc, serverTimestamp, orderBy, query, where } from "../firebaseConfig.js"


const blogTitleInput = document.querySelector('#blogTitleInput')
const blogTextArea = document.querySelector('#blogTextArea')
const publishBtn = document.querySelector('.publishBtn')
const blogContainer = document.querySelector('.blogContainer')
const logoutBtn = document.querySelector('.logoutBtn')
const userName = document.querySelector('.loggedInUserName')
let loggedinUserId;
let postIdGlobal;

console.log(blogTextArea, blogTitleInput, publishBtn, blogContainer)

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        getUserData(uid)
        console.log(uid);
        loggedinUserId = uid
    } else {
        window.location.href = '../HomePage/homePage.html'
    }
});



logoutBtn.addEventListener('click', logoutHandler)
publishBtn.addEventListener('click', storeBlogAndCreateBlogHandler)

function logoutHandler() {
    signOut(auth).then(() => {
        loggedinUserId = ``
        window.location.href = "../HomePage/homePage.html"
    }).catch((error) => {
        console.error(error)
    });
}

async function getUserData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { firstName, lastName, emailAddress } = docSnap.data()
        userName.innerHTML = `${firstName} ${lastName}`
    } else {
        console.log("No such document!");
    }
    createPost(uid)
}

async function storeBlogAndCreateBlogHandler() {
    if(blogTitleInput == `` || blogTextArea == ``){
        alert('fill all the fields to continue')
    } else if ((blogTitleInput.value.length < 5  || blogTextArea.value.length < 100 )) {
        alert(`title lenght should be between 5 - 50 character and blog lenght should be between 100 - 3000 character`)
    } else{
        const docRef = await addDoc(collection(db, "blogs"), {
            BlogContent: blogTextArea.value,
            BlogTitle: blogTitleInput.value,
            author: loggedinUserId,
            timestamp: serverTimestamp()
        });
        createPost(loggedinUserId)
    }
}



async function createPost(uid) {
    blogContainer.innerHTML = ``;
    // const postsCollectionRef = collection(db, "blogs");

    // Create a query to order the documents by "time" field in descending order
    const sortedQuery = query(collection(db, "blogs"), where("author", "==", uid)); // "desc"
    const querySnapshot = await getDocs(sortedQuery);
    querySnapshot.forEach(async (doc) => {
        let postId = doc.id
        // doc.data() is never undefined for query doc snapshots
        const { BlogContent, BlogTitle, author, timestamp } = doc.data()

        const gettingUserData = await getAuthData(author)
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
                    <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle"
            type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" onclick="editPostHandler('${postId}')">Edit</a></li>
                <li><a class="dropdown-item" onclick="deletePostHandler('${postId}')">Delete</a></li>
                </ul>
                </div>
                </div>
                <div class="blogDetails">
                    <p id="post-text" class="mt-2">${BlogContent}</p>
                </div>`
        blogContainer.prepend(div)
        blogTitleInput.value = ""
        blogTextArea.value = ""
    });
}

async function getAuthData(id) {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}

async function editPostHandler(postId) {
    console.log("edit btn working", "==>", postId)
    postIdGlobal = postId

    let title = prompt('enter title')
    let blog = prompt('enter blog')

    const washingtonRef = doc(db, "blogs", postIdGlobal);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
        BlogContent: blog,
        BlogTitle: title,
        author: loggedinUserId,
        timestamp: serverTimestamp()
    });

    createPost(loggedinUserId)

    const blogData = getBlogForEdit(postIdGlobal)
    blogTextArea.value = blogData.BlogContent;
    blogTitleInput.value = blogData.BlogTitle;

    publishBtn.removeEventListener('click', storeBlogAndCreateBlogHandler);
    publishBtn.addEventListener('click', updatePostHandler)

}

async function deletePostHandler(postId) {
    let confirmDelete = prompt('If you want to delete data type yes')
    console.log(confirmDelete)
    let lowerCase = confirmDelete.toLowerCase()
    console.log(lowerCase)
    if(lowerCase.includes('yes')){
        try {
            await deleteDoc(doc(db, "blogs", postId));
            alert("Your post has been deleted");
            createPost(loggedinUserId);
        } catch (error) {
            console.log(error);
        }
    } else{
        return
    }

}


async function getBlogForEdit(postId){
    const docRef = doc(db, "blogs", postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

window.editPostHandler = editPostHandler;
window.deletePostHandler = deletePostHandler;
