export default class Book {

    node: HTMLElement;

    UIDate: HTMLInputElement;
    UINights: HTMLInputElement;
    UISearch: HTMLButtonElement;

    date: string;
    nights: string;

    widgetDate: HTMLInputElement;
    widgetNights: HTMLInputElement;
    widgetSearch: HTMLInputElement;

    interval: NodeJS.Timer;

    /** Pass in .c-book
     *
     */
    constructor(node: HTMLElement) {
        this.node = node;
        this.checkForWidget();
    }

    initialise() {
        this.getNodes();
        this.addEventListeners();
    }

    addEventListeners() {
        this.UISearch.addEventListener("click", (e) => {
            e.preventDefault();
            this.widgetDate.value = this.UIDate.value;
            this.widgetNights.value = this.UINights.value;
            this.widgetSearch.click();
        })
    }

    checkForWidget() {
        if (document.getElementById("f2b_search_form")) {
            this.initialise();
        } else {
            this.interval = setInterval(() => {
                if (document.getElementById("f2b_search_form")) {
                    this.initialise();
                    clearInterval(this.interval);
                }
            }, 5);
        }
    }

    makeNumberTwoDigit(num: number) {
        let numStr = num.toString();
        if (numStr.length == 1) {
            return "0" + numStr;
        }
        return numStr;
    }

    formatDate(date: Date) {
        const year = date.getFullYear();
        const month = this.makeNumberTwoDigit(date.getMonth() + 1);
        const day = this.makeNumberTwoDigit(date.getDate());
        return `${year}-${month}-${day}`;
    }

    getNodes() {
        const widgetWrapper = document.getElementById("f2b_search_form");
        this.widgetDate = document.getElementById("checkIn") as HTMLInputElement;
        this.widgetNights = document.getElementById("stayLength") as HTMLInputElement;
        this.widgetSearch = widgetWrapper.getElementsByClassName("searchButton")[0] as HTMLInputElement;

        this.UIDate = this.node.getElementsByClassName("c-book__form-date")[0] as HTMLInputElement;
        console.log(this.formatDate(new Date()));
        this.UIDate.defaultValue = this.formatDate(new Date());
    
        this.UINights = this.node.getElementsByClassName("c-book__form-nights")[0] as HTMLInputElement;
        this.UINights.value = "3";

        this.UISearch = this.node.getElementsByClassName("c-book__form-search")[0] as HTMLButtonElement;
    }
}