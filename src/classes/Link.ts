import Icon from './Icon';

export class Link {
    node : HTMLElement;
    link : HTMLElement;
    icon : Icon;
    childLinksNode : HTMLElement;
    childLinks : Array<HTMLElement> = [];

    get hasChildren() : boolean {
        if (this.childLinksNode) {
            return true;
        }
        return false;
    }

    get isHidden() : boolean {
        if (this.node.classList.contains("hide")) {
            return true;
        }
        return false;
    }

    constructor(link : HTMLElement) {
        this.node = link;
    }

    hideLink() : void {
        if (!this.isHidden) {
            this.node.classList.add("hide");
        }
    }

    showLink() : void {
        if (this.isHidden) {
            this.node.classList.remove("hide");
        }
    }

    makeTabbable() {
        if (this.link) {
            this.link.tabIndex = 0;
        }
    }

    makeUntabbable() {
        if (this.link) {
            this.link.tabIndex = -1;
        }
    }

}

export class NavBarLink extends Link {

    // Public Int
    get width() : number {
        const linkRect = this.node.getBoundingClientRect();
        return linkRect.right - linkRect.left;
    }

    get isMenuOpen() : boolean {
        if (this.childLinksNode.classList.contains("show")) {
            return true;
        }
        return false;
    }

    constructor(link : HTMLElement) {
        super(link);
        let children = this.node.children as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.classList.contains("c-navbar__link") || child.classList.contains("c-navbar__button")) {
                this.link = child;
                let linkChildren = child.getElementsByClassName("c-icon");
                if (linkChildren) {
                    this.icon = new Icon(linkChildren[0]);
                } else {
                    throw new Error("No Icon For Dropdown");
                }
            } else if (child.classList.contains("c-navbar__sub-menu")) {
                this.childLinksNode = child;
            }
        }

        if (this.hasChildren) {
            let links = this.childLinksNode.children as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < links.length; i++) {
                const link = links[i];
                this.childLinks = [...this.childLinks, link];
            }
        }
    }

    toggle() : void {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() : void {
        if (this.childLinksNode) {
            this.childLinksNode.classList.add("show");
            let buttonRect = this.node.getBoundingClientRect();
            this.childLinksNode.style.top = `${buttonRect.bottom - buttonRect.top}px`;
            this.icon.spin();
        }
    }

    closeMenu() : void {
        if (this.childLinksNode) {
            this.childLinksNode.classList.remove("show");
            this.icon.unspin();
        }
    }

}

export class HamburgerNavLink extends Link {

    expandType : string;

    get isMenuOpen() {
        if (this.childLinksNode.style.maxHeight) {
            return true;
        }
        return false;
    }

    constructor(link : HTMLElement, expandType : string) {
        super(link);
        this.expandType = expandType;

        let children = this.node.children as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.classList.contains("c-hamburger__link") || child.classList.contains("c-hamburger__element-button")) {
                this.link = child;
                let icons = child.getElementsByClassName("c-icon");
                if (icons) {
                    this.icon = new Icon(icons[0]);
                }
            } else if (child.classList.contains("c-hamburger__sub-menu")) {
                this.childLinksNode = child;
            }
        }

        if (this.hasChildren) {
            let linksArray = this.childLinksNode.children as HTMLCollectionOf<HTMLElement>;
            for (let i = 0; i < linksArray.length; i++) {
                const element = linksArray[i];


                let links = element.getElementsByClassName("c-hamburger__sub-link") as HTMLCollectionOf<HTMLElement>;
                if (links) {
                    links[0].tabIndex = -1;
                }
                this.childLinks = [...this.childLinks, element];
            }
        }
    }

    toggle() {
        if (this.isMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    close() {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = null;
            this.childLinks.forEach(element => {
                let links = element.getElementsByClassName("c-hamburger__sub-link") as HTMLCollectionOf<HTMLElement>;
                if (links) {
                    links[0].tabIndex = -1;
                }
            })
            if (this.icon) {
                this.icon.unspin();
            }
        }
    }

    open() {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = this.childLinksNode.scrollHeight + "px";
            this.childLinks.forEach(element => {
                let links = element.getElementsByClassName("c-hamburger__sub-link") as HTMLCollectionOf<HTMLElement>;
                if (links) {
                    links[0].tabIndex = 0;
                }
            })
            if (this.icon) {
                this.icon.spin();
            }
        }
    }
}