
const firebaseConfig2 = {
    apiKey: "AIzaSyCZ6b8o39AriD7cM55SHpYKxohJGg1hkOI",
    authDomain: "admin-8ce61.firebaseapp.com",
    projectId: "admin-8ce61",
    storageBucket: "admin-8ce61.appspot.com",
    messagingSenderId: "637518450545",
    appId: "1:637518450545:web:05bc61cee21e86257630d0",
    measurementId: "G-DQ70SBQ3Z6"
};

firebase.initializeApp(firebaseConfig2);

const firebaseConfig1 = {
    apiKey: "AIzaSyBDdIwSsdQ-29jfyA6IfV5U-8SSmA-7iVM",
    authDomain: "pommy-a7657.firebaseapp.com",
    projectId: "pommy-a7657",
    storageBucket: "pommy-a7657.appspot.com",
    messagingSenderId: "404036371992",
    appId: "1:404036371992:web:a040d94f696e6dbc7ce56d",
    measurementId: "G-B02R9C6K2M"
};

var second = firebase.initializeApp(firebaseConfig1, 'secondary');

var form = document.getElementById('login-form');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var errorMessage = document.getElementById("error-message");


form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            console.log("User logged in successfully.");
            form.style.display = "none";
            var dataList = document.getElementById("data-list");
            var db = second.database();
            var dataRef = db.ref("users");
            dataRef.on("value", function (snapshot) {
                dataList.innerHTML = "";
                snapshot.forEach(function (childSnapshot) {
                    var data = childSnapshot.val();
                    var listItem = document.createElement("li");
                    listItem.textContent = data.Name + "  " + data.Comments + " ";
                    dataList.appendChild(listItem);
                });
            });
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


const db = second.firestore();
const auth = second.auth();
const database = second.database();

second.auth().onAuthStateChanged(async function (user) {
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

document.getElementById('my-form1').addEventListener('submit', function (event) {
    event.preventDefault();
    var firstName1 = document.getElementById('fname1').value;
    var lastName1 = document.getElementById('text-box1').value;
    database.ref('users').push({
        Name: firstName1,
        Comments: lastName1
    }, function (error) {
        if (error) {
            console.log('Data could not be saved.' + error);
        } else {
            console.log('Data saved successfully.');
            alert('Feedback successfully recorded');
        }
    });
    document.getElementById('fname1').value = '';
    document.getElementById('text-box1').value = '';
});




