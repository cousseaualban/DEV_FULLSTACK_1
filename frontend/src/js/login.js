const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    // 🔹 Debug complet
    console.log("Réponse complète login :", data);

    if (res.ok && data.token) {
      // 🔹 Affichage message succès
      message.classList.remove("text-red-500");
      message.classList.add("text-green-500");
      message.textContent = "Connexion réussie !";

      // 🔹 Stockage du token avant navigation
      localStorage.setItem("token", data.token);
      console.log("Token stocké dans localStorage :", localStorage.getItem("token"));

      // 🔹 Navigation vers le dashboard
      window.location.href = "/src/html/dashboard.html";

    } else {
      message.classList.remove("text-green-500");
      message.classList.add("text-red-500");
      message.textContent = data.error || "Erreur lors de la connexion : token manquant";
      console.warn("Token absent dans la réponse login !");
    }
  } catch (err) {
    message.classList.remove("text-green-500");
    message.classList.add("text-red-500");
    message.textContent = "Impossible de contacter le serveur";
    console.error("Erreur fetch login :", err);
  }
});