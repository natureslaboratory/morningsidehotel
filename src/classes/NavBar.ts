import NavMenu from './NavMenu';
import {NavBarLink} from './Link';

export default class NavBar extends NavMenu {
    links : Array<NavBarLink> = [];

    // Public Int
    get totalWidth() {
        let width = 0;
        this.links.forEach(link => {
            width += link.width;
        });
        return width;
    }

    constructor(menu : HTMLElement) {
        super(menu)
        let children = this.node.children as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < children.length; i++) {
            const link = children[i];
            let newLink = new NavBarLink(link);
            this.links = [...this.links, newLink];
        }

        this.hideOne = this.hideOne.bind(this);
        this.closeAllMenus = this.closeAllMenus.bind(this);
        this.addEventListeners();

    }

    // Public Null
    hideOne() {
        for (let i = this.links.length - 1; i >= 0; i--) {
            const link = this.links[i];
            if (!link.isHidden) {
                link.hideLink()
                break;
            }
        }
    }

    handleLinks(link : NavBarLink) {
        if (link.childLinksNode.classList.contains("show")) {
            link.closeMenu();
        } else {
            this.closeAllMenus();
            link.openMenu();
        }
    }
    
    addEventListeners() {
        this.links.forEach(link => {
            if (link.hasChildren) {
                link.node.addEventListener("click", () => {
                    this.handleLinks(link);
                })
            }
        })
    }

    closeAllMenus() {
        this.links.forEach(link => {
            link.closeMenu();
        })
    }
}