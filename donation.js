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
const inputCollection = db.collection("donations");
const inputDocument = inputCollection.doc("donations-document");
const creditScoreElement = document.getElementById("donation-score");

document.getElementById('sub1').onclick = async function (e) {
    e.preventDefault();
    try {
        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            alert("Login to contribute to society");
            return;
        }
        const userId = currentUser.uid;
        const totalAmount = parseInt(document.getElementById('subscribe-value1').value);

        // Check if user already has a subscription
        let response = await fetch("http://localhost:3000/payment", {
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
            "key": "rzp_test_vX3Y8QX16DXiF7", // Enter the Key ID generated from the Dashboard
            "amount": totalAmount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    alert("not signed in");
                    return;
                }
                const userId = currentUser.uid;
                const inputCollection = db.collection("donations");
                const inputDocument = inputCollection.doc("donations-document");

                // Get the previous input sum from Firestore
                inputDocument.get().then((doc) => {
                    if (doc.exists) {
                        const previousInput = doc.data().inputSum;
                        const newInput = parseInt(previousInput) + parseInt(totalAmount);

                        // Update the input sum in Firestore
                        inputDocument.set({ inputSum: newInput });
                    } else {
                        // If there is no previous input sum, create a new document with the input value
                        inputDocument.set({ inputSum: totalAmount });
                    }
                });
                // alert(response.razorpay_payment_id);
            },

        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    } catch (error) {
        console.error(error);
    }
}

inputDocument.get().then((doc) => {
    if (doc.exists) {
        const previousInput = doc.data().inputSum;
        creditScoreElement.textContent = "Total Amount Collected:" + previousInput + "Rs";
    }
});

// const db = firebase.firestore();
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

