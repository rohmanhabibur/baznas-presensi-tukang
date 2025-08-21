// Admin functions and dashboard
// Version: 1.0

class AdminManager {
    constructor() {
        this.currentTab = 'presensi';
        this.selectedTukang = null;
        this.selectedAdmin = null;
    }

    // Load admin page content
    loadAdminPage() {
        const adminPage = document.getElementById('adminPage');
        adminPage.innerHTML = `
            <!-- Admin Header -->
            <div class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-4">
                        <div class="flex items-center space-x-4">
                            <div class="bg-gradient-to-br from-green-600 to-green-700 w-10 h-10 rounded-full flex items-center justify-center">
                                <span class="text-white font-bold">B</span>
                            </div>
                            <div>
                                <h1 class="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                                <p class="text-sm text-gray-600" id="currentDate"></p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <div id="connectionStatus" class="flex items-center text-sm text-gray-600">
                                <div class="w-2 h-2 status-offline rounded-full mr-2"></div>
                                <span>Checking...</span>
                            </div>
                            <button onclick="refreshData()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                🔄 Refresh
                            </button>
                            <button onclick="logout()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Admin Content -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-blue-100 p-3 rounded-full">
                                <span class="text-blue-600 text-xl">👥</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Total Tukang</p>
                                <p class="text-2xl font-bold text-gray-900" id="totalTukang">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-green-100 p-3 rounded-full">
                                <span class="text-green-600 text-xl">✅</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Hadir Hari Ini</p>
                                <p class="text-2xl font-bold text-gray-900" id="hadirHariIni">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-yellow-100 p-3 rounded-full">
                                <span class="text-yellow-600 text-xl">⏰</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Belum Absen</p>
                                <p class="text-2xl font-bold text-gray-900" id="belumAbsen">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-red-100 p-3 rounded-full">
                                <span class="text-red-600 text-xl">❌</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Tidak Hadir</p>
                                <p class="text-2xl font-bold text-gray-900" id="tidakHadir">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="bg-white rounded-xl shadow-sm mb-6">
                    <div class="border-b border-gray-200">
                        <nav class="flex space-x-8 px-6">
                            <button onclick="adminManager.switchTab('presensi')" id="tabPresensi" class="py-4 px-1 border-b-2 border-green-500 font-medium text-sm text-green-600">
                                📊 Data Presensi
                            </button>
                            <button onclick="adminManager.switchTab('tukang')" id="tabTukang" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                                👷 Kelola Tukang
                            </button>
                            <button onclick="adminManager.switchTab('admin')" id="tabAdmin" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                                👨‍💼 Kelola Admin
                            </button>
                            <button onclick="adminManager.switchTab('laporan')" id="tabLaporan" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                                📈 Laporan
                            </button>
                            <button onclick="adminManager.switchTab('aktivitas')" id="tabAktivitas" class="py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700">
                                📝 Aktivitas
                            </button>
                        </nav>
                    </div>

                    <!-- Tab Content -->
                    <div class="p-6">
                        <!-- Presensi Tab -->
                        <div id="contentPresensi" class="tab-content">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-lg font-semibold text-gray-900">Data Presensi Hari Ini</h2>
                                <div class="flex space-x-3">
                                    <button onclick="adminManager.exportPresensi()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                        📊 Export Excel
                                    </button>
                                    <button onclick="adminManager.autoCloseAttendance()" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                        ⏰ Auto Close
                                    </button>
                                </div>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Masuk</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Keluar</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody id="presensiTableBody" class="bg-white divide-y divide-gray-200">
                                        <!-- Data will be loaded here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Tukang Tab -->
                        <div id="contentTukang" class="tab-content hidden">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-lg font-semibold text-gray-900">Kelola Data Tukang</h2>
                                <button onclick="adminManager.showAddTukangModal()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    ➕ Tambah Tukang
                                </button>
                            </div>
                            <div id="tukangGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <!-- Tukang cards will be loaded here -->
                            </div>
                        </div>

                        <!-- Admin Tab -->
                        <div id="contentAdmin" class="tab-content hidden">
                            <div class="flex justify-between items-center mb-6">
                                <h2 class="text-lg font-semibold text-gray-900">Kelola Data Admin</h2>
                                <button onclick="adminManager.showAddAdminModal()" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                                    ➕ Tambah Admin
                                </button>
                            </div>
                            <div id="adminGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <!-- Admin cards will be loaded here -->
                            </div>
                        </div>

                        <!-- Laporan Tab -->
                        <div id="contentLaporan" class="tab-content hidden">
                            <div class="space-y-6">
                                <h2 class="text-lg font-semibold text-gray-900">Laporan Presensi</h2>
                                
                                <!-- Filter Controls -->
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                            <input type="date" id="filterStartDate" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                            <input type="date" id="filterEndDate" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Tukang</label>
                                            <select id="filterTukang" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                                                <option value="">Semua Tukang</option>
                                            </select>
                                        </div>
                                        <div class="flex items-end">
                                            <button onclick="adminManager.generateReport()" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium w-full">
                                                📊 Generate Laporan
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Report Results -->
                                <div id="reportResults" class="hidden">
                                    <div class="bg-white border rounded-lg p-6">
                                        <div class="flex justify-between items-center mb-4">
                                            <h3 class="text-lg font-semibold">Hasil Laporan</h3>
                                            <div class="space-x-2">
                                                <button onclick="adminManager.exportReportPDF()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                                                    📄 PDF
                                                </button>
                                                <button onclick="adminManager.exportReportExcel()" class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
                                                    📊 Excel
                                                </button>
                                            </div>
                                        </div>
                                        <div id="reportContent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Aktivitas Tab -->
                        <div id="contentAktivitas" class="tab-content hidden">
                            <h2 class="text-lg font-semibold text-gray-900 mb-6">Aktivitas Terbaru</h2>
                            <div id="recentActivities" class="space-y-4">
                                <!-- Activities will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Switch between tabs
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('[id^="tab"]').forEach(tab => {
            tab.className = 'py-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700';
        });
        document.getElementById(`tab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).className = 
            'py-4 px-1 border-b-2 border-green-500 font-medium text-sm text-green-600';
        
        // Show/hide content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(`content${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.remove('hidden');
        
        // Load tab-specific content
        switch(tabName) {
            case 'presensi':
                this.loadPresensiTable();
                break;
            case 'tukang':
                this.loadTukangGrid();
                break;
            case 'admin':
                this.loadAdminGrid();
                break;
            case 'laporan':
                this.loadReportFilters();
                break;
            case 'aktivitas':
                updateRecentActivities();
                break;
        }
    }

    // Update admin statistics
    updateAdminStats() {
        const today = new Date().toDateString();
        const todayPresensi = presensiData.filter(p => new Date(p.date).toDateString() === today);
        
        document.getElementById('totalTukang').textContent = tukangData.length;
        document.getElementById('hadirHariIni').textContent = todayPresensi.filter(p => p.status === 'Hadir').length;
        document.getElementById('belumAbsen').textContent = tukangData.length - todayPresensi.length;
        document.getElementById('tidakHadir').textContent = todayPresensi.filter(p => p.status === 'Tidak Hadir').length;
    }

    // Load presensi table
    loadPresensiTable() {
        const tbody = document.getElementById('presensiTableBody');
        if (!tbody) return;
        
        const today = new Date().toDateString();
        const todayPresensi = presensiData.filter(p => new Date(p.date).toDateString() === today);
        
        if (todayPresensi.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                        Belum ada data presensi hari ini
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = todayPresensi.map(presensi => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span class="text-blue-600 font-semibold text-sm">${presensi.nama.charAt(0)}</span>
                        </div>
                        <div class="text-sm font-medium text-gray-900">${presensi.nama}</div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${presensi.jamMasuk || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${presensi.jamKeluar || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        presensi.status === 'Hadir' ? 'bg-green-100 text-green-800' :
                        presensi.status === 'Tidak Hadir' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }">
                        ${presensi.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${presensi.lokasi || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="adminManager.editPresensi('${presensi.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">
                        Edit
                    </button>
                    <button onclick="adminManager.deletePresensi('${presensi.id}')" class="text-red-600 hover:text-red-900">
                        Hapus
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Load tukang grid
    loadTukangGrid() {
        const grid = document.getElementById('tukangGrid');
        if (!grid) return;
        
        if (tukangData.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-gray-400 text-6xl mb-4">👷</div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada data tukang</h3>
                    <p class="text-gray-500">Klik tombol "Tambah Tukang" untuk menambah data tukang baru</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = tukangData.map(tukang => `
            <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-bold text-lg">${tukang.name.charAt(0)}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="adminManager.editTukang('${tukang.id}')" class="text-blue-600 hover:text-blue-800">
                            ✏️
                        </button>
                        <button onclick="adminManager.deleteTukang('${tukang.id}')" class="text-red-600 hover:text-red-800">
                            🗑️
                        </button>
                    </div>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">${tukang.name}</h3>
                <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium">Username:</span> ${tukang.username}</p>
                    <p><span class="font-medium">Telepon:</span> ${tukang.phone || '-'}</p>
                    <p><span class="font-medium">Alamat:</span> ${tukang.address || '-'}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Status:</span>
                        <span class="font-medium text-green-600">Aktif</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load admin grid
    loadAdminGrid() {
        const grid = document.getElementById('adminGrid');
        if (!grid) return;
        
        grid.innerHTML = adminData.map(admin => `
            <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span class="text-purple-600 font-bold text-lg">${admin.name.charAt(0)}</span>
                    </div>
                    <div class="flex space-x-2">
                        <button onclick="adminManager.editAdmin('${admin.username}')" class="text-blue-600 hover:text-blue-800">
                            ✏️
                        </button>
                        ${admin.username !== 'admin' ? `
                            <button onclick="adminManager.deleteAdmin('${admin.username}')" class="text-red-600 hover:text-red-800">
                                🗑️
                            </button>
                        ` : ''}
                    </div>
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">${admin.name}</h3>
                <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium">Username:</span> ${admin.username}</p>
                    <p><span class="font-medium">Email:</span> ${admin.email || '-'}</p>
                    <p><span class="font-medium">Role:</span> ${admin.role || 'Admin'}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Status:</span>
                        <span class="font-medium text-green-600">Aktif</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Show add tukang modal
    showAddTukangModal() {
        const modal = `
            <div id="addTukangModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                    <h3 class="text-lg font-semibold mb-4">Tambah Tukang Baru</h3>
                    <form onsubmit="adminManager.addTukang(event)">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                <input type="text" id="tukangName" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input type="text" id="tukangUsername" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" id="tukangPassword" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                                <input type="tel" id="tukangPhone" class="w-full px-3 py-2 border border-gray-300 rounded-md">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                                <textarea id="tukangAddress" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
                            </div>
                        </div>
                        <div class="flex justify-end space-x-3 mt-6">
                            <button type="button" onclick="adminManager.closeModal('addTukangModal')" class="px-4 py-2 text-gray-600 hover:text-gray-800">
                                Batal
                            </button>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('modalsContainer').innerHTML = modal;
    }

    // Add new tukang
    async addTukang(event) {
        event.preventDefault();
        
        const tukangData = {
            id: Date.now(),
            name: document.getElementById('tukangName').value,
            username: document.getElementById('tukangUsername').value,
            password: document.getElementById('tukangPassword').value,
            phone: document.getElementById('tukangPhone').value,
            address: document.getElementById('tukangAddress').value,
            created_at: new Date().toISOString()
        };
        
        try {
            await api.add(CONFIG.API_ACTIONS.ADD_TUKANG, tukangData);
            
            // Add to local data
            window.tukangData.push(tukangData);
            
            this.closeModal('addTukangModal');
            this.loadTukangGrid();
            this.updateAdminStats();
            
            showToast('Tukang berhasil ditambahkan!', 'success');
            logActivity('Tambah Tukang', `Tukang ${tukangData.name} ditambahkan`);
            
        } catch (error) {
            showToast('Gagal menambahkan tukang: ' + error.message, 'error');
        }
    }

    // Auto close attendance
    async autoCloseAttendance() {
        if (!confirm('Yakin ingin menutup presensi untuk semua tukang yang belum absen keluar?')) {
            return;
        }
        
        try {
            const today = new Date().toDateString();
            const todayPresensi = presensiData.filter(p => 
                new Date(p.date).toDateString() === today && !p.jamKeluar
            );
            
            const currentTime = new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            for (const presensi of todayPresensi) {
                await api.update(CONFIG.API_ACTIONS.UPDATE_PRESENSI, {
                    id: presensi.id,
                    jamKeluar: currentTime
                });
                
                // Update local data
                const index = presensiData.findIndex(p => p.id === presensi.id);
                if (index !== -1) {
                    presensiData[index].jamKeluar = currentTime;
                }
            }
            
            this.loadPresensiTable();
            showToast(`Presensi ditutup untuk ${todayPresensi.length} tukang`, 'success');
            logActivity('Auto Close', `Presensi ditutup otomatis untuk ${todayPresensi.length} tukang`);
            
        } catch (error) {
            showToast('Gagal menutup presensi: ' + error.message, 'error');
        }
    }

    // Export presensi to Excel
    exportPresensi() {
        try {
            const today = new Date().toDateString();
            const todayPresensi = presensiData.filter(p => new Date(p.date).toDateString() === today);
            
            const ws = XLSX.utils.json_to_sheet(todayPresensi.map(p => ({
                'Nama': p.nama,
                'Jam Masuk': p.jamMasuk || '-',
                'Jam Keluar': p.jamKeluar || '-',
                'Status': p.status,
                'Lokasi': p.lokasi || '-',
                'Tanggal': new Date(p.date).toLocaleDateString('id-ID')
            })));
            
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Presensi');
            
            const fileName = `Presensi_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.xlsx`;
            XLSX.writeFile(wb, fileName);
            
            showToast('Data presensi berhasil diekspor!', 'success');
            logActivity('Export', 'Data presensi diekspor ke Excel');
            
        } catch (error) {
            showToast('Gagal mengekspor data: ' + error.message, 'error');
        }
    }

    // Close modal
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.remove();
        }
    }

    // Delete tukang
    async deleteTukang(tukangId) {
        const tukang = tukangData.find(t => t.id == tukangId);
        if (!tukang) return;
        
        if (!confirm(`Yakin ingin menghapus tukang ${tukang.name}? Data presensi terkait juga akan dihapus.`)) {
            return;
        }
        
        try {
            await api.delete(CONFIG.API_ACTIONS.DELETE_TUKANG, { id: tukangId });
            
            // Remove from local data
            window.tukangData = tukangData.filter(t => t.id != tukangId);
            window.presensiData = presensiData.filter(p => p.tukangId != tukangId);
            
            this.loadTukangGrid();
            this.updateAdminStats();
            
            showToast('Tukang berhasil dihapus!', 'success');
            logActivity('Hapus Tukang', `Tukang ${tukang.name} dihapus`);
            
        } catch (error) {
            showToast('Gagal menghapus tukang: ' + error.message, 'error');
        }
    }
}

// Global admin manager instance
window.adminManager = new AdminManager();

// Global functions for backward compatibility
window.updateAdminStats = () => adminManager.updateAdminStats();
window.loadPresensiTable = () => adminManager.loadPresensiTable();
window.loadTukangGrid = () => adminManager.loadTukangGrid();
window.loadAdminGrid = () => adminManager.loadAdminGrid();
window.autoCloseAttendance = () => adminManager.autoCloseAttendance();

console.log('👨‍💼 Admin manager loaded');

