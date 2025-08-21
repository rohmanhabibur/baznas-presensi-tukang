// Utility functions
// Version: 1.0

// Global data storage
window.adminData = [];
window.tukangData = [];
window.presensiData = [];
window.onlineUsers = new Set();
window.activities = [];
window.currentTab = 'presensi';

// Toast notification system
function showToast(message, type = 'info', duration = CONFIG.TOAST_DURATION) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.className = `toast ${colors[type]} text-white p-4 rounded-lg shadow-lg flex items-center space-x-3`;
    toast.innerHTML = `
        <span class="text-xl">${icons[type]}</span>
        <span class="flex-1">${message}</span>
        <button onclick="this.parentElement.remove()" class="text-white hover:text-gray-200">×</button>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, duration);
}

// Activity logging
function logActivity(type, description) {
    activities.unshift({
        id: Date.now(),
        type: type,
        description: description,
        timestamp: new Date(),
        user: auth.getCurrentUser() ? 
              (auth.isAdmin() ? auth.getCurrentUser().name : auth.getCurrentUser().data.name) : 
              'System'
    });
    
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities = activities.slice(0, 50);
    }
    
    updateRecentActivities();
}

// Update recent activities display
function updateRecentActivities() {
    const container = document.getElementById('recentActivities');
    if (!container) return;
    
    if (activities.length === 0) {
        container.innerHTML = '<div class="text-center text-gray-500 py-4">Belum ada aktivitas</div>';
        return;
    }
    
    container.innerHTML = activities.slice(0, 10).map(activity => `
        <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-blue-600 text-xs">
                    ${activity.type === 'Login' ? '🔑' : 
                      activity.type === 'Logout' ? '🚪' : 
                      activity.type === 'Presensi' ? '✅' : '📝'}
                </span>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">${activity.type}</p>
                <p class="text-xs text-gray-600">${activity.description}</p>
                <p class="text-xs text-gray-400 mt-1">${activity.timestamp.toLocaleString('id-ID')}</p>
            </div>
        </div>
    `).join('');
}

// Date and time utilities
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

function updateCurrentDateTime() {
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = new Date().toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// Connection status checker
async function checkConnection() {
    const adminStatus = document.getElementById('connectionStatus');
    const tukangStatus = document.getElementById('tukangConnectionStatus');
    
    if (CONFIG.GOOGLE_SHEETS_URL) {
        try {
            await api.testConnection();
            
            if (adminStatus) {
                adminStatus.innerHTML = '<div class="w-2 h-2 status-online rounded-full mr-2"></div><span>Terhubung</span>';
            }
            if (tukangStatus) {
                tukangStatus.innerHTML = '<div class="w-2 h-2 status-online rounded-full mr-2 online-indicator"></div><span>Online</span>';
            }
        } catch (error) {
            if (adminStatus) {
                adminStatus.innerHTML = '<div class="w-2 h-2 status-warning rounded-full mr-2"></div><span>Mode Offline</span>';
            }
            if (tukangStatus) {
                tukangStatus.innerHTML = '<div class="w-2 h-2 status-warning rounded-full mr-2"></div><span>Offline</span>';
            }
        }
    } else {
        if (adminStatus) {
            adminStatus.innerHTML = '<div class="w-2 h-2 status-offline rounded-full mr-2"></div><span>Tidak dikonfigurasi</span>';
        }
        if (tukangStatus) {
            tukangStatus.innerHTML = '<div class="w-2 h-2 status-offline rounded-full mr-2"></div><span>Offline</span>';
        }
    }
}

// Geolocation utility
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        });
    });
}

// Auto close attendance check
function checkAutoClose() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Check if it's 4:00 PM (16:00)
    if (currentHour === 16 && currentMinute === 0) {
        if (typeof autoCloseAttendance === 'function') {
            autoCloseAttendance();
        }
    }
}

// Refresh all data
async function refreshData() {
    try {
        showToast('Memuat ulang data...', 'info');
        await api.loadAllData();
        
        // Update displays if functions exist
        if (typeof updateAdminStats === 'function') updateAdminStats();
        if (typeof loadPresensiTable === 'function') loadPresensiTable();
        if (typeof loadTukangGrid === 'function') loadTukangGrid();
        if (typeof loadAdminGrid === 'function') loadAdminGrid();
        
        showToast('Data berhasil direfresh!', 'success');
    } catch (error) {
        showToast('Gagal memuat ulang data: ' + error.message, 'error');
    }
}

console.log('🛠️ Utility functions loaded');