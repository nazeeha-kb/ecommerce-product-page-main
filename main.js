const cartBtn = document.getElementById("cart-btn");
const basket = document.getElementById("basket");

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const overlay = document.getElementById("overlay");

// Carousel
const carouselSlides = document.querySelectorAll("#carousel-slide");
const carouselButtons = document.querySelectorAll("#carousel-btn");
const carousel = document.querySelector("[data-carousel]")

// Carousel - thumnail navigation
const caraThumbnailButtons = document.querySelectorAll("#cara-nav-btn-thumbnail")
const caraThumbnailContainer = document.getElementById("cara-thumbnail-container")

// Lightbox
const lightboxSlides = document.querySelectorAll("#lightbox-slide");
const lightboxButtons = document.querySelectorAll("#lightbox-btn");
const lightbox = document.querySelector("[data-lightbox]")
const lightboxParent = document.getElementById("lightbox")

// lightbox - thumnail navigation
const lightThumbnailButtons = document.querySelectorAll("#light-nav-btn-thumbnail")
const lightThumbnailContainer = document.getElementById("light-thumbnail-container")

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

// carousel slide logic
carouselButtons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
        const slideContainer = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slideContainer.querySelector("[data-active]");

        // [...slides.children] converts this to array
        let newIndex = [...slideContainer.children].indexOf(activeSlide) + offset;
        // looping
        if (newIndex < 0) newIndex = slideContainer.children.length - 1
        if (newIndex >= slideContainer.children.length) newIndex = 0

        slideContainer.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
    })
})

// Lightbox slide logic

lightboxButtons.forEach(button => {
    button.addEventListener("click", () => {

        const offset = button.dataset.lightboxButton === 'next' ? 1 : -1;
        const slideContainer = button.closest("[data-lightbox]").querySelector("[data-slides]");
        const activeSlide = slideContainer.querySelector("[data-active]");

        // [...slides.children] converts this to array
        let newIndex = [...slideContainer.children].indexOf(activeSlide) + offset;

        // looping
        if (newIndex < 0) newIndex = slideContainer.children.length - 1
        if (newIndex >= slideContainer.children.length) newIndex = 0

        slideContainer.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active

        // Active thumbnail change

        const activeButton = lightThumbnailContainer.querySelector("[data-active]")
        delete activeButton.dataset.active

        let thumbnailIndex = [...lightThumbnailContainer.children].indexOf(activeSlide) + offset;

        // looping
        if (thumbnailIndex < 0) thumbnailIndex = slideContainer.children.length - 1
        if (thumbnailIndex >= slideContainer.children.length) thumbnailIndex = 0

        lightThumbnailContainer.children[newIndex].dataset.active = true
    })
})


// thumbnail button carousel navigation.

caraThumbnailButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        // keep dataset same like data.sno="1" for both the slide and thumbnail and navigate leveraging that
        // if the clicked button's id is 1, let [data-active] be true for slide with id="1"
        // no slide has [data-active]
        const slideContainer = carousel.querySelector("[data-slides]");
        const activeSlide = slideContainer.querySelector("[data-active]");
        delete activeSlide.dataset.active
        const activeButton = caraThumbnailContainer.querySelector("[data-active]")
        delete activeButton.dataset.active

        // Select the right slide
        carouselSlides[i].dataset.active = true;
        button.dataset.active = true;
    })
})

// Lightbox button carousel navigation.

lightThumbnailButtons.forEach((button, i) => {
    button.addEventListener("click", () => {
        // keep dataset same like data.sno="1" for both the slide and thumbnail and navigate leveraging that
        // if the clicked button's id is 1, let [data-active] be true for slide with id="1"
        // no slide has [data-active]
        const slideContainer = lightbox.querySelector("[data-slides]");
        const activeSlide = slideContainer.querySelector("[data-active]");
        delete activeSlide.dataset.active
        const activeButton = lightThumbnailContainer.querySelector("[data-active]")
        delete activeButton.dataset.active

        // Select the right slide
        lightboxSlides[i].dataset.active = true;
        button.dataset.active = true;
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

// Lightbox opens on click of carousel slide

carouselSlides.forEach(slide => {
    slide.addEventListener("click", () => {
        lightboxParent.setAttribute("aria-expanded", true)
        lightboxParent.classList.remove("hidden");
        lightboxParent.classList.add("md:block", "hidden")
        overlay.classList.remove("hidden");
    })
});

// Close cart, menu and lightbox on outside click
document.addEventListener("click", (e) => {
    // menu
    const isClickInsideMenu = menu.contains(e.target);
    const isClickOnMenuIcon = menuIcon.contains(e.target);

    // cart
    const isClickInsideCart = basket.contains(e.target);
    const isClickOnBtn = cartBtn.contains(e.target);

    // lightbox
    const isClickInsideLightbox = lightboxParent.contains(e.target);
    const isClickOnSlide = carousel.contains(e.target);

    if (!isClickInsideCart && !isClickOnBtn && cartBtn.getAttribute("aria-expanded") === "true") {
        handleCartToggle();
    }

    if (!isClickInsideMenu && !isClickOnMenuIcon && menuBtn.getAttribute("aria-expanded") === "true") {
        handleMenuToggle();
    }

    if (!isClickInsideLightbox && !isClickOnSlide && lightboxParent.getAttribute("aria-expanded") === "true") {
        lightboxParent.classList.add("hidden");
        lightboxParent.classList.remove("md:block")
        overlay.classList.add("hidden");
    }

});