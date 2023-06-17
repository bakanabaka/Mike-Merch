// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDdIwSsdQ-29jfyA6IfV5U-8SSmA-7iVM",
    authDomain: "pommy-a7657.firebaseapp.com",
    projectId: "pommy-a7657",
    storageBucket: "pommy-a7657.appspot.com",
    messagingSenderId: "404036371992",
    appId: "1:404036371992:web:a040d94f696e6dbc7ce56d",
    measurementId: "G-B02R9C6K2M"
};

firebase.initializeApp(firebaseConfig);

// Get the data list element
var dataList = document.getElementById("data-list");

// Get a reference to the Firebase Realtime Database
var db = firebase.database();

// Get a reference to the data to display
var dataRef = db.ref("users");

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
        listItem.textContent = data.Name + "  " + data.Comments + " ";


        // Add the list item to the data list
        dataList.appendChild(listItem);
    });
});