export default class Icon {
    node; // HTMLElement

    constructor(icon) {
        this.node = icon;
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    // Public Null
    show() {
        if (this.node.classList.contains("hide")) {
            this.node.classList.remove("hide");
        }
    }

    // Public Null
    hide() {
        if (!this.node.classList.contains("hide")) {
            this.node.classList.add("hide");
        }
    }

    spin() {
        this.node.classList.add("spin");
    }

    unspin() {
        this.node.classList.remove("spin");
    }
}