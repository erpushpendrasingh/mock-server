const addBookBtn = document
     .querySelector("#addBookBtn")
     .addEventListener("click", formData);
const container = document.querySelector(".container");
let arr = JSON.parse(localStorage.getItem("Product")) || [];

function formData(event) {
     event.preventDefault();
     let book_name = document.querySelector("#bookname").value;
     let author = document.querySelector("#author").value;
     let image_url = document.querySelector("#bookcover").value;
     let cost = document.querySelector("#cost").value;
     let publisher = document.querySelector("#publisher").value;
     let genre = document.querySelector("#genre").value;
     let edition = document.querySelector("#edition").value;

     let product = new productEntry(
          book_name,
          author,
          image_url,
          cost,
          publisher,
          genre,
          edition
     );
     addPost(product);
}

const addPost = async (product) => {
     let res = await fetch(`http://localhost:3000/books`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
               "Content-Type": "application/json",
          },
     });
     let data = await res.json;
};

function productEntry(
     book_name,
     author,
     image_url,
     cost,
     publisher,
     genre,
     edition
) {
     this.book_name = book_name;
     this.author = author;
     this.image_url = image_url;
     this.cost = cost;
     this.publisher = publisher;
     this.genre = genre;
     this.edition = edition;
}

// getData
const getBook = async () => {
     let res = await fetch(`http://localhost:3000/books`);
     let data = await res.json();
     displayData(data);
     displayOnTable(data);
};
getBook();

const displayData = (data) => {
     data?.forEach((element) => {
          let card = document.createElement("div");
          card.setAttribute("class", "card");
          let section1 = document.createElement("div");
          section1.setAttribute("class", "section1");
          let section2 = document.createElement("div");
          section2.setAttribute("class", "section2");
          let image = document.createElement("img");
          image.src = element.image_url;
          let name = document.createElement("h1");
          name.innerText = element.book_name;
          let author = document.createElement("p");
          author.innerText = `Author: ${element.author}`;
          let genre = document.createElement("p");
          genre.innerText = `Genre: ${element.genre}`;
          let edition = document.createElement("p");
          edition.innerText = `Edition: ${element.edition}`;
          let publisher = document.createElement("p");
          publisher.innerText = `Publisher: ${element.publisher}`;
          let cost = document.createElement("p");
          cost.innerText = `Cost: ${element.cost}`;
          let borrow = document.createElement("button");
          borrow.innerText = "borrow";
          section1.append(image);
          section2.append(
               name,
               author,
               genre,
               edition,
               publisher,
               cost,
               borrow
          );
          card.append(section1, section2);
          container.append(card);
     });
};
let tbody = document.querySelector("tbody");
const displayOnTable = (data) => {
     data?.forEach((ele) => {
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          td1.innerText = ele.image_url;
          let td2 = document.createElement("td");
          td2.innerText = ele.author;
          let td3 = document.createElement("td");
          td3.innerText = ele.genre;
          let td4 = document.createElement("td");
          td4.innerText = ele.edition;
          let td5 = document.createElement("td");
          td5.innerText = ele.publisher;
          let td6 = document.createElement("td");
          td6.innerText = ele.cost;
          let td7 = document.createElement("td");
          td7.innerHTML = `<button></button>`;
          td7.textContent = "Edit";
          let td8 = document.createElement("td");
          td8.innerHTML = `<button></button>`;
          td8.textContent = "Delete";
          td8.addEventListener("click", function () {
               deleteData(ele.id);
          });
          tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
          tbody.append(tr);
     });
};
const deleteData = async (id) => {
     let res = await fetch(`http://localhost:3000/books/${id}`, {
          method: "DELETE",
          headers: {
               "Content-Type": "application/json",
          },
     });
     let data = await res.json();
};
