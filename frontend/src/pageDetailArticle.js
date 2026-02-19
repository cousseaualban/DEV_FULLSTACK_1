function voirDetail(article) {
  return `
    <div class="text-2xl font-bold">${article.label}</div>
    <div >${article.description}</div>
    <div>Prix: ${article.price} €</div>
    <div>Catégorie: ${article.category}</div>
  `
}

export function pageDetailArticle (id) {
  fetch(`http://localhost:5000/api/product/${id}`)
    .then(r => r.json())
    .then(article => {
      document.getElementById("app").innerHTML = voirDetail(article)
    });
}