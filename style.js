let products = {
    data: [
        {
            productName: "Regular White T-Shirt",
            category: "Topwear",
            price: "30",
            size: "M",
            color: "White",
            gender: "Men",
            brand: "Sidemen",
            image: "white-tshirt.jpg",
            url: "item_info.html",
        },
        {
            productName: "Beige Short Skirt",
            category: "Bottomwear",
            price: "49",
            size: "M",
            color: "Black",
            gender: "Men",
            brand: "Logang",
            image: "images/card1.jpg",
            url: "item_info.html",
        },
        {
            productName: "Sporty SmartWatch",
            category: "Watch",
            price: "99",
            size: "L",
            color: "White",
            gender: "Women",
            brand: "Sidemen",
            image: "sporty-smartwatch.jpg",
            url: "item_info.html",
        },
        {
            productName: "Basic Knitted Top",
            category: "Topwear",
            price: "29",
            size: "L",
            color: "Green",
            gender: "Women",
            image: "images/card10.jpg",
            url: "item_info.html",
        },
        {
            productName: "Black Leather Jackets",
            category: "Jacket",
            price: "129",
            image: "black-leather-jacket.jpg",
        },
        {
            productName: "Stylish Pink Trousers",
            category: "Bottomwear",
            price: "89",
            image: "pink-trousers.jpg",
        },
        {
            productName: "Brown Men's Jacket",
            category: "Jacket",
            price: "189",
            image: "brown-jacket.jpg",
        },
        {
            productName: "Comfy Gray Pants",
            category: "Bottomwear",
            price: "49",
            image: "images/card8.jpg",
        },
    ],
};

for (let i of products.data) {
    //Create Card
    let card = document.createElement("div");
    //Card should have category and should stay hidden initially
    card.classList.add("card", i.category, "hide");
    //image div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    //img tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    card.onclick = function () {
        window.location.href = i.url;
    };

    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //price
    let price = document.createElement("h6");
    price.innerText = "$" + i.price;
    container.appendChild(price);



    card.appendChild(container);
    card.setAttribute("data-gender", i.gender);
    card.setAttribute("data-color", i.color);
    card.setAttribute("data-size", i.size);
    card.setAttribute("data-brand", i.brand);

    document.getElementById("products").appendChild(card);
}

//parameter passed from button (Parameter same as category)
// function filterProduct(value) {
//     //Button class code
//     let buttons = document.querySelectorAll(".button-value");
//     buttons.forEach((button) => {
//         //check if value equals innerText
//         if (value.toUpperCase() === button.innerText.toUpperCase()) {
//             button.classList.add("active");
//         } else {
//             button.classList.remove("active");
//         }
//     });


//     //select all cards
//     let elements = document.querySelectorAll(".card");
//     //loop through all cards
//     elements.forEach((element) => {
//         //display all cards on 'all' button click
//         if (value === "all") {
//             element.classList.remove("hide");
//         } else {
//             //Check if element contains category class
//             if (element.classList.contains(value)) {
//                 //display element based on category
//                 element.classList.remove("hide");
//             } else {
//                 //hide other elements
//                 element.classList.add("hide");
//             }
//         }
//     });
//     let resultMessage = document.getElementById("result-message");
//     resultMessage.classList.add("hide");
// }

// //Search button click
// document.getElementById("search").addEventListener("click", () => {
//     //initializations
//     let searchInput = document.getElementById("search-input").value;
//     let elements = document.querySelectorAll(".product-name");
//     let cards = document.querySelectorAll(".card");

//     //loop through all elements
//     elements.forEach((element, index) => {
//         //check if text includes the search value
//         if (element.innerText.includes(searchInput.toUpperCase())) {
//             //display matching card
//             cards[index].classList.remove("hide");
//         } else {
//             //hide others
//             cards[index].classList.add("hide");
//         }
//     });
// });



function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        //check if value equals innerText
        if (value.toUpperCase() === button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });


    //select all cards
    let elements = document.querySelectorAll(".card");
    //loop through all cards
    elements.forEach((element) => {
        //display all cards on 'all' button click
        if (value === "all") {
            element.classList.remove("hide");
        } else {
            //Check if element contains category class
            if (element.classList.contains(value)) {
                //display element based on category
                element.classList.remove("hide");
            } else {
                //hide other elements
                element.classList.add("hide");
            }
        }
    });
    // let resultMessage = document.getElementById("result-message");
    // resultMessage.classList.add("hide");
    showResultMessage();
}


function filterProducts() {
    // Get all selected values
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map((checkbox) => checkbox.value);
    const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map((checkbox) => checkbox.value);
    const selectedBrand = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map((checkbox) => checkbox.value);
    // Select all cards
    const elements = document.querySelectorAll('.card');
    var resultMessage = document.getElementById('result-message1');
    let count = 0;

    // Loop through all cards
    elements.forEach((element) => {
        const productColor = element.getAttribute('data-color');
        const productGender = element.dataset.gender;
        const productdBrand = element.dataset.brand;
        // Check if the card's color and gender match any of the selected values
        const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);
        const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(productGender) || (selectedGenders.includes("Men") && selectedGenders.includes("Women") && productGender === "Both");
        const brandMatch = selectedBrand.length === 0 || selectedBrand.includes(productdBrand) || (selectedBrand.includes("Sidemen") && selectedBrand.includes("Logang") && productdBrand === "Both");
        // Display card if it matches the selected values, hide it otherwise
        if (colorMatch && genderMatch && brandMatch) {
            element.classList.remove('hide');
            count++;
        } else {
            element.classList.add('hide');
        }
    });
    // showResultMessage();
    if (count === 0) {
        resultMessage.innerHTML = 'No matching products found.';
    } else {
        resultMessage.innerHTML = `Showing ${count} matching products.`;
    }


}

// Add event listeners to all checkboxes
document.querySelectorAll('input[name="color"], input[name="gender"],input[name="brand"]').forEach((checkbox) => {
    checkbox.addEventListener('change', filterProducts);
});

function showResultMessage() {
    // Get all visible cards
    const visibleCards = Array.from(document.querySelectorAll('.card:not(.hide)'));

    // Get the result message element
    const resultMessage = document.getElementById('result-message1');

    // Show the appropriate message based on the number of visible cards
    if (visibleCards.length === 0) {
        resultMessage.innerHTML = 'No items found.';
    } else if (visibleCards.length === 1) {
        resultMessage.textContent = '1 item found.';
    } else {
        resultMessage.textContent = `${visibleCards.length} items found.`;
    }
}

// function filterGender(checkbox) {
//     let isChecked = checkbox.checked;
//     let elements = document.querySelectorAll(".card");
//     elements.forEach((element) => {
//         if (isChecked && element.getAttribute("data-gender") !== "Men") {
//             element.classList.add("hide");
//         } else {
//             element.classList.remove("hide");
//         }
//     });
// }
// function filterColor(checkbox) {
//     let isChecked = checkbox.checked;
//     let elements = document.querySelectorAll(".card");
//     elements.forEach((element) => {
//         if (isChecked && element.getAttribute("data-color") !== "White") {
//             element.classList.add("hide");
//         } else {
//             element.classList.remove("hide");
//         }
//     });
// }
// function filterProducts() {
//     let genderCheckbox = document.getElementById('mo1');
//     let colorCheckbox = document.getElementById('co1');

//     let isGenderChecked = genderCheckbox.checked;
//     let isColorChecked = colorCheckbox.checked;

//     let elements = document.querySelectorAll(".card");
//     elements.forEach((element) => {
//         let isGenderMatch = true;
//         let isColorMatch = true;

//         if (isGenderChecked && element.getAttribute("data-gender") !== genderCheckbox.value) {
//             isGenderMatch = false;
//         }

//         if (isColorChecked && element.getAttribute("data-color") !== colorCheckbox.value) {
//             isColorMatch = false;
//         }

//         if (isGenderMatch && isColorMatch) {
//             element.classList.remove("hide");
//         } else {
//             element.classList.add("hide");
//         }
//     });
// }
// Function to filter products by gender and color




