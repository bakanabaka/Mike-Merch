const firebaseConfig = {
    apiKey: "AIzaSyBDdIwSsdQ-29jfyA6IfV5U-8SSmA-7iVM",
    authDomain: "pommy-a7657.firebaseapp.com",
    projectId: "pommy-a7657",
    storageBucket: "pommy-a7657.appspot.com",
    messagingSenderId: "404036371992",
    appId: "1:404036371992:web:a040d94f696e6dbc7ce56d",
    measurementId: "G-B02R9C6K2M"
};
firebase.initializeApp(firebaseConfig);
const form = document.getElementById('myform');
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById('boos')
var errorMessage = document.getElementById("error-message");

var password_span = document.getElementById('password-span');
var cpassword_span = document.getElementById('cpassword-span');
var confirmpassword = document.getElementById('confirmpassword');
var email_span = document.getElementById('mail-span');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === '' || email === null) {
        email_span.innerHTML = "no blank values allowed";
        return false;
    }
    if (password === '' || password === null) {
        if (email_span.innerHTML !== '' || email_span.innerHTML !== null) {
            email_span.innerHTML = "";
        }

        password_span.innerHTML = "no blank values allowed";
        return false;
    }
    if (password.length <= 6) {
        // alert('password must be less than 20 charcters');
        password_span.innerHTML = "password must be greater than 6 charcters"
        return false;
    }
    if (password.length >= 20) {
        // alert('password must be less than 20 charcters');
        password_span.innerHTML = "password must be less than 20 charcters"
        return false;
    }
    if (!password.match(/[0-9]/)) {
        password_span.innerHTML = "password have at least a number"
        return false;
    }
    if (!password.match(/[A-Z]/)) {
        password_span.innerHTML = "password have at least a uppercase letter"
        return false;
    }
    if (!password.match(/[!\@\#\$\%\^\&\*|(\)\[\]\{\}]/)) {
        password_span.innerHTML = "password have at least a special case letter"
        return false;
    }
    if (password !== confirmpassword.value) {
        password_span.innerHTML = "";
        cpassword_span.innerHTML = "passwords not matching"
        return false;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            console.log('User registered successfully:', userCredential.user);
            window.location.href = 'login.html';
            return true;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessageText = error.message;
            if (errorCode === 'auth/email-already-in-use') {
                cpassword_span.innerHTML = '';
                errorMessage.textContent = 'The email address is already in use.';
            } else {
                errorMessage.textContent = errorMessageText;
            }
            console.error(error);
        });
});
const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();

firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        const userId = currentUser.uid;
        const imageRef = db.collection("users").doc(userId).collection("images").doc("userimg");
        const imageDoc = await imageRef.get();
        if (imageDoc.exists) {
            const imageUrl = imageDoc.data().url;
            const userPicElement = document.getElementById("nav-img");
            userPicElement.src = imageUrl;
            console.log("image exists")
        }
        db.collection("users").doc(userId).collection("Personal Info").doc("myInfo").get().then((doc) => {
            if (doc.exists) {
                const address = doc.data();
                // const profile1 = document.querySelector('.profile1');

                document.getElementById('nav-h2').textContent = address.firstName;

            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    } else {
        console.log("nakn")
    }
});

document.getElementById('my-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('text-box').value;
    database.ref('users').push({
        Name: firstName,
        Comments: lastName
    }, function (error) {
        if (error) {
            console.log('Data could not be saved.' + error);
        } else {
            console.log('Data saved successfully.');
            window.location = 'delivery.html';
        }
    });
    document.getElementById('fname').value = '';
    document.getElementById('text-box').value = '';
});

