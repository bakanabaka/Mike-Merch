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
var dataList = document.getElementById("data-list");
var db = firebase.database();


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