

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

var db = firebase.firestore();

var form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    var addtit = document.getElementById("addtit").value;
    var country = document.getElementById("country").value;
    var line1 = document.getElementById("line1").value;
    var line2 = document.getElementById("line2").value;
    var city = document.getElementById("city").value;
    var pin = document.getElementById("pin").value;
    var state = document.getElementById("state").value;

    const currentUser = firebase.auth().currentUser;
    const userId = currentUser.uid;
    const addressRef = db.collection("users").doc(userId).collection("address").doc("myAddress");
    const inputCollection1 = db.collection("credits").doc(userId);
    // const inputDocument1 = inputCollection1.doc(userId);
    inputCollection1.get().then((doc) => {
        if (!doc.exists) {
            inputCollection1.set({
                credit: 0
            }).then(() => {
                console.log("Credits added!");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        }
    })
    addressRef.get().then((doc) => {
        if (doc.exists) {
            addressRef.update({
                title: addtit,
                country: country,
                line1: line1,
                line2: line2,
                city: city,
                pin: pin,
                state: state
            }).then(() => {
                console.log("Document updated successfully!");
                form.reset();
                window.location.href = "account.html";
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        } else {
            addressRef.set({
                title: addtit,
                country: country,
                line1: line1,
                line2: line2,
                city: city,
                pin: pin,
                state: state
            }).then(() => {
                console.log("Document created successfully!");
                form.reset();
                window.location.href = "account.html";
            }).catch((error) => {
                console.error("Error creating document: ", error);
            });
        }
    }).catch((error) => {
        console.error("Error retrieving document: ", error);
    });
});
// const db = firebase.firestore();
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
