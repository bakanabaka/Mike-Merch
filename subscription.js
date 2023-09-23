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
const totalAmount = 3000;

document.getElementById('sub1').onclick = async function (e) {
    e.preventDefault();
    try {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            alert("Sign In before you want to buy a subscription");
            window.location.href = "signup/login.html";
        }
        const userId = currentUser.uid;
        const subscriptionSnapshot = await db.collection("subscribe").doc(userId).get();
        if (subscriptionSnapshot.exists) {
            alert("You already have an active subscription");
            return;
        }
        let response = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: totalAmount,
            })
        })
        let orderData = await response.json();
        console.log(orderData);


        var options = {
            "key": "rzp_test_vX3Y8QX16DXiF7",
            "amount": totalAmount * 100,
            "currency": "INR",
            "order_id": orderData.id,
            handler: function (response) {
                // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    alert("Sign In before you want to buy a subscription");
                    return;
                }
                const userId = currentUser.uid;
                db.collection("subscribe").doc(userId).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    total: totalAmount,
                })
                    .then(() => {
                        alert("For every payment you make 5% off your total amount will be given to charity");
                    })
                    .catch((error) => {
                        console.error("Error writing data to Firestore: ", error);
                    });
                document.getElementById("result-display").innerHTML = "0";
                window.history.replaceState({}, document.title, window.location.pathname);


            },

        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error(error);
    }
}


const totalAmount1 = 5000;

document.getElementById('sub2').onclick = async function (e) {
    e.preventDefault();
    try {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            alert("Sign In before you want to buy a subscription");
            return;
        }
        const userId = currentUser.uid;
        const subscriptionSnapshot = await db.collection("subscribe").doc(userId).get();
        if (subscriptionSnapshot.exists) {
            alert("You already have an active subscription");
            return;
        }
        let response = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: totalAmount1,
            })
        })
        let orderData = await response.json();
        console.log(orderData);


        var options = {
            "key": "rzp_test_vX3Y8QX16DXiF7",
            "amount": totalAmount1 * 100,
            "currency": "INR",
            "order_id": orderData.id,
            handler: function (response) {
                // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    alert("Sign In before you want to buy a subscription");
                    return;
                }
                const userId = currentUser.uid;
                db.collection("subscribe").doc(userId).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    total: totalAmount1,
                })
                    .then(() => {
                        alert("For every payment you make 5% off your total amount will be given to charity");

                    })
                    .catch((error) => {
                        console.error("Error writing data to Firestore: ", error);
                    });

            },

        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error(error);
    }
}

const totalAmount2 = 1000;

document.getElementById('sub').onclick = async function (e) {
    e.preventDefault();
    try {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            alert("Sign In before you want to buy a subscription");
            return;
        }
        const userId = currentUser.uid;
        const subscriptionSnapshot = await db.collection("subscribe").doc(userId).get();
        if (subscriptionSnapshot.exists) {
            alert("You already have an active subscription");
            return;
        }
        let response = await fetch("/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: totalAmount2,
            })
        })
        let orderData = await response.json();
        console.log(orderData);


        var options = {
            "key": "rzp_test_vX3Y8QX16DXiF7",
            "amount": totalAmount2 * 100,
            "currency": "INR",
            "order_id": orderData.id,
            handler: function (response) {
                // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    alert("Sign In before you want to buy a subscription");
                    return;
                }
                const userId = currentUser.uid;
                db.collection("subscribe").doc(userId).set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    total: totalAmount2,
                })
                    .then(() => {
                        alert("For every payment you make 5% off your total amount will be given to charity");

                    })
                    .catch((error) => {
                        console.error("Error writing data to Firestore: ", error);
                    });

            },

        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error(error);
    }
}
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
