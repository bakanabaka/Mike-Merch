
var firebaseConfig = {
    apiKey: "AIzaSyBDdIwSsdQ-29jfyA6IfV5U-8SSmA-7iVM",
    authDomain: "pommy-a7657.firebaseapp.com",
    projectId: "pommy-a7657",
    storageBucket: "pommy-a7657.appspot.com",
    messagingSenderId: "404036371992",
    appId: "1:404036371992:web:a040d94f696e6dbc7ce56d",
    measurementId: "G-B02R9C6K2M"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
// Attach click event listener to the logout button
logoutBtn.addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            auth.signOut().then(() => {
                console.log('User logged out successfully from first Firebase account');
                alert('User logged out successfully');
                location.reload();
            }).catch(error => {
                console.error(error);
            });
        }
    } else {
        alert('No account to log out');
    }
});

document.querySelector(".edit1").addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            window.location.href = "edit_prof.html";
        }
    } else {
        alert('Login before you want to click it');
    }
});
document.getElementById("edita").addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            window.location.href = "edit_addr.html";
        }
    } else {
        alert('Login before you want to click it');
    }
});
document.querySelector(".edit2").addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            window.location.href = "edit_addr.html";
        }
    } else {
        alert('Login before you want to click it');
    }
});
document.querySelector(".edit4").addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            window.location.href = "../random_image/index.html";
        }
    } else {
        alert('Login before you want to click it');
    }
});
document.querySelector(".edit5").addEventListener('click', e => {
    e.preventDefault();

    if (auth.currentUser) {
        if (auth.currentUser) {
            window.location.href = "edit_prof.html";
        }
    } else {
        alert('Login before you want to click it');
    }
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        const currentUser = firebase.auth().currentUser;
        const userId = currentUser.uid;

        db.collection("users").doc(userId).collection("Personal Info").doc("myInfo").get().then((doc) => {
            if (doc.exists) {
                const address = doc.data();
                const profile1 = document.querySelector('.profile1');

                document.getElementById('fname').textContent = address.firstName;
                document.getElementById('lname').textContent = address.lastName;
                document.getElementById('gender').textContent = address.gender;
                document.getElementById('dob').textContent = address.dob;

            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        db.collection("users").doc(userId).collection("address").doc("myAddress").get().then((doc) => {
            if (doc.exists) {
                const address = doc.data();
                const profile2 = document.querySelector('.profile2');

                // Update HTML with retrieved data
                document.getElementById('address-title').textContent = address.title;
                document.getElementById('country').textContent = address.country;
                document.getElementById('address-line1').textContent = address.line1;
                document.getElementById('address-line2').textContent = address.line2;
                document.getElementById('city').textContent = address.city;
                document.getElementById('state').textContent = address.state;
                document.getElementById('pincode').textContent = address.pin;
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        db.collection("users").doc(userId).collection("Phone Number").doc("myInfo").get().then((doc) => {
            if (doc.exists) {
                const address = doc.data();
                const profile2 = document.querySelector('.profile2');

                // Update HTML with retrieved data
                document.getElementById('phones').textContent = address.phone;

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

var successMessage = document.getElementById("success-message");
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', e => {
    e.preventDefault();
    const currentUser = firebase.auth().currentUser;
    auth.sendPasswordResetEmail(currentUser.email).then(() => {
        console.log('Password reset email sent successfully!');
        successMessage.textContent = "A password reset link has been sent to your email address. Login with new password";
    }).catch(error => {
        console.log("Password reset error:", error);
        // Show an error message to the user if the email is invalid or not associated with any user account
    });
});
const passwordField = document.getElementById('password-field');

// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, show dots instead of password
        const passwordLength = 10;
        const dots = '\u2022'.repeat(passwordLength);
        passwordField.textContent = dots;
    } else {
        // User is logged out, don't show anything
        passwordField.textContent = '';
    }
});



firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        // User is signed in.
        const currentUser = firebase.auth().currentUser;
        const userId = currentUser.uid;
        const imageRef = db.collection("users").doc(userId).collection("images").doc("userimg");
        const imageDoc = await imageRef.get();
        if (imageDoc.exists) {
            const imageUrl = imageDoc.data().url;
            const userPicElement = document.getElementById("user-pic");
            userPicElement.src = imageUrl;
            console.log("image exists")
        }
    } else {
        console.log("nakn")
    }
});
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
