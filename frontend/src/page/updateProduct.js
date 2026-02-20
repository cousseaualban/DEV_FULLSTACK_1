import { listeReload } from "./pageListeArticles";
import { openModal, closeModal } from "../main";
export function editProductModal(product) {

  const token = localStorage.getItem("token");


  if (!token) {
    alert("Vous devez être connecté pour modifier un produit !");
    return;
  }

  const modalHTML = `
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">
      Modifier le produit
    </h1>

    <form id="editProductForm" class="space-y-4">

      <div>
        <label class="block mb-1 font-medium text-gray-700">Label</label>
        <input type="text" id="editLabel" value="${product.label}" required
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition" />
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Description</label>
        <textarea id="editDescription" required
          class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition">${product.description || ""}</textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-1 font-medium text-gray-700">Prix (€)</label>
          <input type="number" id="editPrice" value="${product.price}" required
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition" />
        </div>

        <div>
          <label class="block mb-1 font-medium text-gray-700">Catégorie</label>
          <input type="text" id="editCategory" value="${product.category}" required
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-500 focus:outline-none transition" />
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button type="button" id="cancelEdit"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
          Annuler
        </button>

        <button type="submit"
          class="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition shadow-md">
          Enregistrer
        </button>
      </div>

    </form>
  `;


  openModal(modalHTML);


  document.getElementById("cancelEdit").onclick = () => closeModal();


  document.getElementById("editProductForm").onsubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        label: document.getElementById("editLabel").value,
        description: document.getElementById("editDescription").value,
        price: parseFloat(document.getElementById("editPrice").value),
        category: document.getElementById("editCategory").value
      };

      const res = await fetch(`http://localhost:5000/api/product/${product.id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(updatedProduct)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur modification");

      alert("Produit modifié avec succès ✅");

      closeModal();

    
      const searchInput = document.getElementById("searchInput");
      const search = searchInput ? searchInput.value : "";
      listeReload(search);

    } catch (err) {
      alert(`Erreur : ${err.message}`);
      console.error(err);
    }
  };
}