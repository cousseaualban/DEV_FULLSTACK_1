import { openModal, panier, verifyToken } from "../main";
import { addProduct } from "./addProduct";
import { deleteProductModal } from "./deleteProduct";
import { editProductModal } from "./updateProduct";
window.deleteProductModal = (id, label) => deleteProductModal(id, label);
window.editProduct = (product) => {
  editProductModal(product);
};

async function listeArticles (articles) {
  const token = await verifyToken()
  return `
    <div class="flex justify-center text-4xl font-bold mb-3">Liste des articles</div>
    <form id="searchForm" class="mb-3 flex flex-row justify-between">
      <div>
        <input type="text" id="searchInput" class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" class="bg-violet-500 cursor-pointer text-white p-2 rounded hover:bg-violet-700">Rechercher</button>
      </div>
      <button onclick="modalAddProduct()" class="${token? '' : 'hidden'} bg-violet-500 cursor-pointer text-white p-2 rounded hover:bg-violet-700">Ajouter un produit</button>
    </form>
    <div class="grid grid-cols-8 gap-4" id="grid">
      ${articles.map(article => cardArticles(article, token)).join("")}
    <div>
   `
}

function cardArticles (article, token) {
  return `
    <div class="bg-white border rounded-lg p-2">
      <div class="flex ${token? '' : 'hidden'} gap-2 justify-between cursor-pointer">
        <button onclick="deleteProductModal(${article.id}, '${article.label}'); event.stopPropagation();" class="text-red-600 hover:text-red-800" title="Supprimer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>

        <button onclick='editProduct(${JSON.stringify(article)}); event.stopPropagation();' class="text-violet-700 hover:text-violet-800" title="Modifier">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828l-10 10a2 2 0 01-.708.414l-4 1a1 1 0 01-1.212-1.212l1-4a2 2 0 01.414-.708l10-10a2 2 0 012.828 0z"/>
          </svg>
        </button>
      </div>
      <div class="cursor-pointer" onclick="showArticle(${article.id})">
        <div class="flex justify-center text-lg font-bold">${article.label}</div>
        <div>Prix: ${article.price} €</div>
        <div>Catégorie: ${article.category}</div>
      </div>
      <button class="bg-violet-500 w-full cursor-pointer text-white p-2 rounded hover:bg-violet-700" onclick="addPanier(${article.id})">Ajouter au panier</button>
    </div>
  `
}

export function listeReload (search) {
  fetch(`http://localhost:5000/api/product?search=${search}`)
    .then((r => r.json())).then(async (r) => {
      const token = await verifyToken()
      return [r, token]
    })
    .then(([articles, token]) => {
      document.getElementById("grid").innerHTML = articles.map(article => cardArticles(article, token)).join("")
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
    .then(async articles => {
      document.getElementById("app").innerHTML = await listeArticles(articles)
    })
    .then(() => {
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