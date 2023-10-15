const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

let modal = document.querySelector(".modal");
let bookGrid = document.querySelector(".bookGrid");
let form = document.querySelector("#my-form");

form.addEventListener("submit", (event) => {
  addBookToLibrary();
  event.preventDefault();
  form.reset();
  modal.style.display = "none";
});

let addButton = document.querySelector(".addBookBtn");
addButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

function addBookToLibrary() {
  const newBook = getBookFromInput();
  myLibrary.push(newBook);
  updateBookGrid();
}

function getBookFromInput() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read").checked;
  return new Book(title, author, pages, read);
}

function updateBookGrid() {
  bookGrid.innerHTML = "";
  for (let book of myLibrary) {
    createBookCard(book);
  }
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const pages = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  //appending divs with no content
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);

  bookCard.classList.add("bookCard");
  readBtn.classList.add("readBtn");
  removeBtn.classList.add("removeBtn");
  title.classList.add("titleCard");

  title.textContent = `${book.title}`;
  title.style.fontWeight = "700";
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    updateBookGrid();
  });

  readBtn.addEventListener("click", () => {
    book.toggleRead();
    //book.read = !book.read;
    updateBookGrid();
  });

  if (book.read) {
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "#9fff9c";
  } else {
    readBtn.textContent = "Not Read";
    readBtn.style.backgroundColor = "#ff9c9c";
  }

  bookGrid.appendChild(bookCard);
}
