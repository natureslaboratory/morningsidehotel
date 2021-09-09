import Book from "./classes/Book";


const books = Array.from(document.getElementsByClassName("c-book") as HTMLCollectionOf<HTMLElement>);

books.forEach(b => {
    new Book(b);
})
