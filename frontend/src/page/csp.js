const token = localStorage.getItem('token');

const messageEl = document.getElementById('message');
const tbody = document.getElementById('cspReports');

if (!token) {
  if (messageEl) {
    messageEl.textContent = 'Vous devez être connecté pour voir cette page.';
    messageEl.classList.remove('text-green-500');
    messageEl.classList.add('text-red-500');
  }
} else {
  fetch('http://localhost:5000/admin/csp-reports', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) throw new Error('Impossible de récupérer les rapports CSP');
      return res.json();
    })
    .then(data => {
      if (!tbody) return;

      tbody.innerHTML = '';

      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-2 text-center">Aucune violation enregistrée</td></tr>`;
        return;
      }

      data.forEach(report => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="p-2 border">${new Date(report.created_at).toLocaleString()}</td>
          <td class="p-2 border break-words">${report.document_uri}</td>
          <td class="p-2 border break-words">${report.blocked_uri}</td>
          <td class="p-2 border break-words">${report.violated_directive}</td>
          <td class="p-2 border break-words"><pre class="whitespace-pre-wrap">${report.original_policy}</pre></td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error(err);
      if (messageEl) {
        messageEl.textContent = err.message;
        messageEl.classList.remove('text-green-500');
        messageEl.classList.add('text-red-500');
      }
    });
}