// 🟢 Sold Memberships
const sold = [
  {
    name: "Sarah Khan",
    email: "sarah.khan@example.com",
    phone: "+64 21 123 456",
    plan: "Premium"
  },
  {
    name: "Liam Jones",
    email: "liam.jones@example.com",
    phone: "+64 21 987 654",
    plan: "Basic"
  },
  {
    name: "Aisha Noor",
    email: "aisha.noor@example.com",
    phone: "+64 21 555 111",
    plan: "Elite"
  }
];

// 🔄 Trialing Memberships
const trialing = [
  {
    name: "Mark Chen",
    email: "mark.chen@example.com",
    phone: "+64 21 222 333",
    plan: "Basic"
  },
  {
    name: "Isabella Lee",
    email: "isabella.lee@example.com",
    phone: "+64 21 666 777",
    plan: "Premium"
  }
];

// ❌ Trials Finished
const finished = [
  {
    name: "Tom Walker",
    email: "tom.walker@example.com",
    phone: "+64 21 444 888",
    plan: "Basic"
  },
  {
    name: "Nadia Yusuf",
    email: "nadia.yusuf@example.com",
    phone: "+64 21 999 000",
    plan: "Elite"
  }
];

// 🧙‍♂️ Render Cards Into Each Section
function renderCards(data, containerId) {
  const container = document.getElementById(containerId);
  data.forEach(sale => {
    const card = document.createElement("div");
    card.className = "sale-card";
    card.innerHTML = `
      <strong>${sale.name}</strong><br>
      📧 ${sale.email}<br>
      📞 ${sale.phone}<br>
      🏷️ Plan: <span class="plan">${sale.plan}</span>
    `;
    container.appendChild(card);
  });
}

// 🔄 Call Renders
renderCards(sold, "soldCards");
renderCards(trialing, "trialCards");
renderCards(finished, "finishedCards");
