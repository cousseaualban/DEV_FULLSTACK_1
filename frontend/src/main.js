import Navigo from "navigo";
import { pageListeArticles } from "./page/pageListeArticles";
import { pagePanier } from "./page/pagePanier";
import { login } from "./page/login";
import { loadCSPPage } from "./page/csp.js";

const router = new Navigo("/");

export const panier = []

window.modalLogin = function() {
  login()
}

router
  .on("/", () => {
    pageListeArticles()
  })
  .on("/panier", () => {
    pagePanier()
  })
  .on("/admin/csp-reports", () => {
    loadCSPPage()
  })

  .resolve()



export function openModal(body) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const app = document.getElementById("app");

  modalBody.innerHTML = body;
  modal.classList.remove("hidden");
  app.classList.add("blur");
}

export function closeModal() {
    const modal = document.getElementById("modal");
    const app = document.getElementById("app");

    modal.classList.add("hidden");
    app.classList.remove("blur");
  }

  document.getElementById("closeModal").addEventListener("click", closeModal);

  document.getElementById("modalOverlay").addEventListener("click", closeModal);