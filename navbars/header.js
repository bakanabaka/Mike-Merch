
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