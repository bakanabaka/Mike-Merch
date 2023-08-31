

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

var wishlist = [];
var wishlistStorageKey = '';

firebase.auth().onAuthStateChanged(function (user) {
    var user = firebase.auth().currentUser;
    if (user) {
        var userId = user.uid;
        wishlistStorageKey = 'wishlist_' + userId;
        wishlist = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
        console.log(wishlistStorageKey);
    } else {
        wishlistStorageKey = 'wishlist';
        wishlist = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
        console.log(wishlistStorageKey);
    }

    updateWishlist();
});

let wishlistHtml = '';

function updateWishlist() {
    wishlistHtml = '';
    wishlist.forEach((product, index) => {
        const totalPrice = parseFloat(product.price) * (product.quantity || 1);
        wishlistHtml += `
      <div class="wishlist-item">
        <img src="${product.image}" alt="Product Image">
          <p class="wishlist-price">${product.price}</p>
          <p class="wishlist-name">${product.name}</p>
          <p class="wishlist-size">${product.size}</p>
        <div class="wishlist-quantity">
        <input class="wishlist-quantity1" type="number" value="${product.quantity || 1}" min="1" max="10" onchange="updateQuantity(${index}, this.value)">
          <i class="wishlist-delete fa-solid fa-trash" style="font-size:4vh;color:red" onclick="deleteWishlistItem(${index})"></i>
        </div>
        <p class="wishlist-total-price">${totalPrice.toFixed(2)}</p>
      </div>
    `;
    });

    document.getElementById('wishlist').innerHTML = wishlistHtml;
    calculateTotal();
}

function clearWishlistItems() {
    localStorage.removeItem(wishlistStorageKey);
    wishlist = [];
    updateWishlist();
    window.history.replaceState({}, document.title, window.location.pathname);
}

function deleteWishlistItem(index) {
    wishlist.splice(index, 1);
    localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
    updateWishlist();
}

function updateQuantity(index, quantity) {
    wishlist[index].quantity = quantity;
    localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
    calculateTotal();
    updateWishlist();
}

let total;

function calculateTotal() {
    var cartItems = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
    var totalAmount = 0;
    var donation = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        totalAmount += parseFloat(cartItem.price) * (cartItem.quantity || 1);
        donation += (parseFloat(cartItem.price) * (cartItem.quantity || 1)) * 0.05;
    }

    document.getElementById('total-amount-value').innerHTML = 'Rs ' + totalAmount.toFixed(2);
    document.getElementById('donation-amount-value').innerHTML = donation.toFixed(2);
    total = totalAmount;
}

const urlParams = new URLSearchParams(window.location.search);
const result = urlParams.get('result');
document.getElementById('result-display').textContent = result;



const db = firebase.firestore();

// nobut.addEventListener('click', function () {
//     if (total <= 0) {
//         alert("no items in the cart");
//         return;
//     }
// })
// function addWishlistItemToFirestore() {
//     const currentUser = firebase.auth().currentUser;
//     if (!currentUser) {
//         alert("not signed in");
//         return;
//     }
//     const userId = currentUser.uid;
//     const totalAmount = document.getElementById('total-amount-value').innerHTML;
//     const donationAmount = document.getElementById('donation-amount-value').innerHTML;
//     let score;
//     if (result >= 2) {
//         score = 10;
//     }
//     else {
//         score = 0;
//     }

//     db.collection("users").doc(userId).collection("wishlist").doc().set({
//         items: wishlist,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         donation: donationAmount,
//         total: totalAmount,
//         value: score,
//     })
//         .then(() => {
//             alert("For every payment you make 5% off your total amount will be given to charity");
//             localStorage.removeItem("wishlist");
//             wishlist = [];
//             updateWishlist();
//         })
//         .catch((error) => {
//             console.error("Error writing data to Firestore: ", error);
//         });
//     const inputCollection1 = db.collection("credits");
//     const inputDocument1 = inputCollection1.doc(userId);
//     const creditScoreElement = document.getElementById("credit-score");
//     // Get the previous input sum from Firestore
//     inputDocument1.get().then((doc) => {
//         if (doc.exists) {
//             const previousInput = doc.data().credit;
//             const newInput = parseInt(previousInput) + parseInt(score);

//             // Update the input sum in Firestore
//             inputDocument1.set({ credit: newInput });

//             creditScoreElement.textContent = "credit:" + newInput;

//         } else {
//             // If there is no previous input sum, create a new document with the input value
//             inputDocument1.set({ credit: score });
//             creditScoreElement.textContent = "credit:" + score;
//         }
//     });

// }

// document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
// updateWishlist();


const no = document.getElementById('no');
no.addEventListener('click', function () {

    if (total <= 0) {
        alert("no items in the cart")
        return;
    }

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        alert("You are not logged in. Please log in to continue.");
        return;
    }

    const userId = currentUser.uid;
    const inputCollection1 = db.collection("credits");
    const inputDocument1 = inputCollection1.doc(userId);
    const creditScoreElement = document.getElementById("credit-score");

    const addressRef = db.collection("users").doc(userId).collection("address").doc("myAddress");
    addressRef.get().then((addressDoc) => {
        if (!addressDoc.exists) {
            alert("Please provide your address before proceeding.");
            return;
        }
    });
    // if (result >= 2) {
    //     score = 10;
    // }
    // else {
    //     score = 0;
    // }
    // Get the previous input sum from Firestore
    inputDocument1.get().then((doc) => {
        if (doc.exists) {
            const previousInput = doc.data().credit;
            // const newInput = parseInt(previousInput) + parseInt(score);
            // creditScoreElement.textContent = "credit:" + previousInput;
            if (previousInput >= 50) {
                document.getElementById('myBtn1').click();
            } else {
                document.getElementById('credit-no').removeAttribute('disabled');
                document.getElementById('credit-no').click();
            }

        } else {
            creditScoreElement.textContent = "credit:" + score;
        }
    })
    const creditYes = document.getElementById('credit-yes');
    const creditNo = document.getElementById('credit-no');

})

firebase.auth().onAuthStateChanged(function (user) {
    if (user && document.referrer.includes("whac_a_mole/index.html")) {
        const userId = user.uid;
        const inputCollection1 = db.collection("credits");
        const inputDocument1 = inputCollection1.doc(userId);
        const creditScoreElement = document.getElementById("credit-score");
        let score;
        if (result >= 2) {
            score = 10;
        } else {
            score = 0;
        }
        inputDocument1.get().then((doc) => {
            if (doc.exists) {
                const previousInput = doc.data().credit;
                creditScoreElement.textContent = "credit:" + previousInput;
                if (previousInput >= 50) {
                    document.getElementById('myBtn1').click();
                } else {
                    document.getElementById('credit-no').removeAttribute('disabled');
                    document.getElementById('credit-no').click();
                }
            }
        });
    } else {
        console.log("User is not signed in or not coming from whac_a_mole/index.html.");
    }
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user && document.referrer.includes("break_out/index.html")) {
        const userId = user.uid;
        const inputCollection1 = db.collection("credits");
        const inputDocument1 = inputCollection1.doc(userId);
        const creditScoreElement = document.getElementById("credit-score");
        let score;
        if (result == 15) {
            score = 10;
        } else {
            score = 0;
        }
        inputDocument1.get().then((doc) => {
            if (doc.exists) {
                const previousInput = doc.data().credit;
                creditScoreElement.textContent = "credit:" + previousInput;
                if (previousInput >= 50) {
                    document.getElementById('myBtn1').click();
                } else {
                    document.getElementById('credit-no').removeAttribute('disabled');
                    document.getElementById('credit-no').click();
                }
            }
        });
    } else {
        console.log("User is not signed in or not coming from whac_a_mole/index.html.");
    }
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user && document.referrer.includes("rock_paper_scissor/index.html")) {
        const userId = user.uid;
        const inputCollection1 = db.collection("credits");
        const inputDocument1 = inputCollection1.doc(userId);
        const creditScoreElement = document.getElementById("credit-score");
        let score;
        if (result == 5) {
            score = 10;
        } else {
            score = 0;
        }
        // Get the previous input sum from Firestore
        inputDocument1.get().then((doc) => {
            if (doc.exists) {
                const previousInput = doc.data().credit;
                creditScoreElement.textContent = "credit:" + previousInput;
                if (previousInput >= 50) {
                    document.getElementById('myBtn1').click();
                } else {
                    document.getElementById('credit-no').removeAttribute('disabled');
                    document.getElementById('credit-no').click();
                }
            }
        });
    } else {
        console.log("User is not signed in or not coming from whac-a-mole/index.html.");
    }
});
firebase.auth().onAuthStateChanged(function (user) {
    if (user && document.referrer.includes("space_invaders/index.html")) {
        const userId = user.uid;
        const inputCollection1 = db.collection("credits");
        const inputDocument1 = inputCollection1.doc(userId);
        const creditScoreElement = document.getElementById("credit-score");
        let score;
        if (result == 5) {
            score = 10;
        } else {
            score = 0;
        }
        // Get the previous input sum from Firestore
        inputDocument1.get().then((doc) => {
            if (doc.exists) {
                const previousInput = doc.data().credit;
                creditScoreElement.textContent = "credit:" + previousInput;
                if (previousInput >= 50) {
                    document.getElementById('myBtn1').click();
                } else {
                    document.getElementById('credit-no').removeAttribute('disabled');
                    document.getElementById('credit-no').click();
                }
            }
        });
    } else {
        console.log("User is not signed in or not coming from whac-a-mole/index.html.");
    }
});


document.getElementById('credit-no').onclick = async function (e) {
    e.preventDefault();
    var cartItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    var totalAmount = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        totalAmount += parseFloat(cartItem.price) * (cartItem.quantity || 1);
    }
    try {
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
            "key": "rzp_test_vX3Y8QX16DXiF7",
            "amount": totalAmount * 100,
            "currency": "INR",
            "order_id": orderData.id,
            handler: async function (response) {
                // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
                const currentUser = firebase.auth().currentUser;
                if (!currentUser) {
                    alert("not signed in");
                    return;
                }
                const userId = currentUser.uid;
                const totalAmount = document.getElementById('total-amount-value').innerHTML;
                const donationAmount = document.getElementById('donation-amount-value').innerHTML;
                let score;
                if (result >= 2) {
                    score = 10;
                }
                else {
                    score = 0;
                }

                db.collection("users").doc(userId).collection("wishlist").doc().set({
                    items: wishlist,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    donation: donationAmount,
                    total: totalAmount,
                    value: score,
                })
                    .then(() => {
                        alert("For every payment you make 5% off your total amount will be given to charity");
                        localStorage.removeItem("wishlist");
                        wishlist = [];
                        updateWishlist();
                    })
                    .catch((error) => {
                        console.error("Error writing data to Firestore: ", error);
                    });
                const inputCollection1 = db.collection("credits");
                const inputDocument1 = inputCollection1.doc(userId);
                const creditScoreElement = document.getElementById("credit-score");
                inputDocument1.get().then((doc) => {
                    if (doc.exists) {
                        const previousInput = doc.data().credit;
                        const newInput = parseInt(previousInput) + parseInt(score);
                        inputDocument1.set({ credit: newInput });
                        creditScoreElement.textContent = "credit:" + newInput;
                    } else {
                        inputDocument1.set({ credit: score });
                        creditScoreElement.textContent = "credit:" + score;
                    }
                });
                const inputCollection = db.collection("donations");
                const inputDocument = inputCollection.doc("donations-document");
                const inputNumber = document.getElementById("donation-amount-value").innerHTML;
                inputDocument.get().then((doc) => {
                    if (doc.exists) {
                        const previousInput = doc.data().inputSum;
                        const newInput = parseInt(previousInput) + parseInt(inputNumber);
                        inputDocument.set({ inputSum: newInput });
                    } else {
                        inputDocument.set({ inputSum: inputNumber });
                    }
                });
                const subscriptionSnapshot = await db.collection("subscribe").doc(userId).get();
                if (subscriptionSnapshot.exists) {
                    alert("Delivery free");
                }
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

document.getElementById('credit-yes').onclick = async function (e) {
    let amt;
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const userId = currentUser.uid;
        const inputCollection1 = db.collection("credits");
        const inputDocument1 = inputCollection1.doc(userId);
        const creditScoreElement = document.getElementById("credit-score");
        inputDocument1.get().then((doc) => {
            if (doc.exists) {
                const previousInput = doc.data().credit;
                creditScoreElement.textContent = "credit:" + previousInput;
                if (previousInput > 50) {
                    amt = 0.95

                } else {
                    amt = 0;
                }
            }
        });
    } else {
        console.log("User is not signed in.");
    }
    e.preventDefault();
    var cartItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    var totalAmount = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        totalAmount += parseFloat(cartItem.price) * (cartItem.quantity || 1);
    }

    let response = await fetch("http://localhost:3000/payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: totalAmount * 0.95,
        })
    })
    let orderData = await response.json();
    console.log(orderData);



    var options = {
        "key": "rzp_test_vX3Y8QX16DXiF7",
        "amount": totalAmount * 95,
        "order_id": orderData.id,
        handler: function (response) {
            // document.getElementById('rzp-button1').addEventListener('click', addWishlistItemToFirestore);
            const currentUser = firebase.auth().currentUser;
            if (!currentUser) {
                alert("not signed in");
                return;
            }
            const userId = currentUser.uid;
            const totalAmount = document.getElementById('total-amount-value').innerHTML;
            const donationAmount = document.getElementById('donation-amount-value').innerHTML;
            let score;
            if (result >= 2) {
                score = 10;
            }
            else {
                score = 0;
            }

            db.collection("users").doc(userId).collection("wishlist").doc().set({
                items: wishlist,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                donation: donationAmount,
                total: totalAmount,
                value: score,
            })
                .then(() => {
                    alert("For every payment you make 5% off your total amount will be given to charity");
                    localStorage.removeItem("wishlist");
                    wishlist = [];
                    updateWishlist();
                })
                .catch((error) => {
                    console.error("Error writing data to Firestore: ", error);
                });
            const inputCollection1 = db.collection("credits");
            const inputDocument1 = inputCollection1.doc(userId);
            const creditScoreElement = document.getElementById("credit-score");
            // Get the previous input sum from Firestore
            inputDocument1.get().then((doc) => {
                if (doc.exists) {
                    const previousInput = doc.data().credit;
                    const newInput = parseInt(previousInput) + parseInt(score);
                    inputDocument1.set({ credit: newInput - 50 });
                    creditScoreElement.textContent = "credit:" + newInput;
                } else {
                    inputDocument1.set({ credit: score });
                    creditScoreElement.textContent = "credit:" + score;
                }
            });
            const inputCollection = db.collection("donations");
            const inputDocument = inputCollection.doc("donations-document");
            const inputNumber = document.getElementById("donation-amount-value").innerHTML;
            inputDocument.get().then((doc) => {
                if (doc.exists) {
                    const previousInput = doc.data().inputSum;
                    const newInput = parseInt(previousInput) + parseInt(inputNumber);
                    inputDocument.set({ inputSum: newInput });
                } else {
                    inputDocument.set({ inputSum: inputNumber });
                }
            });
            // alert(response.razorpay_payment_id);
            document.getElementById("result-display").innerHTML = "0";
            window.history.replaceState({}, document.title, window.location.pathname);
            const subscriptionSnapshot = db.collection("subscribe").doc(userId).get();
            if (subscriptionSnapshot.exists) {
                alert("Delivery free");
            }


        },

    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
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

