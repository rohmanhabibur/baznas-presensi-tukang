// Main application initialization
// Version: 1.0

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistem Presensi BAZNAS Banyuwangi - Initialized');
    
    // Initialize application
    initializeApp();
});

async function initializeApp() {
    try {
        // Update date and time displays
        updateCurrentDate();
        updateCurrentDateTime();
        
        // Load configuration
        loadConfiguration();
        
        // Set up intervals
        setupIntervals();
        
        // Check initial connection
        await checkConnection();
        
        showToast('Sistem presensi siap digunakan!', 'success');
        
    } catch (error) {
        console.error('Initialization error:', error);
        showToast('Error saat inisialisasi: ' + error.message, 'error');
    }
}

function loadConfiguration() {
    // Try to get from environment variables first
    const envUrl = window.GOOGLE_SHEETS_URL || process?.env?.GOOGLE_SHEETS_URL;
    const savedUrl = localStorage.getItem('sheetsUrl');
    
    if (envUrl) {
        CONFIG.GOOGLE_SHEETS_URL = envUrl;
        console.log('📊 Google Sheets URL loaded from environment');
    } else if (savedUrl) {
        CONFIG.GOOGLE_SHEETS_URL = savedUrl;
        console.log('📊 Google Sheets URL loaded from localStorage');
    } else {
        console.warn('⚠️ Google Sheets URL not configured. Please set GOOGLE_SHEETS_URL environment variable.');
        showToast('Konfigurasi Google Sheets belum diatur. Hubungi administrator.', 'warning');
    }
    
    // Update API instance
    if (window.api) {
        window.api.baseUrl = CONFIG.GOOGLE_SHEETS_URL;
    }
}

function setupIntervals() {
    // Update date/time every second
    setInterval(updateCurrentDateTime, CONFIG.INTERVALS.DATETIME_UPDATE);
    
    // Check connection every 30 seconds
    setInterval(checkConnection, CONFIG.INTERVALS.CONNECTION_CHECK);
    
    // Check auto close every minute
    setInterval(checkAutoClose, CONFIG.INTERVALS.AUTO_CLOSE_CHECK);
}

// Page navigation functions
function showAdminPage() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminPage').classList.remove('hidden');
    
    // Load admin page content
    loadAdminPageContent();
    
    setTimeout(() => {
        if (typeof updateAdminStats === 'function') updateAdminStats();
        if (typeof loadPresensiTable === 'function') loadPresensiTable();
        if (typeof loadTukangGrid === 'function') loadTukangGrid();
        if (typeof loadAdminGrid === 'function') loadAdminGrid();
        updateRecentActivities();
        checkConnection();
    }, 100);
}

function showTukangPage() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('tukangPage').classList.remove('hidden');
    
    // Load tukang page content
    loadTukangPageContent();
    
    const currentUser = auth.getCurrentUser();
    if (currentUser && currentUser.data) {
        const nameElement = document.getElementById('tukangName');
        if (nameElement) {
            nameElement.textContent = `Selamat datang, ${currentUser.data.name}!`;
        }
    }
    
    setTimeout(() => {
        if (typeof updateTukangStatus === 'function') updateTukangStatus();
        if (typeof loadRiwayatPresensi === 'function') loadRiwayatPresensi();
        if (typeof updateTukangStats === 'function') updateTukangStats();
        checkConnection();
    }, 100);
}

function loadAdminPageContent() {
    const adminPage = document.getElementById('adminPage');
    adminPage.innerHTML = `
        <!-- Admin page content will be loaded here -->
        <div class="text-center py-20">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard Admin</h2>
            <p class="text-gray-600">Konten admin sedang dimuat...</p>
        </div>
    `;
}

function loadTukangPageContent() {
    const tukangPage = document.getElementById('tukangPage');
    tukangPage.innerHTML = `
        <!-- Tukang page content will be loaded here -->
        <div class="text-center py-20">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard Tukang</h2>
            <p class="text-gray-600">Konten tukang sedang dimuat...</p>
        </div>
    `;
}

console.log('📱 Main application loaded');