const password = document.querySelector('#password')
const email = document.querySelector('#email')
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('.logoutBtn')
let loggedinUserId;
// ------------------------Firebase connections-----------------------------------//

import { auth, db, signInWithEmailAndPassword} from "../firebaseConfig.js";

loginBtn.addEventListener('click', loginHandler)
logoutBtn.addEventListener('click', logoutHandler)


function loginHandler() {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (user) {
                window.location.href = '../Dashboard/dashboard.html'
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert(`${errorMessage}`)
        });
}



function logoutHandler() {
    signOut(auth).then(() => {
        loggedinUserId = ``
        window.location.href = "../HomePage/homePage.html"
    }).catch((error) => {
        console.error(error)
    });
}




