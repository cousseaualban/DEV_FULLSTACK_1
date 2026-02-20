import { closeModal, openModal } from "../main";
import { login } from "./login";

function registerForm() {
    return `
        <h1 class="text-2xl font-bold mb-4 text-center">Créer un compte</h1>
        <form id="registerForm" class="flex flex-col gap-3">
            <input type="text" id="username" placeholder="Nom d'utilisateur"
                class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <input type="password" id="password" placeholder="Mot de passe"
                class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button type="submit"
                    class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            S'inscrire
            </button>
        </form>
        <p id="message" class="mt-2 text-red-500"></p>
        `
}

export function register() {
    openModal(registerForm())
    const form = document.getElementById("registerForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                message.classList.remove("text-red-500");
                message.classList.add("text-green-500");
                message.textContent = "Utilisateur créé avec succès !";

                setTimeout(() => {
                    closeModal()
                    login()
                }, 500);

                form.reset();
            } else {
                message.classList.remove("text-green-500");
                message.classList.add("text-red-500");
                message.textContent = data.error || "Erreur lors de l'inscription";
            }
        } catch (err) {
            message.classList.remove("text-green-500");
            message.classList.add("text-red-500");
            message.textContent = "Impossible de contacter le serveur";
            console.error(err);
        }
    });
}