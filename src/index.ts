// import "@natureslaboratory/responsive-nav"

import "./dynamicNav";
import "./booking/index";

const scrollToTopButton = document.getElementById("scrollToTop");
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
})