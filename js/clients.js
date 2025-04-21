const clients = [
  {
    name: "Ahmed Salim",
    phone: "+64 21 101 100",
    email: "ahmed.salim@example.com",
    membership: "Premium",
    joined: "2023-08-15",
    expires: "2024-08-15",
    avatar: "assets/avatar.png"
  },
  {
    name: "Fatima Noor",
    phone: "+64 21 555 222",
    email: "fatima.noor@example.com",
    membership: "Elite",
    joined: "2022-11-01",
    expires: "2023-11-01",
    avatar: "assets/avatar.png"
  },
  {
    name: "Yousef Zaki",
    phone: "+64 21 888 333",
    email: "yousef.zaki@example.com",
    membership: "Basic",
    joined: "2024-01-10",
    expires: "2025-01-10",
    avatar: "assets/avatar.png"
  },
  {
    name: "Layla Matar",
    phone: "+64 21 999 444",
    email: "layla.matar@example.com",
    membership: "Premium",
    joined: "2023-05-20",
    expires: "2024-05-20",
    avatar: "assets/avatar.png"
  },
  {
    name: "Omar Said",
    phone: "+64 21 777 666",
    email: "omar.said@example.com",
    membership: "Elite",
    joined: "2023-09-05",
    expires: "2024-09-05",
    avatar: "assets/avatar.png"
  }
];

function renderClients(filteredClients) {
  const list = document.getElementById("clientList");
  list.innerHTML = "";

  filteredClients.forEach(client => {
    const card = document.createElement("div");
    card.className = "client-card";

    card.innerHTML = `
      <img src="${client.avatar}" alt="${client.name}" class="client-avatar">
      <div class="client-details">
        <strong>${client.name}</strong>
        <p>📞 ${client.phone}</p>
        <p>📧 ${client.email}</p>
        <p>🏷️ ${client.membership} Membership</p>
        <p>📅 Joined: ${client.joined}</p>
        <p>⏳ Expires: ${client.expires}</p>
      </div>
    `;

    list.appendChild(card);
  });
}

// Initial render
renderClients(clients);

// Search handler
document.getElementById("clientSearch").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm) ||
    client.membership.toLowerCase().includes(searchTerm)
  );
  renderClients(filtered);
});