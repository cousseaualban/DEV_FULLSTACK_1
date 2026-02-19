export function initAddProductForm() {
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
      alert(message);

      if (res.ok) {
        e.target.reset();
        window.location.href = '/dashboard';
      }
    } catch(err) {
      alert(`Erreur : ${err.message}`);
    }
  });
}

initAddProductForm(); 