// DATA
const ALL_SERVICES = [
  { name: 'Hair Cut',          amt: '₹ 18,760' },
  { name: 'Hair Color',        amt: '₹ 15,420' },
  { name: 'Facial',            amt: '₹ 10,230' },
  { name: 'Hair Spa',          amt: '₹ 8,950'  },
  { name: 'Others',            amt: '₹ 6,300'  },
  { name: 'Keratin Treatment', amt: '₹ 5,800'  },
  { name: 'Cleanup',           amt: '₹ 4,200'  },
  { name: 'Waxing',            amt: '₹ 3,750'  },
  { name: 'Threading',         amt: '₹ 2,900'  },
  { name: 'Nail Art',          amt: '₹ 2,450'  },
  { name: 'Head Massage',      amt: '₹ 1,980'  },
  { name: 'Bridal Package',    amt: '₹ 12,000' },
];

const TOP_COUNT = 5; // Only 5 shown in the card

//  TOP SERVICES — render top 5 in card

function renderTopServices() {
  const ul = document.getElementById('topSvcList');
  ul.innerHTML = ALL_SERVICES.slice(0, TOP_COUNT).map(s => `
    <li>
      <span class="svc-name">
        <span class="svc-dot"></span>${s.name}
      </span>
      <span class="svc-amt">${s.amt}</span>
    </li>
  `).join('');
}


function renderAllServices() {
  const ul = document.getElementById('allSvcList');
  ul.innerHTML = ALL_SERVICES.map((s, i) => `
    <li>
      <span class="svc-name">
        <span class="svc-dot"></span>${i + 1}. ${s.name}
      </span>
      <span class="svc-amt">${s.amt}</span>
    </li>
  `).join('');
}


function initServicesModal() {
  const overlay  = document.getElementById('svcOverlay');
  const openBtn  = document.getElementById('openSvcModal');
  const closeBtn = document.getElementById('closeSvcModal');

  // Open
  openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    renderAllServices();
    overlay.classList.add('open');
  });

  // Close via × button
  closeBtn.addEventListener('click', function () {
    overlay.classList.remove('open');
  });

  // Close by clicking outside the modal box
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  // Close with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });
}

//  SALES LINE CHART

function initSalesChart() {
  const canvas = document.getElementById('salesChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const labels = [
    '1 May','','','','','','',
    '8 May','','','','','','',
    '15 May','','','','','','',
    '22 May','','','','','','','','',
    '31 May'
  ];

  const data = [
    8000, 9200, 8700, 11000, 10400, 12500, 11800,
    14000, 13200, 15600, 14800, 16200, 15400, 17800,
    18200, 17000, 19500, 18800, 20400, 19000, 21500,
    20800, 22400, 21200, 23500, 22800, 24100, 23400,
    24800, 25100, 25430
  ];

  const gradient = ctx.createLinearGradient(0, 0, 0, 190);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.22)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: '#3b82f6',
        borderWidth: 2,
        backgroundColor: gradient,
        fill: true,
        tension: 0.4,
        // Only show a point on the last data entry (31 May)
        pointRadius: data.map((_, i) => i === data.length - 1 ? 5 : 0),
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => '₹ ' + ctx.parsed.y.toLocaleString('en-IN')
          },
          backgroundColor: '#1a2340',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 10,
          cornerRadius: 8,
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { size: 10, family: 'DM Sans' },
            color: '#9ca3bf',
            maxRotation: 0,
            callback: function (val, i) { return labels[i] || ''; }
          }
        },
        y: {
          grid: { color: '#f0f0f7' },
          border: { display: false },
          ticks: {
            font: { size: 10, family: 'DM Sans' },
            color: '#9ca3bf',
            callback: v => v >= 1000 ? (v / 1000) + 'K' : v,
            maxTicksLimit: 5,
          },
          min: 0,
          max: 32000,
        }
      }
    }
  });
}

//  APPOINTMENTS pie CHART

function initDonutChart() {
  const canvas = document.getElementById('apptChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
      datasets: [{
        data: [18, 8, 3, 3],
        backgroundColor: ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverOffset: 4,
      }]
    },
    options: {
      responsive: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.parsed}`
          },
          backgroundColor: '#1a2340',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 10,
          cornerRadius: 8,
        }
      }
    }
  });
}

//  SCHEDULE SCROLL NAVIGATION

function initSchedule() {
  const scroll = document.getElementById('schedScroll');
  if (!scroll) return;

  const step = 240; // px per click

  function scrollBy(dir) {
    scroll.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  document.getElementById('schedLeft')  .addEventListener('click', () => scrollBy(-1));
  document.getElementById('schedRight') .addEventListener('click', () => scrollBy(1));
  document.getElementById('schedRight2').addEventListener('click', () => scrollBy(1));
}

document.addEventListener('DOMContentLoaded', function () {
  renderTopServices();
  initServicesModal();
  initSalesChart();
  initDonutChart();
  initSchedule();
});