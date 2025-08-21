// ==================== GLOBAL VARIABLES ====================
let currentUser = null;
let currentUserType = null;
let currentLocation = null;
let todayPresensi = null;
let allPresensiData = [];
let allTukangData = [];

// Configuration
const DEFAULT_API_URL = 'https://script.google.com/macros/s/AKfycbwVtLBaXUQx1cryLZIrnYikvjeH1IqplbGwPVW1oBdxM5MZZGKlD9mO_TnmGk2r6-Wk/exec';
const CONFIG = {
    API_URL: localStorage.getItem('apiUrl') || DEFAULT_API_URL,
    OFFLINE_MODE: localStorage.getItem('offlineMode') === 'true',
    VERSION: '2.3',
    STORAGE_KEYS: {
        USER: 'currentUser',
        PRESENSI: 'presensiData',
        TUKANG: 'tukangData',
        ACTIVITIES: 'activitiesData',
        LAST_SYNC: 'lastSync'
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistem Presensi v2.3 - Initializing...');

    // Check if user is already logged in
    const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            currentUserType = currentUser.userType;
            showDashboard();
        } catch (error) {
            console.error('Error loading saved user:', error);
            localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        }
    }

    // Initialize geolocation
    initializeLocation();

    // Set default dates
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    document.getElementById('startDate').value = oneWeekAgo.toISOString().split('T')[0];
    document.getElementById('endDate').value = today.toISOString().split('T')[0];
    
    // Check API connection on load
    testConnection();

    // Load offline data if available
    loadOfflineData();

    console.log('✅ Initialization complete');
});

// ==================== AUTHENTICATION ====================
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showToast('Username dan password harus diisi', 'error');
        return;
    }

    setLoading('login', true);

    try {
        // Try online login first
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('LOGIN', {
                username: username,
                password: password,
                userType: 'admin' // Try admin first
            });

            if (result.success) {
                currentUser = {
                    ...result.data.user,
                    userType: result.data.userType
                };
                currentUserType = result.data.userType;

                localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
                showToast('Login berhasil!', 'success');
                showDashboard();
                return;
            } else {
                // Try as tukang if admin login fails
                const tukangResult = await apiCall('LOGIN', {
                    username: username,
                    password: password,
                    userType: 'tukang'
                });

                if (tukangResult.success) {
                    currentUser = {
                        ...tukangResult.data.user,
                        userType: tukangResult.data.userType
                    };
                    currentUserType = tukangResult.data.userType;

                    localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
                    showToast('Login berhasil!', 'success');
                    showDashboard();
                    return;
                }
            }
        }

        // Fallback to offline/demo login
        if (offlineLogin(username, password)) {
            showToast('Login berhasil (Mode Offline)', 'success');
            showDashboard();
        } else {
            showToast('Username atau password salah', 'error');
        }

    } catch (error) {
        console.error('Login error:', error);

        // Try offline login as fallback
        if (offlineLogin(username, password)) {
            showToast('Login berhasil (Mode Offline)', 'warning');
            showDashboard();
        } else {
            showToast('Login gagal: ' + error.message, 'error');
        }
    } finally {
        setLoading('login', false);
    }
}

function offlineLogin(username, password) {
    // Demo accounts
    const demoAccounts = {
        'admin': { password: 'admin123', type: 'admin', name: 'Administrator', email: 'admin@baznas.com' },
        'tukang1': { password: 'pass123', type: 'tukang', name: 'Ahmad Tukang', id: 'T001' },
        'tukang2': { password: 'pass123', type: 'tukang', name: 'Budi Tukang', id: 'T002' }
    };

    const account = demoAccounts[username];
    if (account && account.password === password) {
        currentUser = {
            username: username,
            name: account.name,
            userType: account.type,
            id: account.id || username,
            email: account.email || ''
        };
        currentUserType = account.type;

        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(currentUser));
        return true;
    }

    return false;
}

function logout() {
    if (confirm('Yakin ingin keluar?')) {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
        currentUser = null;
        currentUserType = null;
        todayPresensi = null;

        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginPage').classList.remove('hidden');

        // Reset form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        showToast('Berhasil keluar', 'success');
    }
}

// ==================== DASHBOARD ====================
function showDashboard() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    // Update user info
    const userInfo = document.getElementById('userInfo');
    userInfo.textContent = `${currentUser.name} (${currentUserType === 'admin' ? 'Administrator' : 'Tukang'})`;

    // Show/hide admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    adminElements.forEach(el => {
        if (currentUserType === 'admin') {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Show/hide tukang-only elements
    const tukangElements = document.querySelectorAll('.tukang-only');
    tukangElements.forEach(el => {
        if (currentUserType === 'tukang') {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // Load initial data
    loadDashboardData();

    // Show default tab
    showTab('presensi');
}

async function loadDashboardData() {
    try {
        // Load presensi data
        await loadPresensiData();

        // Load tukang data for admin
        if (currentUserType === 'admin') {
            await loadTukangData();
            await loadActivities();
        }

        // Update stats
        updateStats();

        // Check today's presensi for tukang
        if (currentUserType === 'tukang') {
            checkTodayPresensi();
        }
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showToast('Error loading data: ' + error.message, 'error');
    }
}

// ==================== TAB MANAGEMENT ====================
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.classList.remove('border-green-500', 'text-green-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });

    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.remove('hidden');

    // Add active class to selected tab button
    const activeButton = document.getElementById('tab-' + tabName);
    if (activeButton) {
        activeButton.classList.remove('border-transparent', 'text-gray-500');
        activeButton.classList.add('border-green-500', 'text-green-600');
    }

    // Load tab-specific data
    switch(tabName) {
        case 'presensi':
            refreshPresensi();
            break;
        case 'laporan':
            loadTukangFilter();
            break;
        case 'tukang':
            loadTukangData();
            break;
        case 'admin':
            loadAdminData();
            break;
    }
}

// ==================== LOCATION SERVICES ====================
function initializeLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                updateLocationInfo();
            },
            function(error) {
                console.error('Geolocation error:', error);
                updateLocationInfo('Error: ' + error.message);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    } else {
        updateLocationInfo('Geolocation tidak didukung browser');
    }
}

function updateLocationInfo(errorMessage = null) {
    const locationInfo = document.getElementById('locationInfo');
    if (errorMessage) {
        locationInfo.innerHTML = `<p class="text-red-600">⚠️ ${errorMessage}</p>`;
        return;
    }
    if (currentLocation) {
        locationInfo.innerHTML = `
            <p><strong>Koordinat:</strong> ${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}</p>
            <p><strong>Akurasi:</strong> ±${Math.round(currentLocation.accuracy)} meter</p>
            <p class="text-green-600">✅ Lokasi berhasil dideteksi</p>
        `;
    } else {
        locationInfo.innerHTML = '<p class="text-yellow-600">⏳ Mendeteksi lokasi...</p>';
    }
}

// ==================== PRESENSI FUNCTIONS ====================
async function clockIn() {
    if (!currentLocation) {
        showToast('Lokasi belum terdeteksi. Mohon tunggu...', 'warning');
        initializeLocation();
        return;
    }

    if (todayPresensi && todayPresensi.jamMasuk) {
        showToast('Anda sudah melakukan presensi masuk hari ini', 'warning');
        return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    const dateString = now.toLocaleDateString('id-ID');

    const presensiData = {
        id: Date.now(),
        tukangId: currentUser.id,
        nama: currentUser.name,
        date: dateString,
        jamMasuk: timeString,
        jamKeluar: '',
        status: 'Hadir',
        lokasi: `${currentLocation.latitude},${currentLocation.longitude}`,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };

    try {
        // Try to save online first
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('ADD_PRESENSI', presensiData);
            if (result.success) {
                showToast('Presensi masuk berhasil dicatat!', 'success');
            } else {
                throw new Error(result.message);
            }
        } else {
            // Save offline
            savePresensiOffline(presensiData);
            showToast('Presensi masuk berhasil dicatat (Offline)!', 'success');
        }

        todayPresensi = presensiData;
        updatePresensiStatus();
        refreshPresensi();
    } catch (error) {
        console.error('Clock in error:', error);

        // Fallback to offline save
        savePresensiOffline(presensiData);
        todayPresensi = presensiData;
        updatePresensiStatus();
        refreshPresensi();
        showToast('Presensi masuk dicatat (akan disinkronkan nanti)', 'warning');
    }
}

async function clockOut() {
    if (!todayPresensi || !todayPresensi.jamMasuk) {
        showToast('Anda belum melakukan presensi masuk', 'warning');
        return;
    }

    if (todayPresensi.jamKeluar) {
        showToast('Anda sudah melakukan presensi keluar hari ini', 'warning');
        return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');

    try {
        // Try to update online first
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('UPDATE_PRESENSI', {
                id: todayPresensi.id,
                jamKeluar: timeString
            });
            if (result.success) {
                showToast('Presensi keluar berhasil dicatat!', 'success');
            } else {
                throw new Error(result.message);
            }
        } else {
            // Update offline
            updatePresensiOffline(todayPresensi.id, { jamKeluar: timeString });
            showToast('Presensi keluar berhasil dicatat (Offline)!', 'success');
        }

        todayPresensi.jamKeluar = timeString;
        todayPresensi.updatedAt = now.toISOString();
        updatePresensiStatus();
        refreshPresensi();
    } catch (error) {
        console.error('Clock out error:', error);

        // Fallback to offline update
        updatePresensiOffline(todayPresensi.id, { jamKeluar: timeString });
        todayPresensi.jamKeluar = timeString;
        todayPresensi.updatedAt = now.toISOString();
        updatePresensiStatus();
        refreshPresensi();
        showToast('Presensi keluar dicatat (akan disinkronkan nanti)', 'warning');
    }
}

function checkTodayPresensi() {
    const today = new Date().toLocaleDateString('id-ID');
    // Check in loaded data
    todayPresensi = allPresensiData.find(p => p.tukangId === currentUser.id && p.date === today);
    updatePresensiStatus();
}

function updatePresensiStatus() {
    const statusDiv = document.getElementById('todayPresensiStatus');
    const clockInBtn = document.getElementById('clockInBtn');
    const clockOutBtn = document.getElementById('clockOutBtn');

    if (!todayPresensi) {
        statusDiv.innerHTML = `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-blue-800 font-medium">📅 Belum presensi hari ini</p>
                <p class="text-blue-600 text-sm">Silakan lakukan presensi masuk</p>
            </div>
        `;
        clockInBtn.disabled = false;
        clockOutBtn.disabled = true;
    } else if (todayPresensi.jamMasuk && !todayPresensi.jamKeluar) {
        statusDiv.innerHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <p class="text-green-800 font-medium">✅ Sudah presensi masuk</p>
                <p class="text-green-600 text-sm">Masuk: ${todayPresensi.jamMasuk}</p>
                <p class="text-green-600 text-sm">Jangan lupa presensi keluar</p>
            </div>
        `;
        clockInBtn.disabled = true;
        clockOutBtn.disabled = false;
    } else if (todayPresensi.jamMasuk && todayPresensi.jamKeluar) {
        const duration = calculateDuration(todayPresensi.jamMasuk, todayPresensi.jamKeluar);
        statusDiv.innerHTML = `
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p class="text-gray-800 font-medium">✅ Presensi hari ini selesai</p>
                <p class="text-gray-600 text-sm">Masuk: ${todayPresensi.jamMasuk} | Keluar: ${todayPresensi.jamKeluar}</p>
                <p class="text-gray-600 text-sm">Durasi kerja: ${duration}</p>
            </div>
        `;
        clockInBtn.disabled = true;
        clockOutBtn.disabled = true;
    }
}

async function refreshPresensi() {
    try {
        await loadPresensiData();
        updateTodayAttendanceList();
        updateStats();
        if (currentUserType === 'tukang') {
            checkTodayPresensi();
        }
        showToast('Data presensi berhasil diperbarui', 'success');
    } catch (error) {
        console.error('Error refreshing presensi:', error);
        showToast('Error memperbarui data: ' + error.message, 'error');
    }
}

function updateTodayAttendanceList() {
    const tbody = document.getElementById('todayAttendanceList');
    const today = new Date().toLocaleDateString('id-ID');
    const todayData = allPresensiData.filter(p => p.date === today);

    tbody.innerHTML = '';

    if (todayData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-8 text-gray-500">
                    Tidak ada presensi hari ini
                </td>
            </tr>
        `;
        return;
    }

    todayData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    todayData.forEach(p => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        let statusClass = '';
        if (p.status === 'Hadir') {
            statusClass = 'status-hadir';
        } else if (p.status === 'Sakit') {
            statusClass = 'status-sakit';
        } else if (p.status === 'Izin') {
            statusClass = 'status-izin';
        } else {
            statusClass = 'status-alpha';
        }

        row.innerHTML = `
            <td class="py-2 px-3 text-sm text-gray-700">${p.nama}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${p.jamMasuk || '-'}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${p.jamKeluar || '-'}</td>
            <td class="py-2 px-3 text-sm">
                <span class="status-badge ${statusClass}">${p.status}</span>
            </td>
            <td class="py-2 px-3 text-xs text-gray-500">${p.lokasi ? '📍 Tersedia' : 'Lokasi tidak tersedia'}</td>
        `;
        tbody.appendChild(row);
    });
}

function updateStats() {
    const today = new Date().toLocaleDateString('id-ID');
    const todayData = allPresensiData.filter(p => p.date === today);

    const presentCount = todayData.filter(p => p.status === 'Hadir' || p.status === 'Izin' || p.status === 'Sakit').length;
    const totalTukang = allTukangData.length;
    const absentCount = totalTukang - presentCount;
    const lateCount = todayData.filter(p => p.status === 'Hadir' && p.jamMasuk && p.jamMasuk.split(':')[0] > '08').length;

    document.getElementById('todayPresent').textContent = presentCount;
    document.getElementById('totalTukang').textContent = totalTukang;
    document.getElementById('lateToday').textContent = lateCount;
    document.getElementById('absentToday').textContent = absentCount;
}

// ==================== LAPORAN FUNCTIONS ====================
function loadTukangFilter() {
    const select = document.getElementById('tukangFilter');
    select.innerHTML = '<option value="">Semua Tukang</option>';
    allTukangData.forEach(tukang => {
        const option = document.createElement('option');
        option.value = tukang.id;
        option.textContent = tukang.nama;
        select.appendChild(option);
    });
}

async function generateReport() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const tukangId = document.getElementById('tukangFilter').value;

    if (!startDate || !endDate) {
        showToast('Pilih tanggal awal dan akhir untuk laporan', 'warning');
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        showToast('Tanggal awal tidak boleh lebih dari tanggal akhir', 'error');
        return;
    }

    try {
        // Fetch all data for the date range
        const allData = await loadPresensiData();

        const filteredData = allData.filter(p => {
            const recordDate = new Date(p.date.split('/').reverse().join('-')); // Format: dd/mm/yyyy to yyyy-mm-dd
            const matchDate = recordDate >= start && recordDate <= end;
            const matchTukang = !tukangId || p.tukangId === tukangId;
            return matchDate && matchTukang;
        });

        updateReportTable(filteredData);
        updateReportSummary(filteredData);
        showToast('Laporan berhasil dibuat', 'success');
    } catch (error) {
        console.error('Error generating report:', error);
        showToast('Gagal membuat laporan: ' + error.message, 'error');
    }
}

function updateReportSummary(data) {
    document.getElementById('reportSummary').classList.remove('hidden');

    const hadircount = data.filter(p => p.status === 'Hadir').length;
    const izinCount = data.filter(p => p.status === 'Izin').length;
    const sakitCount = data.filter(p => p.status === 'Sakit').length;
    const alphaCount = data.filter(p => p.status === 'Alpha').length;

    document.getElementById('reportTotalHadir').textContent = hadircount;
    document.getElementById('reportTotalIzin').textContent = izinCount;
    document.getElementById('reportTotalSakit').textContent = sakitCount;
    document.getElementById('reportTotalAlpha').textContent = alphaCount;
}

function updateReportTable(data) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8 text-gray-500">
                    Tidak ada data untuk filter yang dipilih
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(p => {
        const row = document.createElement('tr');
        row.classList.add('border-b');

        let duration = '-';
        if (p.jamMasuk && p.jamKeluar) {
            duration = calculateDuration(p.jamMasuk, p.jamKeluar);
        }

        let statusClass = '';
        if (p.status === 'Hadir') {
            statusClass = 'status-hadir';
        } else if (p.status === 'Izin') {
            statusClass = 'status-izin';
        } else if (p.status === 'Sakit') {
            statusClass = 'status-sakit';
        } else {
            statusClass = 'status-alpha';
        }

        row.innerHTML = `
            <td class="py-2 px-3 text-sm text-gray-700 whitespace-nowrap">${p.date}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${p.nama}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${p.jamMasuk || '-'}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${p.jamKeluar || '-'}</td>
            <td class="py-2 px-3 text-sm">
                <span class="status-badge ${statusClass}">${p.status}</span>
            </td>
            <td class="py-2 px-3 text-sm text-gray-700">${duration}</td>
        `;
        tbody.appendChild(row);
    });
}

// ==================== DATA TUKANG FUNCTIONS (ADMIN) ====================
function showAddTukangForm() {
    document.getElementById('addTukangForm').classList.remove('hidden');
}

function hideAddTukangForm() {
    document.getElementById('addTukangForm').classList.add('hidden');
    document.getElementById('newTukangName').value = '';
    document.getElementById('newTukangUsername').value = '';
    document.getElementById('newTukangPassword').value = '';
    document.getElementById('newTukangPhone').value = '';
    document.getElementById('newTukangAddress').value = '';
}

async function addTukang() {
    const name = document.getElementById('newTukangName').value.trim();
    const username = document.getElementById('newTukangUsername').value.trim();
    const password = document.getElementById('newTukangPassword').value.trim();
    const phone = document.getElementById('newTukangPhone').value.trim();
    const address = document.getElementById('newTukangAddress').value.trim();

    if (!name || !username || !password) {
        showToast('Nama, username, dan password harus diisi', 'error');
        return;
    }

    const newTukang = {
        id: 'T' + Date.now(),
        nama: name,
        username: username,
        password: password,
        phone: phone,
        address: address,
        status: 'Aktif',
        createdAt: new Date().toISOString()
    };

    try {
        // Try to save online
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('ADD_TUKANG', newTukang);
            if (result.success) {
                showToast('Tukang berhasil ditambahkan!', 'success');
            } else {
                throw new Error(result.message);
            }
        } else {
            // Save offline
            saveTukangOffline(newTukang);
            showToast('Tukang berhasil ditambahkan (Offline)!', 'success');
        }

        await loadTukangData();
        hideAddTukangForm();
    } catch (error) {
        console.error('Add tukang error:', error);
        showToast('Gagal menambah tukang: ' + error.message, 'error');
    }
}

async function loadTukangData() {
    try {
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('GET_TUKANG');
            if (result.success) {
                allTukangData = result.data.tukang;
                saveTukangOffline(allTukangData, true); // Overwrite local data
            } else {
                throw new Error(result.message);
            }
        } else {
            allTukangData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG)) || [];
            console.log('Loaded tukang data offline:', allTukangData.length, 'records');
        }
        updateTukangTable();
    } catch (error) {
        console.error('Load tukang data error:', error);
        showToast('Gagal memuat data tukang. Menggunakan data offline...', 'warning');
        allTukangData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG)) || [];
        updateTukangTable();
    }
}

function updateTukangTable() {
    const tbody = document.getElementById('tukangTableBody');
    tbody.innerHTML = '';

    if (allTukangData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-8 text-gray-500">
                    Tidak ada data tukang
                </td>
            </tr>
        `;
        return;
    }

    allTukangData.forEach(tukang => {
        const row = document.createElement('tr');
        row.classList.add('border-b');
        row.innerHTML = `
            <td class="py-2 px-3 text-sm text-gray-700">${tukang.id}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${tukang.nama}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${tukang.username}</td>
            <td class="py-2 px-3 text-sm text-gray-700">${tukang.phone || '-'}</td>
            <td class="py-2 px-3 text-sm">
                <span class="status-badge ${tukang.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${tukang.status}
                </span>
            </td>
            <td class="py-2 px-3 text-sm">
                <button onclick="editTukang('${tukang.id}')" class="text-blue-500 hover:text-blue-700 mr-2">
                    ✏️
                </button>
                <button onclick="deleteTukang('${tukang.id}')" class="text-red-500 hover:text-red-700">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editTukang(id) {
    // Placeholder for future edit functionality
    showToast('Fungsi edit belum tersedia', 'info');
}

async function deleteTukang(id) {
    if (confirm('Yakin ingin menghapus data tukang ini?')) {
        try {
            if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                const result = await apiCall('DELETE_TUKANG', { id: id });
                if (result.success) {
                    showToast('Tukang berhasil dihapus!', 'success');
                } else {
                    throw new Error(result.message);
                }
            } else {
                deleteTukangOffline(id);
                showToast('Tukang berhasil dihapus (Offline)!', 'success');
            }
            await loadTukangData();
        } catch (error) {
            console.error('Delete tukang error:', error);
            showToast('Gagal menghapus tukang: ' + error.message, 'error');
        }
    }
}

// ==================== ADMIN FUNCTIONS ====================
async function loadAdminData() {
    try {
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const presensiCount = (await apiCall('GET_PRESENSI_COUNT')).data.count;
            const tukangCount = (await apiCall('GET_TUKANG_COUNT')).data.count;
            const activityCount = (await apiCall('GET_ACTIVITY_COUNT')).data.count;
            const recentActivities = (await apiCall('GET_RECENT_ACTIVITIES')).data.activities;

            document.getElementById('dbPresensiCount').textContent = presensiCount;
            document.getElementById('dbTukangCount').textContent = tukangCount;
            document.getElementById('dbActivityCount').textContent = activityCount;
            updateRecentActivities(recentActivities);
        }
        updateApiStatus(true);
    } catch (error) {
        console.error('Load admin data error:', error);
        showToast('Gagal memuat data admin dari server.', 'error');
        updateApiStatus(false);
    }
}

function updateRecentActivities(activities) {
    const container = document.getElementById('recentActivities');
    container.innerHTML = '';

    if (activities.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-500 py-4">Tidak ada aktivitas terbaru</div>`;
        return;
    }

    activities.forEach(activity => {
        const item = document.createElement('div');
        item.classList.add('p-3', 'bg-gray-50', 'rounded-lg', 'border', 'border-gray-200');
        item.innerHTML = `
            <p class="text-sm font-medium text-gray-800">${activity.message}</p>
            <p class="text-xs text-gray-500 mt-1">${new Date(activity.timestamp).toLocaleString('id-ID')}</p>
        `;
        container.appendChild(item);
    });
}

async function fullSync() {
    showToast('Memulai sinkronisasi penuh...', 'info');
    setLoading('sync', true);
    try {
        if (!CONFIG.API_URL || CONFIG.OFFLINE_MODE) {
            throw new Error('Sync hanya bisa dilakukan dalam mode online');
        }

        const localPresensi = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)) || [];
        const localTukang = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG)) || [];

        // Send local data to server
        await apiCall('SYNC_DATA', {
            presensi: localPresensi,
            tukang: localTukang
        });

        // Fetch fresh data from server
        await loadPresensiData();
        await loadTukangData();
        await loadActivities();

        localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        showToast('Sinkronisasi berhasil!', 'success');
    } catch (error) {
        console.error('Full sync error:', error);
        showToast('Sinkronisasi gagal: ' + error.message, 'error');
    } finally {
        setLoading('sync', false);
        updateAdminData();
    }
}

function clearLocalData() {
    if (confirm('Yakin ingin menghapus semua data lokal? Data yang belum disinkronkan akan hilang!')) {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.PRESENSI);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TUKANG);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.ACTIVITIES);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.LAST_SYNC);
        showToast('Semua data lokal berhasil dihapus!', 'success');
        allPresensiData = [];
        allTukangData = [];
        updateTodayAttendanceList();
        updateTukangTable();
        updateAdminData();
    }
}

function backupData() {
    const data = {
        presensi: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)),
        tukang: JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG))
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `presensi_backup_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    showToast('Data berhasil di-backup!', 'success');
}

function importData() {
    // Placeholder for future import functionality
    showToast('Fungsi import belum tersedia', 'info');
}

function showSystemLogs() {
    // Placeholder for future log viewer
    showToast('Fungsi log sistem belum tersedia', 'info');
}

// ==================== UTILITY FUNCTIONS ====================
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.classList.add('toast', 'p-4', 'rounded-lg', 'shadow-lg', 'text-white', 'font-medium', 'flex', 'items-center', 'space-x-2');

    switch(type) {
        case 'success':
            toast.classList.add('bg-green-500');
            toast.innerHTML = '<span>✅</span> ' + message;
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            toast.innerHTML = '<span>❌</span> ' + message;
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            toast.innerHTML = '<span>⚠️</span> ' + message;
            break;
        default:
            toast.classList.add('bg-blue-500');
            toast.innerHTML = '<span>ℹ️</span> ' + message;
            break;
    }

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function setLoading(elementId, isLoading) {
    const btn = document.getElementById(elementId + 'Btn');
    const text = document.getElementById(elementId + 'Text');
    const loading = document.getElementById(elementId + 'Loading');

    if (btn && text && loading) {
        btn.disabled = isLoading;
        if (isLoading) {
            text.classList.add('hidden');
            loading.classList.remove('hidden');
        } else {
            text.classList.remove('hidden');
            loading.classList.add('hidden');
        }
    }
}

async function apiCall(action, data = {}) {
    if (!CONFIG.API_URL) {
        throw new Error('URL API belum dikonfigurasi. Silakan atur di Pengaturan.');
    }

    const url = `${CONFIG.API_URL}?action=${action}`;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.success === false) {
            throw new Error(result.message || 'Error from API');
        }
        return result;
    } catch (error) {
        console.error('API call failed:', error);
        throw new Error('Koneksi ke server gagal. Cek URL API atau jaringan Anda.');
    }
}

async function testConnection() {
    const loginCard = document.getElementById('loginCard');
    const connectionStatusIcon = document.getElementById('connectionStatus');

    if (CONFIG.OFFLINE_MODE) {
        loginCard.classList.remove('lightning-animation');
        if (connectionStatusIcon) connectionStatusIcon.classList.remove('blink-animation');
        return;
    }
    
    // Check if the URL is configured and not the default placeholder
    if (!CONFIG.API_URL || CONFIG.API_URL === DEFAULT_API_URL) {
        loginCard.classList.remove('lightning-animation');
        if (connectionStatusIcon) connectionStatusIcon.classList.remove('blink-animation');
        return;
    }

    try {
        await apiCall('GET_TUKANG_COUNT');
        loginCard.classList.add('lightning-animation');
        if (connectionStatusIcon) connectionStatusIcon.classList.add('blink-animation');
        console.log('API connection successful.');
    } catch (error) {
        console.error('API connection failed:', error);
        loginCard.classList.remove('lightning-animation');
        if (connectionStatusIcon) connectionStatusIcon.classList.remove('blink-animation');
    }
}

function savePresensiOffline(data, overwrite = false) {
    let existingData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)) || [];
    if (overwrite) {
        existingData = data;
    } else {
        existingData.push(data);
    }
    localStorage.setItem(CONFIG.STORAGE_KEYS.PRESENSI, JSON.stringify(existingData));
}

function updatePresensiOffline(id, newData) {
    let existingData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)) || [];
    const index = existingData.findIndex(p => p.id === id);
    if (index !== -1) {
        existingData[index] = { ...existingData[index], ...newData };
        localStorage.setItem(CONFIG.STORAGE_KEYS.PRESENSI, JSON.stringify(existingData));
    }
}

async function loadPresensiData() {
    try {
        if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
            const result = await apiCall('GET_PRESENSI');
            if (result.success) {
                allPresensiData = result.data.presensi;
                savePresensiOffline(allPresensiData, true); // Overwrite local data
            } else {
                throw new Error(result.message);
            }
        } else {
            allPresensiData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)) || [];
            console.log('Loaded presensi data offline:', allPresensiData.length, 'records');
        }
    } catch (error) {
        console.error('Load presensi data error:', error);
        showToast('Gagal memuat data presensi. Menggunakan data offline...', 'warning');
        allPresensiData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PRESENSI)) || [];
    }
}

function saveTukangOffline(data, overwrite = false) {
    let existingData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG)) || [];
    if (overwrite) {
        existingData = data;
    } else {
        existingData.push(data);
    }
    localStorage.setItem(CONFIG.STORAGE_KEYS.TUKANG, JSON.stringify(existingData));
}

function deleteTukangOffline(id) {
    let existingData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TUKANG)) || [];
    const updatedData = existingData.filter(tukang => tukang.id !== id);
    localStorage.setItem(CONFIG.STORAGE_KEYS.TUKANG, JSON.stringify(updatedData));
}

async function loadActivities() {
    // Placeholder for future activity log loading
}

function updateAdminData() {
    // This function is for updating admin data without a full reload
    if (currentUserType === 'admin') {
        loadAdminData();
    }
}

function calculateDuration(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    const diff = endDate - startDate;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}j ${minutes}m`;
}