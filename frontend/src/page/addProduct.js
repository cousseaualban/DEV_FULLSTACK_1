import { closeModal, openModal } from "../main";
import { listeReload } from "./pageListeArticles";

function modalAddProduct() {
    return `<h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Ajouter un produit</h1>
    <form id="addProductForm" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium text-gray-700" for="label">Label</label>
        <input type="text" name="label" placeholder="Nom du produit" required
               class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700" for="description">Description</label>
        <textarea name="description" placeholder="Description détaillée" required
                  class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block mb-1 font-medium text-gray-700" for="price">Prix (€)</label>
          <input type="number" name="price" placeholder="Prix" required
                 class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
        </div>
        <div>
          <label class="block mb-1 font-medium text-gray-700" for="category">Catégorie</label>
          <input type="text" name="category" placeholder="Catégorie" required
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
        </div>
      </div>
      <div>
        <label class="block mb-1 font-medium text-gray-700" for="images">Images</label>
        <input type="file" name="images" multiple
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" />
      </div>
       <button type="submit"
            class="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition shadow-md">
        Ajouter le produit
      </button>
    </form>`
}

async function getCsrfToken() {
    try {
    const res = await fetch('http://localhost:5000/api/csrf-token', {
        credentials: 'include' 
    });
    const text = await res.text();
    
    const data = JSON.parse(text);    
    return data.csrfToken;
    } catch (err) {
    console.error('Erreur lors de la récupération du token CSRF:', err);
    return null;
    }
}

export function addProduct () {
    openModal(modalAddProduct())
    document.getElementById('addProductForm')?.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const productData = {
        label: formData.get('label'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        images: formData.getAll('images').map(file => file.name)
        };

        try {
        const csrfToken = await getCsrfToken();
        const res = await fetch('http://localhost:5000/api/product', {
            method: 'POST',
            headers: { 
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(productData)
        });

        const data = await res.json();
        const message = res.ok 
            ? 'Produit ajouté avec succès !' 
            : `Erreur : ${data.error}`;

        if (res.ok) {
            e.target.reset();
            listeReload(document.getElementById("searchInput").value)
            closeModal()
        }
        } catch(err) {
            alert(`Erreur : ${err.message}`);
        }
    });
}