let products = {
    data: [
        {
            productName: "HOW DO I WASH Mike DRI-FIT",
            category: "Topwear",
            price: "Wash Mike Dri-FIT clothes according to the instructions on the item's care label. Here are our general washing recommendations: Machine wash inside-out in cold water with like colours. Use powdere ...",
            image: "white-tshirt.jpg",
        },
        {
            productName: "WHAT IS Mike DRI-FIT?",
            category: "Bottomwear",
            price: "Mike Dri-FIT Technology is an innovative polyester fabric designed to help keep you dry so you can more comfortably work harder for longer. Dri-FIT's unique high-performance microfibre construction sup ...",
            image: "short-skirt.jpg",
        },
        {
            productName: "DO Mike SHOES HAVE A WARRANTY?",
            category: "Watch",
            price: "We stand behind all of our shoes and gear. If your Mike shoes or apparel have a material or workmanship fault, we want to make it right and get you back in the game. Please refer to your method of purc ...",
            image: "sporty-smartwatch.jpg",
        },
        {
            productName: "WHAT IS Mike FIT?",
            category: "Topwear",
            price: "Mike Fit is a tool to help you find your ideal size across most Mike shoe styles. Because not all shoes are built the same, your size will likely vary across different styles. That's where Mike Fit can ...",
            image: "knitted-top.jpg",
        },
        {
            productName: "WHAT IS Mike AIR?",
            category: "Jacket",
            price: "Mike Air is our iconic innovation that uses pressurised air in a durable, flexible membrane to provide lightweight cushioning. The air compresses on impact and then immediately returns to its original ...",
            image: "black-leather-jacket.jpg",
        },
        {
            productName: "WHAT IS Mike BY YOU?",
            category: "Bottomwear",
            price: "With Mike By You, you can customise Mike shoes and let your imagination run wild. There are three ways to create your one-of-a-kind shoe: Visit Mike By You to see the styles you can customise (inclu ...",
            image: "pink-trousers.jpg",
        },
        {
            productName: "Mike ADAPT LACE-ENGINE COMPONENTS",
            category: "Jacket",
            price: "MOTION SENSING ACCELEROMETER AND GYROSCOPE These MEMs sensors can detect motion and the orientation of the shoe. Mike currently uses these to determine the shoes' position for the auto-lace feature. ...",
            image: "brown-jacket.jpg",
        },
        {
            productName: "WHERE IS MY Mike ORDER?",
            category: "Bottomwear",
            price: "The most accurate and current information for your Mike order is always available at mike-merch.onrender.com . To check your order status, you'll need your order number and email address. Mike Members can also ...",
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
    let card = document.createElement("div");
    card.classList.add("card", i.category, "hide");
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    let container = document.createElement("div");
    container.classList.add("container");
    let name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    let price = document.createElement("p");
    price.innerText = "" + i.price;
    container.appendChild(price);

    card.appendChild(container);
    document.getElementById("products").appendChild(card);
}

function filterProduct(value) {
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
    let elements = document.querySelectorAll(".card");
    elements.forEach((element) => {
        if (value == "all") {
            element.classList.remove("hide");
        } else {

            if (element.classList.contains(value)) {
                element.classList.remove("hide");
            } else {
                element.classList.add("hide");
            }
        }
    });
}

document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
    let option = document.getElementById('option');
    option.style.display = "none";

    elements.forEach((element, index) => {
        if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    });
});
