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
        // A user is logged in
        console.log("A user is already logged in.");
        // Redirect the user to the home page or display an error message
        // You can use window.location.href = "home.html"; to redirect the user to the home page
        errorMessage.textContent = "Another user is already logged in. Please log out first.";
    } else {
        // No user is logged in
        console.log("No user is currently logged in.");
        errorMessage.textContent = "";
        successMessage.textContent = "";
        // Add an event listener for the form submission
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form from submitting

            // Get the email and password values from the form
            var email = emailInput.value;
            var password = passwordInput.value;
            // Log in the user with Firebase Authentication
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (userCredential) {
                    // User login successful
                    console.log("User logged in successfully.");
                    // You can redirect the user to a different page here, if desired
                    window.location = '../stylist.html'
                })
                .catch(function (error) {
                    // Handle login error
                    console.log("Login error:", error);
                    // Show an error message to the user if the email or password is invalid
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
        // Show an error message to the user if the email is invalid or not associated with any user account
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
            errorMessage.textContent = "Invalid email. Please try again.";
        } else {
            errorMessage.textContent = "Password reset failed. Please try again later.";
        }
    });
});


// Attach click event listener to the logout button
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
// Attach click event listener to the logout button



firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        // User is signed in.
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

// Listen for form submission
document.getElementById('my-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the values from the form input fields
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('text-box').value;

    // Store the first name and last name in the Firebase database
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

    // Clear the input fields
    document.getElementById('fname').value = '';
    document.getElementById('text-box').value = '';
});




