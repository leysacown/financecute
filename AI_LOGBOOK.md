1. Tahap 1: Eksplorasi Ide & Perancangan Solusi (interaksi AI dalam menentukan konsep produk)
 "Posisikan dirimu sebagai programmer yang memberikan aplikasi yang bermanfaat untuk memecahkan sebuah masalah, yang bisa dibuat dengan HTML, CSS, dan Javascript tentang ide permasalahan ekonomi."

2. Tahap 2: Penyusunan Kerangka Kode (Scaffolding) (interaksi AI dalam merancang struktur dasar HTML/CSS atau logika fungsi python)
"Posisikan dirimu sebagai programmer yang akan membuat finance tracker sederhana."
"Posisikan dirimu sebagai programmer dan menyusun kode finance tracker lebih detail."
"Posisikan dirimu sebagai programmer yang membuat kerangka dasar HTML dan CSS untuk web finance tracker, tambahkan juga Javascript"

Tahap 3: Pemecahan Masalah dan Penanganan Galat (Debugging) (interaksi AI saat memperbaiki kesalahan program)
"Posisikan dirimu sebagai programmer, betulkan kode yang saya buat agar riwayat transaksi kosong atau bersih"
const STORAGE_KEY = 'finance_tracker_oliv_alsa_v1';
const defaultTransactions = [
  { id: 1, title: 'Uang Saku & Bonus Bulanan', amount: 3500000, type: 'income', category: '💼 Gaji & Bonus', date: '2026-11-01' },
  { id: 2, title: 'Beli Matcha & Croissant', amount: 85000, type: 'expense', category: '🍔 Makanan & Jajan', date: '2026-11-05' },
  { id: 3, title: 'Belanja Aksesoris Lucu', amount: 240000, type: 'expense', category: '🛍️ Belanja Lucu', date: '2026-11-10' },
  { id: 4, title: 'Hadiah Projek Desain', amount: 750000, type: 'income', category: '🎁 Hadiah', date: '2026-11-14' }
];
Solusinya adalah rubah kunci penyimpanan agar data lama terserap dan dimulai dari awal yang bersih, mengosongkan array defaultTransaction agar tidak ada data bawaan.
const STORAGE_KEY = 'finance_tracker_oliv_alsa_clean_v1';
const defaultTransactions = [];

Tahap 4: Refleksi dan Penjelasan Kode (verifikasi pemahaman siswa terhadap fungsi program yang dibuat)
​1. Manajemen Data (State): Semua riwayat keuangan dikelola dalam satu variabel array (transactions), sehingga data terpusat dan mudah diolah.
​2. Manipulasi DOM: Perubahan data tidak memerlukan reload halaman karena JavaScript langsung memperbarui teks pada elemen HTML (innerText).
​3. Persistensi Data: Penggunaan localStorage memastikan catatan keuangan pengguna tetap aman tersimpan di browser meskipun tab atau peramban ditutup
