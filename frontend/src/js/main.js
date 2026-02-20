import Navigo from "navigo";
import { initAddProductForm } from '../js/add-product.js';

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

function cardArticles(article) {
  return `
    <div class="bg-white border rounded-lg p-2 cursor-pointer" onclick="showArticle(${article.id})">
      <div class="flex justify-center text-lg font-bold">${article.label}</div>
      <div>Prix: ${article.price} €</div>
      <div>Catégorie: ${article.category}</div>
    </div>
  `;
}

window.showArticle = async function(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/product/${id}`);
    const article = await res.json();
    openModal(article);
  } catch (err) {
    console.error("Impossible de charger l'article", err);
  }
}


// Charger les produits au chargement de la page
fetch('http://localhost:5000/api/product')
  .then(r => r.json())
  .then(articles => {
    document.getElementById("app").innerHTML = listeArticles(articles);
  });

  
function openModal(article) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const app = document.getElementById("app");

  modalBody.innerHTML = voirDetail(article);
  modal.classList.remove("hidden");
  app.classList.add("blur");
}

function closeModal() {
  const modal = document.getElementById("modal");
  const app = document.getElementById("app");

  modal.classList.add("hidden");
  app.classList.remove("blur");
}

document.getElementById("closeModal").addEventListener("click", closeModal);

document.getElementById("modalOverlay").addEventListener("click", closeModal);

