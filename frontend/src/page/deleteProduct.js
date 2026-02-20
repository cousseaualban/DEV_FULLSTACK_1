
import { openModal, closeModal } from "../main";
export function deleteProductModal(productId, productLabel) {
   const token = localStorage.getItem("token");

  
  if (!token) {
    alert("Vous devez être connecté pour supprimer un produit !");
    return;
  }
  const modalHTML = `
    <h2 class="text-xl font-bold mb-4">Supprimer le produit</h2>
    <p>Voulez-vous vraiment supprimer <strong>${productLabel}</strong> ?</p>
    <div class="mt-4 flex justify-end gap-2">
      <button id="cancelDelete" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
      <button id="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Supprimer</button>
    </div>
  `;

  openModal(modalHTML);

  document.getElementById("cancelDelete").onclick = () => closeModal();

  document.getElementById("confirmDelete").onclick = async () => {
 
    try {

      const res = await fetch(`http://localhost:5000/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": token,
          "Content-Type": "application/json"
        }
      });

      const data = res.ok ? await res.json() : { error: res.statusText };
      if (!res.ok) throw new Error(data.error || "Impossible de supprimer le produit");

      alert(data.message || "Produit supprimé !");
      closeModal();

      document.getElementById(`product-${productId}`)?.remove();

    } catch (err) {
      alert(`Erreur : ${err.message}`);
      console.error(err);
    }
  };
}