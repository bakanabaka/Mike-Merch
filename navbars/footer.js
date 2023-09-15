
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

