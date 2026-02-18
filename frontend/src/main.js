import Navigo from "navigo";

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
  return `
    <div class="flex justify-center text-4xl font-bold">Liste des articles</div>
    <div class="grid grid-cols-6 gap-4 p-3">
      ${articles.map(article => cardArticles(article)).join("")}
    <div>`
}

function cardArticles (article) {
  return `
    <a href="/article/${article.id}" class="bg-white border rounded-lg p-2">
      <div class="flex justify-center text-lg font-bold">${article.libelle}</div>
      <div>Prix: ${article.prix} €</div>
      <div>Catégorie: ${article.categorie}</div>
    </a>
  `
}

listeArticles()

const router = new Navigo("/");

router
  .on("/", () => {
    document.getElementById("app").innerHTML = listeArticles()
  })
  .on("/article/:id", ({ data }) => {
    const id = data.id;

    document.getElementById("app").innerHTML = `
      <h1>Article ${id}</h1>
    `;
  })
  .resolve()


