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
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      message.classList.remove("text-red-500");
      message.classList.add("text-green-500");
      message.textContent = "Connexion réussie !";

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify({ username }));

      window.location.href = "/src/html/dashboard.html";

    } else {
      message.classList.remove("text-green-500");
      message.classList.add("text-red-500");
      message.textContent = data.error || "Erreur lors de la connexion";
    }
  } catch (err) {
    message.classList.remove("text-green-500");
    message.classList.add("text-red-500");
    message.textContent = "Impossible de contacter le serveur";
    console.error(err);
  }
});
