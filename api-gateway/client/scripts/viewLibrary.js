if (!localStorage.getItem("userId")) window.location.href = "/login";

const container = document.getElementById("book-container");

async function loadLibrary() {
  container.innerHTML = "Loading...";
  try {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`/api/library/${userId}/books`);
    const data = await res.json();
    const books = data.books || [];

    container.innerHTML = "";

    books.forEach(function (book) {
      const card = document.createElement("div");
      card.className = "book-card";

      const titleEl = document.createElement("div");
      titleEl.className = "book-title";
      titleEl.textContent = book.title;
      card.appendChild(titleEl);

      const authorEl = document.createElement("div");
      authorEl.className = "book-author";
      authorEl.textContent = book.author;
      card.appendChild(authorEl);

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = "There was an error when loading library.";
  }
}

if (container) {
  loadLibrary();
}
