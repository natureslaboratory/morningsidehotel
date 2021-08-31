import DynamicNavigation from './classes/DynamicNavigation';
import StaticNavigation from './classes/StaticNavigation';
import FixedNavigation from './classes/FixedNavigation';
import Navigation from './classes/Navigation';

const navigationBuilder = (nav : HTMLElement) => {
    switch (nav.dataset.type) {
        case "dynamic":
            return new DynamicNavigation(nav);
        case "static":
            return new StaticNavigation(nav);
        case "fixed":
            return new FixedNavigation(nav);
        default:
            throw new Error("No Navigation Type Specified");
    }
}

let navigationItems = document.getElementsByClassName("c-navigation") as HTMLCollectionOf<HTMLElement>;
let navigationArray : Array<Navigation> = [];

for (let i = 0; i < navigationItems.length; i++) {
    const nav = navigationItems[i];
    let navigation = navigationBuilder(nav);
    navigationArray = [...navigationArray, navigation];
}

if (navigationArray) {
    window.addEventListener("DOMContentLoaded", () => {
        navigationArray.forEach(nav => {
            nav.handleResize()
        })
    })

    window.addEventListener("resize", () => {
        navigationArray.forEach(nav => {
            nav.handleResize();
        })
    });
}