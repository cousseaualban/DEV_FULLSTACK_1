import { openModal, panier } from "../main";
import { addProduct } from "./addProduct";

function listeArticles (articles) {
  return `
    <div class="flex justify-center text-4xl font-bold mb-3">Liste des articles</div>
    <form id="searchForm" class="mb-3 flex flex-row justify-between">
      <div>
        <input type="text" id="searchInput" class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" class="bg-violet-500 cursor-pointer text-white p-2 rounded hover:bg-violet-700">Rechercher</button>
      </div>
      <button onclick="modalAddProduct()" class="bg-violet-500 cursor-pointer text-white p-2 rounded hover:bg-violet-700">Ajouter un produit</button>
    </form>
    <div class="grid grid-cols-8 gap-4" id="grid">
      ${articles.map(article => cardArticles(article)).join("")}
    <div>
   `
}

function cardArticles (article) {
  return `
    <div class="bg-white border rounded-lg p-2">
      <div class="cursor-pointer" onclick="showArticle(${article.id})">
        <div class="flex justify-center text-lg font-bold">${article.label}</div>
        <div>Prix: ${article.price} €</div>
        <div>Catégorie: ${article.category}</div>
      </div>
      <button class="bg-violet-500 w-full cursor-pointer text-white p-2 rounded hover:bg-violet-700" onclick="addPanier(${article.id})">Add</button>
    </div>
  `
}

export function listeReload (search) {
  fetch(`http://localhost:5000/api/product?search=${search}`)
    .then((r => r.json()))
    .then((articles) => {
      document.getElementById("grid").innerHTML = articles.map(article => cardArticles(article)).join("")
    })
}

function voirDetail(article) {
  return `
    <div class="text-2xl font-bold">${article.label}</div>
    <div >${article.description}</div>
    <div>Prix: ${article.price} €</div>
    <div>Catégorie: ${article.category}</div>
  `
}

export function pageListeArticles () {
  fetch('http://localhost:5000/api/product')
    .then(r => r.json())
    .then(articles => {
      document.getElementById("app").innerHTML = listeArticles(articles)

      document.getElementById("searchForm")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          listeReload(document.getElementById("searchInput").value)
        });

      window.addPanier = function(id) {
        panier.push(id)
      }

      window.modalAddProduct = function() {
        addProduct()
      }

      window.showArticle = async function(id) {
        try {
          const res = await fetch(`http://localhost:5000/api/product/${id}`);
          const article = await res.json();
          openModal(voirDetail(article));
        } catch (err) {
          console.error("Impossible de charger l'article", err);
        }
      }
    });
}