export function loadCSPPage() {

  const token = localStorage.getItem("token");

  // 🔒 Pas de token → redirect
  if (!token) {
    window.location.href = "/login";
    return;
  }

  const app = document.getElementById("app");

  // 👉 Injecte ton HTML avec Tailwind
  app.innerHTML = `
    <div class="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-6 text-center">
        Dernières violations CSP
      </h1>

      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th class="p-2 border">Date</th>
            <th class="p-2 border">Document URI</th>
            <th class="p-2 border">Blocked URI</th>
            <th class="p-2 border">Directive Violée</th>
            <th class="p-2 border">Politique</th>
          </tr>
        </thead>
        <tbody id="cspReports" class="divide-y divide-gray-200"></tbody>
      </table>

      <p id="message" class="mt-4 text-red-500 text-center"></p>
    </div>
  `;

  const tbody = document.getElementById("cspReports");
  const messageEl = document.getElementById("message");

  // 🔐 Test de la route protégée
  fetch("http://localhost:5000/admin/csp-reports", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(async res => {

    // ❌ JWT invalide
    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    if (!res.ok) {
      throw new Error("Impossible de récupérer les CSP reports");
    }

    return res.json();
  })
  .then(data => {

    if (!data) return;

    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="p-2 text-center">
            Aucune violation enregistrée
          </td>
        </tr>`;
      return;
    }

    data.forEach(report => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td class="p-2 border">${new Date(report.created_at).toLocaleString()}</td>
        <td class="p-2 border break-words">${report.document_uri}</td>
        <td class="p-2 border break-words">${report.blocked_uri}</td>
        <td class="p-2 border break-words">${report.violated_directive}</td>
        <td class="p-2 border break-words">
          <pre class="whitespace-pre-wrap">${report.original_policy}</pre>
        </td>
      `;

      tbody.appendChild(tr);
    });

  })
  .catch(err => {
    console.error(err);
    messageEl.textContent = err.message;
  });
}