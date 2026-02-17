const articles = [
  {
    id: 1,
    libelle: "Pommes Gala",
    description: "Des pommes Gala fraîches, sucrées et juteuses, parfaites pour les collations.",
    prix: 2.5,
    categorie: "Fruits"
  },
  {
    id: 2,
    libelle: "Tomates Cerises",
    description: "Tomates cerises rouges, idéales pour les salades ou à grignoter.",
    prix: 3.0,
    categorie: "Légumes"
  },
  {
    id: 3,
    libelle: "Pommes de Terre",
    description: "Pommes de terre bio, parfaites pour purée ou cuisson au four.",
    prix: 1.8,
    categorie: "Légumes"
  },
  {
    id: 4,
    libelle: "Bananes",
    description: "Bananes mûres, idéales pour le petit-déjeuner ou les smoothies.",
    prix: 2.2,
    categorie: "Fruits"
  },
  {
    id: 5,
    libelle: "Carottes",
    description: "Carottes croquantes et sucrées, parfaites pour cuisiner ou en snack.",
    prix: 1.5,
    categorie: "Légumes"
  }
];

function voirDetail(articleId) {
  console.log("Affichage des détails pour l'article :", articleId);
}

function listeArticles () {
  const html = `
    <p class="flex justify-center text-4xl font-bold">Liste des articles</p>
    <table class="border-collapse w-full bg-white">
      <thead>
        <tr>
          <th class="border border-black">ID</th>
          <th class="border border-black">Libelle</th>
          <th class="border border-black">Prix</th>
          <th class="border border-black">Catégorie</th>
          <th class="border border-black">Actions</th>
        </tr>
      </thead>
      <tbody id="articlesList">
      ${articles.map(article => `<tr>
            <td class="border border-black p-1">${article.id}</td>
            <td class="border border-black p-1">${article.libelle}</td>
            <td class="border border-black p-1">${article.categorie}</td>
            <td class="border border-black p-1">${article.prix}</td>
            <td class="border border-black p-1">
              <button class="btn-detail" data-id="${article.id}">Détail</button>
            </td>
          </tr>
          `)
        .join("")}
      </tbody>
    </table>`
  document.querySelector('#app').innerHTML = html

  document
    .querySelectorAll('.btn-detail')
    .forEach(button => {
        button.addEventListener('click', () => {
          voirDetail(button.getAttribute('data-id'));
        });
      })
}

listeArticles()