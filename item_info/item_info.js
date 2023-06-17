// // Initialize Firebase
// var firebaseConfig = {
//     apiKey: "AIzaSyBDdIwSsdQ-29jfyA6IfV5U-8SSmA-7iVM",
//     authDomain: "pommy-a7657.firebaseapp.com",
//     projectId: "pommy-a7657",
//     storageBucket: "pommy-a7657.appspot.com",
//     messagingSenderId: "404036371992",
//     appId: "1:404036371992:web:a040d94f696e6dbc7ce56d",
//     measurementId: "G-B02R9C6K2M"
// };

// firebase.initializeApp(firebaseConfig);


// // Get a reference to the Firebase database
// var database = firebase.database();

// // Listen for form submission
// document.getElementById('mine').addEventListener('submit', function (event) {
//     // event.preventDefault(); // Prevent the form from refreshing the page

//     // Get the values from the form input fields
//     var first = document.getElementById('name').value;
//     var last = document.getElementById('area').value;
//     // Store the first name and last name in the Firebase database
//     database.ref('shoe').push({
//         Name: first,
//         User_comments: last
//     }, function (error) {
//         if (error) {
//             console.log('Data could not be saved.' + error);
//         } else {
//             console.log('Data saved successfully.');
//             window.location = 'index1.html';
//         }
//     });

//     // Clear the input fields
//     document.getElementById('name').value = '';
//     document.getElementById('area').value = '';
// });

// Initialize Firebase
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

const sizeButtons = document.querySelectorAll('.but2');
let selectedSizeButton = null;

firebase.auth().onAuthStateChanged(function (user) {
    var user = firebase.auth().currentUser;

    // Check if a user is currently authenticated
    if (user) {
        // User is signed in, retrieve their unique ID
        var userId = user.uid;

        // Use the user ID to create separate local storage for each user
        var wishlistStorageKey = 'wishlist_' + userId;
        var favoritesStorageKey = 'favorites_' + userId;
        var wishlist = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
        var favorites = JSON.parse(localStorage.getItem(favoritesStorageKey)) || [];
        console.log(wishlistStorageKey);
    } else {
        // No user is signed in, use a default local storage key
        var wishlistStorageKey = 'wishlist';
        var favoritesStorageKey = 'favorites';
        var wishlist = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
        var favorites = JSON.parse(localStorage.getItem(favoritesStorageKey)) || [];
        console.log(wishlistStorageKey);
    }

    sizeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove the "selected" class from all buttons
            sizeButtons.forEach(button => {
                button.classList.remove('selected');
            });

            // Add the "selected" class to the clicked button
            button.classList.add('selected');
            selectedSizeButton = button;

            // Set the selected size to the Add To WishList button
            const addToWishlistButton = document.querySelector('.add-to-wishlist');
            const addToFavoritesButton = document.querySelector('.fav');
            addToWishlistButton.setAttribute('data-size', button.getAttribute('data-size'));
            addToFavoritesButton.setAttribute('data-size', button.getAttribute('data-size'));
        });
    });
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedSize = this.getAttribute('data-size');

            if (!selectedSize) {
                alert('Please select a size before adding to the wishlist!');
                return;
            }
            const product = {
                image: this.getAttribute('data-image'),
                price: this.getAttribute('data-price'),
                name: this.getAttribute('data-name'),
                size: this.getAttribute('data-size')
            };

            let wishlist = JSON.parse(localStorage.getItem(wishlistStorageKey)) || [];
            let productExists = false;
            wishlist.forEach(item => {
                if (item.name === product.name && item.size === product.size) {
                    productExists = true;
                    alert('Item is already present in the wishlist!');
                    window.location.href = '../nani.html';
                }
            });

            if (productExists === false) {
                wishlist.push(product);
                localStorage.setItem(wishlistStorageKey, JSON.stringify(wishlist));
                window.location.href = '../nani.html';
            }
        });
    });
    const addToFavoritesButtons = document.querySelectorAll('.fav');
    addToFavoritesButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedSize = this.getAttribute('data-size');

            if (!selectedSize) {
                alert('Please select a size before adding to the wishlist!');
                return;
            }
            const product = {
                image: button.getAttribute('data-image'),
                price: button.getAttribute('data-price'),
                name: button.getAttribute('data-name'),
                size: button.getAttribute('data-size')
            };

            let favorites = JSON.parse(localStorage.getItem(favoritesStorageKey)) || [];
            let productExists = false;
            favorites.forEach(item => {
                if (item.name === product.name && item.size === product.size) {
                    productExists = true;
                    alert('Item is already present in favorites!');
                    window.location.href = '../favourite.html';
                }
            });

            if (productExists === false) {
                favorites.push(product);
                localStorage.setItem(favoritesStorageKey, JSON.stringify(favorites));
                alert('Item added to favorites!');
                window.location.href = '../favourite.html';
            }
        });
    });
});

var dataList = document.getElementById("data-list");
// Get a reference to the Firebase database
var database = firebase.database();

// Listen for form submission
document.getElementById('my-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the values from the form input fields
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('text-box').value;

    // Store the first name and last name in the Firebase database
    database.ref('shoe1').push({
        Name: firstName,
        Comments: lastName
    }, function (error) {
        if (error) {
            console.log('Data could not be saved.' + error);
        } else {
            console.log('Data saved successfully.');
            window.location = 'item_info.html';
        }
    });

    // Clear the input fields
    document.getElementById('fname').value = '';
    document.getElementById('text-box').value = '';
});


var db = firebase.database();

var dataRef = db.ref("shoe1").orderByChild("fname").limitToLast(3);

// Attach a listener to the data reference
dataRef.on("value", function (snapshot) {
    // Clear the data list
    dataList.innerHTML = "";

    // Loop through the child nodes of the snapshot
    snapshot.forEach(function (childSnapshot) {
        // Get the data object from the child snapshot
        var data = childSnapshot.val();

        // Create a new list item element with the data
        var listItem = document.createElement("li");
        var list = document.createElement("p");
        listItem.textContent = data.Name + " [ " + data.Comments + " ]";

        // Add the list item to the data list
        dataList.appendChild(listItem);
    });
});

const db1 = firebase.firestore();
const auth = firebase.auth();
// const database = firebase.database();
// Attach click event listener to the logout button



firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
        // User is signed in.
        const currentUser = firebase.auth().currentUser;
        const userId = currentUser.uid;
        const imageRef = db1.collection("users").doc(userId).collection("images").doc("userimg");
        const imageDoc = await imageRef.get();
        if (imageDoc.exists) {
            const imageUrl = imageDoc.data().url;
            const userPicElement = document.getElementById("nav-img");
            userPicElement.src = imageUrl;
            console.log("image exists")
        }
        db1.collection("users").doc(userId).collection("Personal Info").doc("myInfo").get().then((doc) => {
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

