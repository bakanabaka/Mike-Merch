var firebaseConfig = {
    apiKey: "AIzaSyCZ6b8o39AriD7cM55SHpYKxohJGg1hkOI",
    authDomain: "admin-8ce61.firebaseapp.com",
    projectId: "admin-8ce61",
    storageBucket: "admin-8ce61.appspot.com",
    messagingSenderId: "637518450545",
    appId: "1:637518450545:web:05bc61cee21e86257630d0",
    measurementId: "G-DQ70SBQ3Z6"
};
firebase.initializeApp(firebaseConfig);

var form = document.getElementById('form');
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
var errorMessage = document.getElementById("error-message");
var successMessage = document.getElementById("success-message");

const auth = firebase.auth();


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("A user is already logged in.");
        errorMessage.textContent = "Another user is already logged in. Please log out first.";
    } else {
        console.log("No user is currently logged in.");
        errorMessage.textContent = "";
        successMessage.textContent = "";
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var email = emailInput.value;
            var password = passwordInput.value;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    console.log("User logged in successfully.");
                    window.location = '../stylist.html'
                })
                .catch(function (error) {
                    console.log("Login error:", error);
                    if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
                        errorMessage.textContent = "Invalid email. Please try again.";
                    } else if (error.code === "auth/wrong-password") {
                        errorMessage.textContent = "Invalid password. Please try again.";
                    } else {
                        errorMessage.textContent = "Login failed. Please try again later.";
                    }
                });
        });
    }
});




const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    auth.sendPasswordResetEmail(email).then(() => {
        console.log('Password reset email sent successfully!');
        successMessage.textContent = "A password reset link has been sent to your email address.";
    }).catch(error => {
        console.log("Password reset error:", error);
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
            errorMessage.textContent = "Invalid email. Please try again.";
        } else {
            errorMessage.textContent = "Password reset failed. Please try again later.";
        }
    });
});

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    if (auth.currentUser) {
        auth.signOut().then(() => {
            alert('User logged out successfully!');
            console.log('User logged out successfully!');
        }).catch(error => {
            console.error(error);
        });
    } else {
        console.log('No user to log out!');
        alert('No user to log out!');
    }
});

const db = firebase.firestore();
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




