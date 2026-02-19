import Navigo from "navigo";
import { pageListeArticles } from "./pageListeArticles";
import { pageDetailArticle } from "./pageDetailArticle";
import { pagePanier } from "./pagePanier";

const router = new Navigo("/");

export const panier = []

router
  .on("/", () => {
    pageListeArticles()
  })
  .on("/article/:id", ({ data }) => {
    pageDetailArticle(data.id)
  })
  .on("/panier", () => {
    pagePanier()
  })
  .resolve()