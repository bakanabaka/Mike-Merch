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

const firebaseConfig2 = {
    apiKey: "AIzaSyCZ6b8o39AriD7cM55SHpYKxohJGg1hkOI",
    authDomain: "admin-8ce61.firebaseapp.com",
    projectId: "admin-8ce61",
    storageBucket: "admin-8ce61.appspot.com",
    messagingSenderId: "637518450545",
    appId: "1:637518450545:web:05bc61cee21e86257630d0",
    measurementId: "G-DQ70SBQ3Z6"
};
var second = firebase.initializeApp(firebaseConfig2, 'secondary');

const db = firebase.firestore();
const storageRef = firebase.storage().ref();
const commentsList = document.getElementById('comments-list');

// Listen for changes in the user's authentication state
db.collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    commentsList.innerHTML = '';
    snapshot.forEach(doc => {
        const comment = doc.data();
        const commentLi = document.createElement('li');
        commentLi.innerHTML = `
        <div class="comments-list">
        <div class="comment-time">
  <div class="comment-names">${comment.name}</div>
  <div class="comment-dates">${new Date(comment.timestamp?.toDate()).toLocaleString()}</div>
</div>
        <br>
        <div>${comment.commentText}</div>
        ${comment.photoUrl ? `<img src="${comment.photoUrl}" alt="Comment photo">` : ''}
        
        <div>
          <button class="delete-comment" data-id="${doc.id}">Delete</button>
          <button class="reply-comment" data-id="${doc.id}">Reply</button>
        </div>
        </div>
      `;
        if (comment.replies) {
            const repliesList = document.createElement('ul');
            repliesList.classList.add('replies-list');
            comment.replies.forEach(reply => {
                const replyLi = document.createElement('li');
                replyLi.innerHTML = `
                <div class="comment">
                <div class="comment-info">${reply.name} - ${new Date(reply.timestamp?.toDate()).toLocaleString()}</div>
            <div class="comment-text">${reply.replyText}</div>
            
            <div>
              <button class="delete-reply" data-comment-id="${doc.id}" data-reply-id="${reply.replyId}">Delete</button>
            </div>
            </div>
          `;
                replyLi.setAttribute('data-reply-id', reply.replyId);
                replyLi.setAttribute('data-user-id', reply.userId);
                repliesList.appendChild(replyLi);
            });
            commentLi.appendChild(repliesList);
        }
        commentsList.appendChild(commentLi);
    });
});

// Resize image to a maximum width and height of 500 pixels
function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
            const max = 500;
            let width = img.width;
            let height = img.height;
            if (width > max || height > max) {
                if (width > height) {
                    height *= max / width;
                    width = max;
                } else {
                    width *= max / height;
                    height = max;
                }
            }
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL());
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// Add comment
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = commentForm.name.value.trim();
    const commentText = commentForm.comment.value.trim();
    const photoFile = commentForm.photo.files[0];
    if (name && commentText) {
        // Upload photo to storage if selected
        if (photoFile) {
            resizeImage(photoFile).then(photoUrl => {
                const photoRef = storageRef.child(`comment-photos/${Date.now()}_${photoFile.name}`);
                photoRef.putString(photoUrl, 'data_url').then(() => {
                    return photoRef.getDownloadURL();
                }).then(photoUrl => {
                    // Add comment with photoUrl to database
                    db.collection('comments').add({
                        name,
                        commentText,
                        photoUrl,
                        userId: firebase.auth().currentUser.uid,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                });
            }).catch(error => {
                console.error(error);
                // Add comment without photo to database
                db.collection('comments').add({
                    name,
                    commentText,
                    userId: firebase.auth().currentUser.uid,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            });
        } else {
            // Add comment without photo to database
            db.collection('comments').add({
                name,
                commentText,
                userId: firebase.auth().currentUser.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        }
        commentForm.reset();
    }
});
const auth = firebase.auth();
const secondAuth = second.auth();
const user = firebase.auth().currentUser;
const user2 = second.auth().currentUser;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        commentsList.addEventListener('click', e => {
            if (e.target.classList.contains('reply-comment')) {
                const commentId = e.target.dataset.id;
                const replyForm = document.createElement('form');
                replyForm.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
        <label for="reply">Reply:</label>
        <textarea class="reply-sub" id="reply" name="reply"></textarea>
        <br>
        <button class="sub-button" type="submit">Post reply</button>
      `;
                e.target.parentElement.appendChild(replyForm);
                replyForm.addEventListener('submit', e => {
                    e.preventDefault();
                    const name = replyForm.name.value.trim();
                    const replyText = replyForm.reply.value.trim();
                    if (name && replyText) {
                        const replyId = `reply-${Date.now()}`;
                        db.collection('comments').doc(commentId).update({
                            replies: firebase.firestore.FieldValue.arrayUnion({
                                name,
                                replyText,
                                timestamp: new Date(),
                                replyId,
                                userId: firebase.auth().currentUser.uid,
                            }),
                        }).then(() => {
                            // Clear existing replies list
                            const repliesList = e.target.closest('li').querySelector('.replies-list');
                            if (repliesList) {
                                repliesList.remove();
                            }
                            // Display updated replies list
                            const commentLi = e.target.closest('li');
                            const replies = commentLi.querySelector('.replies');
                            const repliesUl = document.createElement('ul');
                            repliesUl.classList.add('replies-list');
                            replies.appendChild(repliesUl);
                            db.collection('comments').doc(commentId).get().then(doc => {
                                const commentData = doc.data();
                                if (commentData.replies) {
                                    commentData.replies.forEach(reply => {
                                        const replyLi = document.createElement('li');
                                        replyLi.innerHTML = `
                    
                    <div class="comment-info">${reply.name} - ${new Date(reply.timestamp.toDate()).toLocaleString()}</div>
                    <div>${reply.replyText}</div>
                    <div>
                      <button class="delete-reply" data-comment-id="${commentId}" data-reply-id="${reply.replyId}">Delete</button>
                    </div>
                  `;
                                        replyLi.setAttribute('data-reply-id', reply.replyId);
                                        replyLi.setAttribute('data-user-id', reply.userId);
                                        repliesUl.appendChild(replyLi);
                                    });
                                }
                            });
                        });
                        replyForm.remove();
                    }
                });
            }
            else if (e.target.classList.contains('delete-comment')) {
                // Delete main comment
                const commentId = e.target.dataset.id;
                db.collection('comments').doc(commentId).get().then(doc => {
                    const commentData = doc.data();
                    // Check if authenticated user matches comment user ID
                    if (commentData.userId === auth.currentUser.uid) {
                        db.collection('comments').doc(commentId).delete().then(() => {
                            const commentLi = e.target.closest('li');
                            commentLi.remove();
                            console.log(`Comment with ID ${commentId} deleted from Firestore.`);
                        });
                    } else {
                        alert('Error: You do not have permission to delete this comment.');
                    }
                });
            }
            else if (e.target.classList.contains('delete-reply')) {
                // Delete sub comment
                const commentId = e.target.dataset.commentId;
                const replyId = e.target.dataset.replyId;

                // Get the current user
                const user = firebase.auth().currentUser;

                // Get the comment and check if the user is authorized to delete the sub comment
                db.collection('comments').doc(commentId).get().then(doc => {
                    if (doc.exists) {
                        const comment = doc.data();
                        const replies = comment.replies;

                        // Check if the user is the owner of the comment or the user who posted the sub comment
                        if (user.uid === comment.userId || user.uid === replies.find(reply => reply.replyId === replyId).userId) {
                            const newReplies = replies.filter(reply => reply.replyId !== replyId);
                            db.collection('comments').doc(commentId).update({
                                replies: newReplies
                            }).then(() => {
                                console.log(`Reply ${replyId} deleted successfully`);
                            }).catch(error => {
                                console.error(`Error deleting reply ${replyId}: ${error}`);
                            });
                        } else {
                            // Show an alert message if the user is not authorized to delete the sub comment
                            alert('You are not authorized to delete this sub comment.');
                        }
                    } else {
                        console.error(`Comment ${commentId} does not exist`);
                    }
                }).catch(error => {
                    console.error(`Error getting comment ${commentId}: ${error}`);
                });
            }

        });
    }
});
second.auth().onAuthStateChanged(user => {
    if (user) {
        commentsList.addEventListener('click', e => {
            if (e.target.classList.contains('reply-comment')) {
                const commentId = e.target.dataset.id;
                const replyForm = document.createElement('form');
                replyForm.innerHTML = `
                  <label for="name">Name:</label>
                  <input type="text" id="name" name="name">
                  <label for="reply">Reply:</label>
                  <textarea id="reply" name="reply"></textarea>
                  <label for="image">Image:</label>
                  <input type="file" id="image" name="image">
                  <button type="submit">Post reply</button>
                `;
                e.target.parentElement.appendChild(replyForm);
                replyForm.addEventListener('submit', e => {
                    e.preventDefault();
                    const name = replyForm.name.value.trim();
                    const replyText = replyForm.reply.value.trim();
                    const imageFile = replyForm.image.files[0];
                    if (name && replyText && imageFile) {
                        const storageRef = firebase.storage().ref();
                        const imageName = `${Date.now()}_${imageFile.name}`;
                        const imageRef = storageRef.child(`images/${imageName}`);
                        imageRef.put(imageFile).then(() => {
                            imageRef.getDownloadURL().then(url => {
                                const replyId = `reply-${Date.now()}`;
                                db.collection('comments').doc(commentId).update({
                                    replies: firebase.firestore.FieldValue.arrayUnion({
                                        name,
                                        replyText,
                                        imageUrl: url,
                                        timestamp: new Date(),
                                        replyId,
                                        userId: second.auth().currentUser.uid,
                                    }),
                                }).then(() => {
                                    // Clear existing replies list
                                    const repliesList = e.target.closest('li').querySelector('.replies-list');
                                    if (repliesList) {
                                        repliesList.remove();
                                    }
                                    // Display updated replies list
                                    const commentLi = e.target.closest('li');
                                    const replies = commentLi.querySelector('.replies');
                                    const repliesUl = document.createElement('ul');
                                    repliesUl.classList.add('replies-list');
                                    replies.appendChild(repliesUl);
                                    db.collection('comments').doc(commentId).get().then(doc => {
                                        const commentData = doc.data();
                                        if (commentData.replies) {
                                            commentData.replies.forEach(reply => {
                                                const replyLi = document.createElement('li');
                                                replyLi.innerHTML = `
                                  <div>${reply.replyText}</div>
                                  ${reply.imageUrl ? `<img src="${reply.imageUrl}" alt="Image">` : ''}
                                  <div class="comment-info">${reply.name} - ${new Date(reply.timestamp.toDate()).toLocaleString()}</div>
                                  <div>
                                    <button class="delete-reply" data-comment-id="${commentId}" data-reply-id="${reply.replyId}">Delete</button>
                                  </div>
                                `;
                                                replyLi.setAttribute('data-reply-id', reply.replyId);
                                                replyLi.setAttribute('data-user-id', reply.userId);
                                                repliesUl.appendChild(replyLi);
                                            });
                                        }
                                    }).catch(error => {
                                        console.error(error);
                                    });
                                }).catch(error => {
                                    console.error(error);
                                });
                                replyForm.reset();
                            }).catch(error => {
                                console.error(error);
                            });
                        }).catch(error => {
                            console.error(error);
                        });
                    }
                });
            }

            else if (e.target.classList.contains('delete-comment')) {
                // Delete main comment
                const commentId = e.target.dataset.id;
                db.collection('comments').doc(commentId).get().then(doc => {
                    const commentData = doc.data();
                    // Check if authenticated user matches comment user ID
                    if (second.auth().currentUser.uid) {
                        db.collection('comments').doc(commentId).delete().then(() => {
                            const commentLi = e.target.closest('li');
                            commentLi.remove();
                            console.log(`Comment with ID ${commentId} deleted from Firestore.`);
                        });
                    } else {
                        alert('Error: You do not have permission to delete this comment.');
                    }
                });
            }
            else if (e.target.classList.contains('delete-reply')) {
                // Delete sub comment
                const commentId = e.target.dataset.commentId;
                const replyId = e.target.dataset.replyId;

                // Get the current user
                const user = second.auth().currentUser;

                // Get the comment and check if the user is authorized to delete the sub comment
                db.collection('comments').doc(commentId).get().then(doc => {
                    if (doc.exists) {
                        const comment = doc.data();
                        const replies = comment.replies;

                        // Check if the user is the owner of the comment or the user who posted the sub comment
                        if (second.auth().currentUser.uid) {
                            const newReplies = replies.filter(reply => reply.replyId !== replyId);
                            db.collection('comments').doc(commentId).update({
                                replies: newReplies
                            }).then(() => {
                                console.log(`Reply ${replyId} deleted successfully`);
                            }).catch(error => {
                                console.error(`Error deleting reply ${replyId}: ${error}`);
                            });
                        } else {
                            // Show an alert message if the user is not authorized to delete the sub comment
                            alert('You are not authorized to delete this sub comment.');
                        }
                    } else {
                        console.error(`Comment ${commentId} does not exist`);
                    }
                }).catch(error => {
                    console.error(`Error getting comment ${commentId}: ${error}`);
                });
            }
        });
    }
});


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

