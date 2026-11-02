// Login sederhana (front-end saja), cocok untuk demo/tugas.
// BUKAN keamanan sungguhan: siapa pun bisa membaca password ini lewat source code.
// Untuk produksi, verifikasi login harus dilakukan di server (PHP/Node/dll).
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';
const AUTH_KEY = 'ereport_admin';

function isAdmin() {
    try { return localStorage.getItem(AUTH_KEY) === '1'; } catch { return false; }
}

function login(user, pass) {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem(AUTH_KEY, '1');
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    location.href = 'index.html';
}

// Pasang di halaman dashboard: kalau belum login, arahkan ke halaman login
function requireAdmin() {
    if (!isAdmin()) location.replace('login.html');
}

// Kalau admin sedang login, tombol "Masuk" berganti jadi "Dashboard" + "Keluar"
function renderAuthNav() {
    const slot = document.getElementById('authSlot');
    if (!slot || !isAdmin()) return;
    slot.innerHTML =
        '<a class="btn btn-sage px-4" href="dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard</a>' +
        '<button class="btn btn-outline-light" type="button" onclick="logout()">Keluar</button>';
}

document.addEventListener('DOMContentLoaded', renderAuthNav);