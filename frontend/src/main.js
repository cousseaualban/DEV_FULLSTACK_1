import Navigo from "navigo";

function voirDetail(article) {
  return `
    <div class="text-2xl font-bold">${article.label}</div>
    <div >${article.description}</div>
    <div>Prix: ${article.price} €</div>
    <div>Catégorie: ${article.category}</div>
  `
}

function listeArticles (articles) {
  return `
    <div class="flex justify-center text-4xl font-bold mb-3">Liste des articles</div>
    <div class="grid grid-cols-6 gap-4">
      ${articles.map(article => cardArticles(article)).join("")}
    <div>
   `
  
}

function cardArticles (article) {
  return `
    <a href="/article/${article.id}" class="bg-white border rounded-lg p-2">
      <div class="flex justify-center text-lg font-bold">${article.label}</div>
      <div>Prix: ${article.price} €</div>
      <div>Catégorie: ${article.category}</div>
    </a>
  `
}

const router = new Navigo("/");

router
  .on("/", () => {
    fetch('http://localhost:5000/api/product')
      .then(r => r.json())
      .then(articles => {
        document.getElementById("app").innerHTML = listeArticles(articles)
      });
  })
  .on("/article/:id", ({ data }) => {
    fetch(`http://localhost:5000/api/product/${data.id}`)
      .then(r => r.json())
      .then(article => {
        document.getElementById("app").innerHTML = voirDetail(article)
      });
  })
  .resolve()