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
        window.location.href = "/login.html";
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