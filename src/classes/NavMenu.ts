import {Link} from './Link';

export default class NavMenu {
    node : HTMLElement;
    links : Array<Link> = [];

    constructor(menu) {
        this.node = menu;
        this.hideAll = this.hideAll.bind(this)
        this.showAll = this.showAll.bind(this)
    }

    // Public Null
    hideAll() : void {
        this.links.forEach(link => link.hideLink());
    }

    // Public Null
    showAll() : void {
        this.links.forEach(link => link.showLink());
    }
}