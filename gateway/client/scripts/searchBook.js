const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");

async function doSearch() {
  const searchTerm = searchBox.value.trim();
  if (!searchTerm) return;

  resultsDiv.innerHTML = "Searching...";
  try {
    const res = await fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchTerm }),
    });
    const data = await res.json();

    if (!data.success) {
      resultsDiv.innerHTML = "Search failed.";
      return;
    }

    const books = data.books || [];
    if (books.length === 0) {
      resultsDiv.innerHTML = "No books found.";
      return;
    }

    resultsDiv.innerHTML = "";
    books.forEach(function (book) {
      const authors = Array.isArray(book.authors) ? book.authors.join(", ") : (book.authors || "Unknown author");
      const card = document.createElement("div");
      card.className = "search-result-card";

      const titleEl = document.createElement("div");
      titleEl.className = "search-result-title";
      titleEl.textContent = book.title;
      card.appendChild(titleEl);

      const authorsEl = document.createElement("div");
      authorsEl.className = "search-result-authors";
      authorsEl.textContent = authors;
      card.appendChild(authorsEl);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "add-to-library-btn";
      btn.textContent = "Add to library";
      btn.dataset.id = book.id;
      btn.dataset.title = book.title;
      btn.dataset.authors = JSON.stringify(book.authors);
      btn.addEventListener("click", addToLibrary);
      card.appendChild(btn);

      resultsDiv.appendChild(card);
    });
  } catch (err) {
    resultsDiv.innerHTML = "Error searching. Try again.";
  }
}

async function addToLibrary(ev) {
  const btn = ev.target;
  const id = btn.dataset.id;
  const title = btn.dataset.title;
  let authors = [];
  try {
    authors = JSON.parse(btn.dataset.authors);
  } catch (error) {
    authors = [];
  }

  btn.disabled = true;
  try {
    const res = await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, authors }),
    });
    if (!res.ok) {
      btn.disabled = false;
      btn.textContent = "Add to library";
    }
  } catch (error) {
    btn.disabled = false;
    btn.textContent = "Add to library";
  }
}

if (searchBox && searchButton && resultsDiv) {
  searchButton.addEventListener("click", doSearch);
}
