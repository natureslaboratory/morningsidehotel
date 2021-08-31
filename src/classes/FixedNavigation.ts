import Navigation from './Navigation';

export default class FixedNavigation extends Navigation {
    breakpoint;

    constructor(nav) {
        super(nav)
        try {
            this.breakpoint = this.node.dataset.breakpoint;
        } catch (error) {
            console.error("Invalid Breakpoint");
        }
    }

    // Public Null
    handleResize() {
        // for mobile
        if (document.documentElement.clientWidth <= this.breakpoint) {
            this.moveAllToHamburger();
        }

        // for desktop
        else {
            this.moveAllToNav();
        }
    }
}