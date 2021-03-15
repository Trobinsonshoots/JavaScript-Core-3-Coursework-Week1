const myLibrary = [];

window.addEventListener('load', () => {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
);
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

function submit() {
  if (
    title.value == null ||
    title.value === "" ||
    author.value == null ||
    author.value === "" ||
    pages.value == null ||
    pages.value === ""
  ) {
    alert('Please fill all fields!');
    return false;
  }
  const book = new Book(title.value, author.value, pages.value, check.checked);
  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const table = document.getElementById("display");
  const rowsNumber = table.rows.length;

  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  const { length } = myLibrary;
  for (let i = 0; i < length; i++) {
    const row = table.insertRow(1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;

    const changeBut = document.createElement('button');
    changeBut.id = i;
    changeBut.className = 'btn btn-success';
    cell4.appendChild(changeBut);
    let readStatus = '';
    if (myLibrary[i].check === false) {
      readStatus = 'No';
      changeBut.className = 'btn btn-danger';
    } else {
      readStatus = 'Yes';
    }
    changeBut.innerHTML = readStatus;

    changeBut.addEventListener('click', () => {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    const delBut = document.createElement('button');
    delBut.id = i + 5;
    cell5.appendChild(delBut);
    delBut.className = 'btn btn-warning';
    delBut.innerHTML = 'Delete';
    delBut.addEventListener('click', () => {
      myLibrary.splice(i, 1);
      render();
    });
  }
}
