// Mock data (replace later with API data)
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

const container = document.getElementById("book-container");

function renderBooks() {
  container.innerHTML = ""; // Clear previous render

  books.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div>${book.author}</div>
      <button class="remove-btn" data-id="${book.id}">
        Remove from Library
      </button>
    `;

    container.appendChild(card);
  });

  // Add event listeners to all remove buttons
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", function() {
      const id = parseInt(this.getAttribute("data-id"));
      removeBook(id);
    });
  });
}

// When the back end is ready change this to the back end call
function removeBook(id) {
  books = books.filter(book => book.id !== id);
  renderBooks();
}

renderBooks();
