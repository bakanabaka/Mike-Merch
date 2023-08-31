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


const API_KEY = "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"
const submitIcon = document.querySelector("#submit-icon")
const inputElement = document.querySelector("#input-id")
const imageSection = document.querySelector(".images-section")
const storage = firebase.storage();
const storageRef = storage.ref();
const db = firebase.firestore();
const saveButton = document.getElementById('boos');

let clickCount = 0;
inputElement.addEventListener("click", function () {
    clickCount++;
    if (clickCount === 2) {
        location.reload();
    }
});
const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "prompt": inputElement.value,
            "n": 1,
            "size": "1024x1024"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options)
        const data = await response.json()
        console.log(data)
        for (const imageObject of data.data) {
            const ImageContainer = document.createElement('div')
            ImageContainer.classList.add('image-container')
            const imageElement = document.createElement('img')
            imageElement.setAttribute('src', imageObject.url)
            ImageContainer.append(imageElement)
            imageSection.append(ImageContainer)
        }
    } catch (error) {
        console.error(error)
    }
}

submitIcon.addEventListener('click', getImages);

const saveImage = async () => {
    const currentUser = firebase.auth().currentUser;
    const userId = currentUser.uid;
    const imageName = `${Date.now()}.png`;
    const imageRef = db.collection("users").doc(userId).collection("images").doc("userimg");
    const imageElement = document.querySelector('.image-container img');
    if (imageElement) {
        const imageMetadata = {
            name: imageName,
            url: imageElement.src,
            createdAt: new Date(),
        };
        const existingImage = await imageRef.get();
        if (existingImage.exists) {
            await imageRef.update(imageMetadata);
        } else {
            await imageRef.set(imageMetadata);
        }
        alert("Image saved successfully!");
        window.location.href = "../useracc/account.html";
    } else {
        alert("No image found to save!");
    }
}

saveButton.addEventListener('click', saveImage);

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

