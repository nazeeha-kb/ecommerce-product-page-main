const cartBtn = document.getElementById("cart-btn");
const basket = document.getElementById("basket");

const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuIcon = document.getElementById("menu-icon");
const overlay = document.getElementById("overlay");

cartBtn.addEventListener("click", () => {
    handleCartToggle();
})

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

const handleCartToggle = () => {
    
    cartBtn.classList.toggle("text-black");
    cartBtn.classList.toggle("text-cust-graysish-blue-800");

     if (cartBtn.getAttribute("aria-expanded") == "false") {
        console.log("expanded")
        cartBtn.setAttribute("aria-expanded", "true")
        basket.show()
    }
    else {
        console.log("collapsed")
        cartBtn.setAttribute("aria-expanded", "false")
        basket.close()
    }
    
}