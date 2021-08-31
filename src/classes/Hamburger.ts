import NavMenu from './NavMenu';
import { HamburgerNavLink } from './Link';

export default class Hamburger extends NavMenu {
    type: string;
    subMenuType: string;
    links: Array<HamburgerNavLink> = [];

    // Public Bool
    get isHidden(): Boolean {
        if (this.node.classList.contains("show")) {
            return false;
        }
        return true;
    }

    get isHamburgerFull(): Boolean {
        this.links.forEach(link => {
            if (link.isHidden) {
                return false;
            }
        })
        return true;
    }

    get allLinks(): Array<HTMLElement> {
        let allLinks = this.node.getElementsByTagName("a") as HTMLCollectionOf<HTMLElement>;
        return Array.from(allLinks);
    }

    constructor(menu: HTMLElement) {
        super(menu);
        this.subMenuType = this.node.dataset.expand;
        if (!this.subMenuType) {
            console.warn("No Expand Type Specified");
        }

        let children = this.node.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < children.length; i++) {
            const link = children[i];

            if (link.classList.contains("c-hamburger__element")) {
                let newLink = new HamburgerNavLink(link, this.subMenuType ? this.subMenuType : "accordian");
                newLink.makeUntabbable();
                this.links = [...this.links, newLink];
            }
        }

        try {
            this.type = this.node.dataset.type;
        } catch (error) {
            console.error("No Hamburger Type Specified");
        }

        if (this.type && this.type == "slideover") {
            let closeDiv = document.createElement("li");
            closeDiv.classList.add("c-hamburger__close-wrapper");
            closeDiv.innerHTML =
                `<svg width="12.32781mm" height="12.327812mm" viewBox="0 0 12.32781 12.327812" version="1.1" class="c-hamburger__close-button">
                    <defs id="defs2" />
                    <g inkscape:label="Layer 1" id="layer1" transform="translate(-8.837041,-271.65379)" class="c-cross__g">
                        <rect class="c-cross__rect" width="16.394718" height="1.0394346" x="-194.03687" y="206.53433" transform="rotate(-45)" />
                        <rect transform="rotate(-135)" y="-186.35922" x="-215.2514" height="1.0394346" width="16.394718" class="c-cross__rect" />
                    </g>
                </svg>`

            this.node.prepend(closeDiv);
        }

        this.addEventListeners();
    }

    // Public Null
    show() {
        this.links.forEach(link => {
            link.makeTabbable();
        })
        switch (this.type) {
            case "dropdown":
                this.node.classList.add("show");
                break
            case "slideover":
                this.node.classList.add("show");
                let body = document.getElementsByTagName("body")[0];
                body.classList.add("no-scroll");
                break
            case "slidewith":
                break
            case "fullpage":
                this.node.classList.add("show");
                break
            default:
                throw new Error("Invalid Hamburger Type");
        }
    }

    // Public Null
    hide() {
        this.links.forEach(link => {
            link.makeUntabbable();
        })

        switch (this.type) {
            case "dropdown":
                this.node.classList.remove("show");
                break
            case "slideover":
                this.node.classList.remove("show");
                let body = document.getElementsByTagName("body")[0];
                body.classList.remove("no-scroll");
                break
            case "slidewith":
                break
            case "fullpage":
                this.node.classList.remove("show");
                break
            default:
                throw new Error("Invalid Hamburger Type");
        }

        setTimeout(() => {
            this.closeAllMenus();
        }, 150);

    }

    // Public Null
    showOne() {
        for (let i = this.links.length - 1; i >= 0; i--) {
            const link = this.links[i];
            if (link.isHidden) {
                link.showLink()
                break;
            }
        }
    }

    handleLinks(link) {
        if (!link.isMenuOpen) {
            this.closeAllMenus();
            link.open();
        } else {
            link.close();
        }
    }

    closeAllMenus() {
        this.links.forEach(link => {
            link.close();
        })
    }



    addEventListeners() {
        this.allLinks.forEach(link => {
            link.addEventListener("click", () => {
                this.hide();
            })
        })

        this.links.forEach(link => {
            if (link.hasChildren) {
                link.node.addEventListener("click", () => {
                    this.handleLinks(link);
                })
            }
        })

        if (this.type == "slideover") {
            let closeButton = document.getElementsByClassName("c-hamburger__close-button")[0];
            closeButton.addEventListener("click", () => {
                this.hide();
            })
        }

    }

}