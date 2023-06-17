
var firebaseConfig = {
    apiKey: "AIzaSyCg-ZAr4ZZGSdhlL4glAqWVcL522J7tEDg",
    authDomain: "prak-1cab8.firebaseapp.com",
    databaseURL: "https://prak-1cab8-default-rtdb.firebaseio.com",
    projectId: "prak-1cab8",
    storageBucket: "prak-1cab8.appspot.com",
    messagingSenderId: "937939720138",
    appId: "1:937939720138:web:220ab1b401824c0f396133",
    measurementId: "G-EWZ9NTMN3G"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const database = firebase.database();
// Attach click event listener to the logout button

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

