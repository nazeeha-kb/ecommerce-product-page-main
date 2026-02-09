const cartBtn = document.getElementById("cart-btn");
const basket = document.getElementById("basket");

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const overlay = document.getElementById("overlay");

const carouselSlides = document.querySelectorAll("#carousel-slide");
const carouselButtons = document.querySelectorAll("#carousel-btn");

// items counter
const itemsCounter = document.getElementById("items-counter");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const count = document.getElementById("count");

// Add to cart 
const form = document.getElementById("form");
const addToCartBtn = document.getElementById("add-to-cart");
const emptyCartMsg = document.getElementById("empty-cart");

const cartDetails = document.getElementById("cart-details");
const numOfItems = document.getElementById("num-of-items");
const total = document.getElementById("total");

const cartBadge = document.getElementById("cart-badge");

// delete item from cart
const deleteItemBtn = document.getElementById("delete-item")


// Menu toggle

menuBtn.addEventListener("click", () => {
    handleMenuToggle();
})

const setInert = (el, inert) => {
    if (!el) return;

    // check if browser supports native API
    if ('inert' in HTMLElement.prototype) {
        // set the native property to true/false - the subtree becomes non-interactive
        el.inert = inert;
    } else {
        // polyfill listens for attribute changes
        if (inert) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
    }

    el.setAttribute('aria-hidden', inert ? 'true' : 'false');
};

const handleMenuToggle = () => {

    // change icon for collapse / expand
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-xmark");

    // toggle translate-x, visible / not visible
    menu.classList.toggle("-translate-x-full")
    overlay.classList.toggle("hidden")

    if (menuBtn.getAttribute("aria-expanded") == "false") {

        // if collapsed expand
        console.log("expanded")
        setInert(menu, false);
        menuBtn.setAttribute("aria-expanded", "true");

    }
    else {

        // if expanded collapse
        console.log("collapsed")
        setInert(menu, true);
        menuBtn.setAttribute("aria-expanded", "false");
    }

}
// Cart toggle

cartBtn.addEventListener("click", (e) => {
    handleCartToggle();
})

const handleCartToggle = () => {

    cartBtn.classList.toggle("text-black");
    cartBtn.classList.toggle("text-cust-graysish-blue-800");

    if (cartBtn.getAttribute("aria-expanded") == "false") {
        cartBtn.setAttribute("aria-expanded", "true")
        basket.show()
    }
    else {
        cartBtn.setAttribute("aria-expanded", "false")
        basket.close()
    }

}

// Close cart and menu on outside click
document.addEventListener("click", (e) => {
    // menu
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnMenuIcon = menuIcon.contains(e.target);

    // cart
    const isClickInsideCart = basket.contains(e.target);
    const isClickOnBtn = cartBtn.contains(e.target);

    if (!isClickInsideCart && !isClickOnBtn && cartBtn.getAttribute("aria-expanded") === "true") {
        handleCartToggle();
    }

    if (!isClickInsideMenu && !isClickOnMenuIcon && menuBtn.getAttribute("aria-expanded") === "true") {
        handleMenuToggle();
    }
});

// carousel slide logic
carouselButtons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");

        // [...slides.children] converts this to array
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        console.log(newIndex)

        // looping
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

// Items counter logic

plusBtn.addEventListener("click", () => addCount())
minusBtn.addEventListener("click", () => minusCount())

const addCount = () => {
    let currCount = Number(count.innerHTML);
    count.innerHTML = `${currCount + 1}`
}
const minusCount = () => {
    let currCount = Number(count.innerHTML);
    if (currCount > 0) {
        count.innerHTML = `${currCount - 1}`
    }
}

// Add to cart
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addToCart()
    resetForm()
})

const addToCart = () => {
    const currCount = Number(count.innerHTML)

    if (currCount == 0) {
        emptyCartMsg.classList.add("flex");
        emptyCartMsg.classList.remove("hidden");
        cartDetails.classList.add("hidden")
        cartBadge.classList.add("hidden")
    }
    else {
        emptyCartMsg.classList.remove("flex");
        emptyCartMsg.classList.add("hidden");
        cartDetails.classList.remove("hidden")
        cartBadge.classList.remove("hidden");

        numOfItems.innerHTML = `${currCount}`;
        total.innerHTML = `$${currCount * 125}`
        cartBadge.innerHTML = `${currCount}`
    }

}

const resetForm = () => {
    count.innerHTML = `0`
}

// Delete item from cart

deleteItemBtn.addEventListener("click", () => {
    emptyCartMsg.classList.add("flex");
    emptyCartMsg.classList.remove("hidden");
    cartDetails.classList.add("hidden")
    cartBadge.classList.add("hidden")
})