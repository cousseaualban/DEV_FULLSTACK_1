import { panier } from "../main"

function listePanier (articles) {
  return `
    <div class="flex justify-center text-4xl font-bold mb-3">Panier</div>
    <div class="grid grid-cols-6 gap-4">
      ${articles.map(article => cardArticles(article)).join("")}
    <div>
   `
}

function cardArticles (article) {
  return `
    <div onclick="showArticle(${article.id})" class="bg-white border rounded-lg p-2">
      <div class="flex justify-center text-lg font-bold">${article.label}</div>
      <div>Prix: ${article.price} €</div>
      <div>Catégorie: ${article.category}</div>
    </div>
  `
}

export function pagePanier () {
    fetch('http://localhost:5000/api/product')
        .then(r => r.json())
        .then(articles => {
            document.getElementById("app").innerHTML = listePanier(articles.filter(article => panier.includes(article.id)))
    });
}