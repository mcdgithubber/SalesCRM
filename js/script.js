document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  revenueChart.options.scales.x.ticks.color = getChartColor();
  revenueChart.options.scales.y.ticks.color = getChartColor();
  revenueChart.options.scales.x.grid.color = getGridColor();
  revenueChart.options.scales.y.grid.color = getGridColor();
  revenueChart.options.scales.y.title.color = getChartColor();
  revenueChart.update();
});


// -----------------------------
// Employee Data
// -----------------------------
const employees = [
  { name: "Bob Johns", status: "Active", revenue: 8600 },
  { name: "Michael Liam", status: "Active", revenue: 11200 },
  { name: "James Parker", status: "On Leave", revenue: 5400 },
  { name: "Karren Jones", status: "On Leave", revenue: 8010 },
  { name: "Daniel Williams", status: "On Leave", revenue: 979 },
  { name: "John Doe", status: "Casual", revenue: 855 },
  { name: "Patricia Nelson", status: "Active", revenue: 17345 },
  { name: "Laura Young", status: "Part-Time", revenue: 3200 }
];

// -----------------------------
// Revenue Chart (Bar)
// -----------------------------
function isDarkMode() {
  return document.body.classList.contains("dark-mode");
}

function getChartColor() {
  return isDarkMode() ? "#ccc" : "#333";
}

function getGridColor() {
  return isDarkMode() ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
}

const revenueChartCtx = document.getElementById("employeeRevenueChart").getContext("2d");
const revenueChart = new Chart(revenueChartCtx, {
  type: "bar",
  data: {
    labels: employees.map(emp => emp.name),
    datasets: [{
      label: "Revenue",
      data: employees.map(emp => emp.revenue),
      backgroundColor: "#8300e9"
    }]
  },
  options: {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Revenue ($)",
        color: getChartColor()
      },
      ticks: {
        color: getChartColor()
      },
      grid: {
        color: getGridColor()
      }
    },
    x: {
      ticks: {
        color: getChartColor()
      },
      grid: {
        color: getGridColor()
      }
    }
  }
}

});

// -----------------------------
// Revenue Gauge
// -----------------------------
const gaugeCtx = document.getElementById("revenueGauge").getContext("2d");
let revenue = 55589;

function createGauge(rev) {
  return new Chart(gaugeCtx, {
    type: "doughnut",
    data: {
      labels: ["Revenue", "Target"],
      datasets: [{
        data: [rev, 18000 - rev],
        backgroundColor: ["#8300e9", "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        centerText: {
          display: true,
          text: `$${rev.toLocaleString()}`
        }
      }
    },
    plugins: [{
      id: "centerText",
      beforeDraw: function(chart) {
        if (chart.config.options.plugins.centerText.display !== true) return;

        const width = chart.width,
              height = chart.height,
              ctx = chart.ctx;

        ctx.restore();
        const fontSize = (height / 6).toFixed(2);
        ctx.font = `${fontSize}px Arial`;
        ctx.textBaseline = "middle";

        const text = chart.config.options.plugins.centerText.text;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillStyle = "#8300e9";
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }]
  });
}

let gauge = createGauge(revenue);

function updateRevenueGauge(newRevenue) {
  gauge.destroy();
  gauge = createGauge(newRevenue);
}

// -----------------------------
// Total Revenue Button Logic
// -----------------------------
const totalRevenue = employees.reduce((sum, emp) => sum + emp.revenue, 0);
const totalBtn = document.getElementById("totalRevenueBtn");
totalBtn.innerText = `$${totalRevenue.toLocaleString()}`;
totalBtn.addEventListener("click", () => {
  updateRevenueGauge(totalRevenue);
});

// -----------------------------
// Display Employees
// -----------------------------
function displayEmployees(filter = "") {
  const container = document.getElementById("employeeCards");
  container.innerHTML = "";
  employees
    .filter(emp =>
      emp.name.toLowerCase().includes(filter.toLowerCase()) ||
      emp.status.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach(emp => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<strong>${emp.name}</strong><br>Status: ${emp.status}<br>Revenue: $${emp.revenue.toLocaleString()}`;
      card.addEventListener("click", () => updateRevenueGauge(emp.revenue));
      container.appendChild(card);
    });
}

document.getElementById("employeeSearch").addEventListener("input", (e) => {
  displayEmployees(e.target.value);
});

displayEmployees();

