// import "@natureslaboratory/responsive-nav"

import "./dynamicNav";

const scrollToTopButton = document.getElementById("scrollToTop");
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
})