let products = {
    data: [
        {
            productName: "HOW DO I WASH NIKE DRI-FIT",
            category: "Topwear",
            price: "Wash Nike Dri-FIT clothes according to the instructions on the item's care label. Here are our general washing recommendations: Machine wash inside-out in cold water with like colours. Use powdere ...",
            image: "white-tshirt.jpg",
        },
        {
            productName: "WHAT IS NIKE DRI-FIT?",
            category: "Bottomwear",
            price: "Nike Dri-FIT Technology is an innovative polyester fabric designed to help keep you dry so you can more comfortably work harder for longer. Dri-FIT's unique high-performance microfibre construction sup ...",
            image: "short-skirt.jpg",
        },
        {
            productName: "DO NIKE SHOES HAVE A WARRANTY?",
            category: "Watch",
            price: "We stand behind all of our shoes and gear. If your Nike shoes or apparel have a material or workmanship fault, we want to make it right and get you back in the game. Please refer to your method of purc ...",
            image: "sporty-smartwatch.jpg",
        },
        {
            productName: "WHAT IS NIKE FIT?",
            category: "Topwear",
            price: "Nike Fit is a tool to help you find your ideal size across most Nike shoe styles. Because not all shoes are built the same, your size will likely vary across different styles. That's where Nike Fit can ...",
            image: "knitted-top.jpg",
        },
        {
            productName: "WHAT IS NIKE AIR?",
            category: "Jacket",
            price: "Nike Air is our iconic innovation that uses pressurised air in a durable, flexible membrane to provide lightweight cushioning. The air compresses on impact and then immediately returns to its original ...",
            image: "black-leather-jacket.jpg",
        },
        {
            productName: "WHAT IS NIKE BY YOU?",
            category: "Bottomwear",
            price: "With Nike By You, you can customise Nike shoes and let your imagination run wild. There are three ways to create your one-of-a-kind shoe: Visit Nike By You to see the styles you can customise (inclu ...",
            image: "pink-trousers.jpg",
        },
        {
            productName: "NIKE ADAPT LACE-ENGINE COMPONENTS",
            category: "Jacket",
            price: "MOTION SENSING ACCELEROMETER AND GYROSCOPE These MEMs sensors can detect motion and the orientation of the shoe. Nike currently uses these to determine the shoes' position for the auto-lace feature. ...",
            image: "brown-jacket.jpg",
        },
        {
            productName: "WHERE IS MY NIKE ORDER?",
            category: "Bottomwear",
            price: "The most accurate and current information for your Nike order is always available at Nike.com/orders. To check your order status, you'll need your order number and email address. Nike Members can also ...",
            image: "comfy-gray-pants.jpg",
        },
        {
            productName: "WHERE IS MY REFUND?",
            category: "Bottomwear",
            price: "Once we've received your items at our return centre, we'll process your return and issue a refund to your original form of payment, usually within four working days. We'll send you an email to let you ...",
            image: "comfy-gray-pants.jpg",
        }
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
    //container
    let container = document.createElement("div");
    container.classList.add("container");
    //product name
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //price
    let price = document.createElement("p");
    price.innerText = "" + i.price;
    container.appendChild(price);

    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        //check if value equals innerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
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
        if (value == "all") {
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
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    let option = document.getElementById('option');
    option.style.display = "none";

    //loop through all elements
    elements.forEach((element, index) => {
        //check if text includes the search value
        if (element.innerText.includes(searchInput.toUpperCase())) {
            //display matching card
            cards[index].classList.remove("hide");
        } else {
            //hide others
            cards[index].classList.add("hide");
        }
    });
});
