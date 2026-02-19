import { panier } from "./main";

function listeArticles (articles) {
  return `
    <div class="flex justify-center text-4xl font-bold mb-3">Liste des articles</div>
    <form id="searchForm" class="mb-3">
      <input type="text" id="searchInput" class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <button type="submit" class="bg-violet-500 cursor-pointer text-white p-2 rounded hover:bg-violet-700">Rechercher</button>
    </form>
    <div class="grid grid-cols-8 gap-4" id="grid">
      ${articles.map(article => cardArticles(article)).join("")}
    <div>
   `
}

function cardArticles (article) {
  return `
    <div class="bg-white border rounded-lg p-2">
      <a data-navigo href="/article/${article.id}">
        <div class="flex justify-center text-lg font-bold">${article.label}</div>
        <div>Prix: ${article.price} €</div>
        <div>Catégorie: ${article.category}</div>
      </a>
      <button data-id="${article.id}" class="add-btn bg-violet-500 w-full cursor-pointer text-white p-2 rounded hover:bg-violet-700">Add</button>
    </div>
  `
}

function listeRecherche (search) {
  fetch(`http://localhost:5000/api/product?search=${search}`)
    .then((r => r.json()))
    .then((articles) => {
      document.getElementById("grid").innerHTML = articles.map(article => cardArticles(article)).join("")
    })
}

export function pageListeArticles () {
  fetch('http://localhost:5000/api/product')
    .then(r => r.json())
    .then(articles => {
      document.getElementById("app").innerHTML = listeArticles(articles)

      document.getElementById("searchForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          listeRecherche(document.getElementById("searchInput").value)
        });

      document.querySelectorAll(".add-btn").forEach(button => {
        button.addEventListener("click", () => {
          panier.push(parseInt(button.dataset.id))
        });
      });
    });
}