// Mengubah kunci penyimpanan agar data lama terserap dan dimulai dari awal yang bersih
const STORAGE_KEY = 'finance_tracker_oliv_alsa_clean_v1';

// Kosongkan array defaultTransactions agar tidak ada data bawaan
const defaultTransactions = [];

let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultTransactions;
let financeChart = null;

const form = document.getElementById('transactionForm');
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const transactionList = document.getElementById('transactionList');
const emptyState = document.getElementById('emptyState');
const resetDemoBtn = document.getElementById('resetDemoBtn');

// Set default tanggal hari ini
if (dateInput) {
  dateInput.valueAsDate = new Date();
}

function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function updateSummary() {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  document.getElementById('totalBalance').textContent = formatRupiah(balance);
  document.getElementById('totalIncome').textContent = formatRupiah(income);
  document.getElementById('totalExpense').textContent = formatRupiah(expense);

  updateChart(income, expense);
}

function updateChart(income, expense) {
  const ctx = document.getElementById('financeChart').getContext('2d');

  if (financeChart) {
    financeChart.destroy();
  }

  financeChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pemasukan ✨', 'Pengeluaran 🛍️'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#34d399', '#fb7185'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 4,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              family: "'Plus Jakarta Sans', sans-serif",
              weight: '700',
              size: 13
            },
            color: '#3b2f4a',
            padding: 16
          }
        }
      }
    }
  });
}

function renderTransactions() {
  const keyword = searchInput.value.toLowerCase();
  const typeFilter = filterType.value;

  const filtered = transactions.filter(t => {
    const matchesKeyword = t.title.toLowerCase().includes(keyword) || t.category.toLowerCase().includes(keyword);
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    return matchesKeyword && matchesType;
  });

  transactionList.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    filtered.forEach(tx => {
      const li = document.createElement('li');
      li.className = 'transaction-item';
      const sign = tx.type === 'income' ? '+' : '-';

      li.innerHTML = `
        <div class="tx-left">
          <span class="tx-title">${tx.title}</span>
          <span class="tx-meta">${tx.category} • ${tx.date}</span>
        </div>
        <div class="tx-right">
          <span class="tx-amount ${tx.type}">${sign} ${formatRupiah(tx.amount)}</span>
          <button class="delete-btn" onclick="deleteTransaction(${tx.id})" title="Hapus">✕</button>
        </div>
      `;
      transactionList.appendChild(li);
    });
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const type = document.querySelector('input[name="type"]:checked').value;

  const newTx = {
    id: Date.now(),
    title: titleInput.value.trim(),
    amount: parseFloat(amountInput.value),
    type,
    category: categoryInput.value,
    date: dateInput.value
  };

  transactions.unshift(newTx);
  saveTransactions();
  updateSummary();
  renderTransactions();

  titleInput.value = '';
  amountInput.value = '';
});

window.deleteTransaction = function(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  updateSummary();
  renderTransactions();
};

resetDemoBtn.addEventListener('click', () => {
  // Jika tombol reset demo diklik, Anda bisa memasukkan data contoh lagi di sini jika mau,
  // atau biarkan kosong ([]).
  transactions = []; 
  saveTransactions();
  updateSummary();
  renderTransactions();
});

searchInput.addEventListener('input', renderTransactions);
filterType.addEventListener('change', renderTransactions);

// Inisialisasi awal
updateSummary();
renderTransactions();
