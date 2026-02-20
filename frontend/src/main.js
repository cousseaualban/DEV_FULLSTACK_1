import Navigo from "navigo";
import { pageListeArticles } from "./page/pageListeArticles";
import { pagePanier } from "./page/pagePanier";
import { login } from "./page/login";
import { dashboard } from "./page/dashboard";

const router = new Navigo("/");

export const panier = []

window.modalLogin = function() {
  login()
}

export async function verifyToken() {
  const token = localStorage.getItem("token");

  console.log(token)

  if (!token) return false;

  try {
    const response = await fetch("http://localhost:5000/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.ok; // true si 200, false sinon
  } catch (error) {
    return false;
  }
}

verifyToken().then(isValid => {
  if (!isValid) {
    document.getElementById("dashboard").classList.add('hidden')
  }
});

router
  .on("/", () => {
    pageListeArticles()
  })
  .on("/panier", () => {
    pagePanier()
  })
  .on("/dashboard", () => {
    dashboard()
  })
  .resolve()

export function reloadConnexion () {
  const dashboard = document.getElementById("dashboard")
  verifyToken().then(isValid => {
    if (isValid) {
      dashboard.classList.remove('hidden')
    } else {
      dashboard.classList.add('hidden')
    }
    pageListeArticles()
    router.navigate('/')
  });
}

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

