// Tukang functions and dashboard
// Version: 1.0

class TukangManager {
    constructor() {
        this.currentUser = null;
        this.todayPresensi = null;
        this.isAbsenMasukDone = false;
        this.isAbsenKeluarDone = false;
    }

    // Load tukang page content
    loadTukangPage() {
        const tukangPage = document.getElementById('tukangPage');
        const currentUser = auth.getCurrentUser();
        
        if (!currentUser || !currentUser.data) {
            showToast('Data pengguna tidak ditemukan', 'error');
            return;
        }
        
        this.currentUser = currentUser.data;
        
        tukangPage.innerHTML = `
            <!-- Tukang Header -->
            <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <span class="text-2xl font-bold">${this.currentUser.name.charAt(0)}</span>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold">Selamat datang, ${this.currentUser.name}!</h1>
                                <p class="text-green-100" id="currentDateTime"></p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div id="tukangConnectionStatus" class="flex items-center text-sm mb-2">
                                <div class="w-2 h-2 status-offline rounded-full mr-2"></div>
                                <span>Checking...</span>
                            </div>
                            <button onclick="logout()" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Status Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <!-- Status Presensi Hari Ini -->
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-blue-100 p-3 rounded-full">
                                <span class="text-blue-600 text-xl">📅</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Status Hari Ini</p>
                                <p class="text-lg font-bold text-gray-900" id="statusHariIni">Belum Absen</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Jam Masuk -->
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-green-100 p-3 rounded-full">
                                <span class="text-green-600 text-xl">🕐</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Jam Masuk</p>
                                <p class="text-lg font-bold text-gray-900" id="jamMasukHariIni">-</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Jam Keluar -->
                    <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
                        <div class="flex items-center">
                            <div class="bg-orange-100 p-3 rounded-full">
                                <span class="text-orange-600 text-xl">🕕</span>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">Jam Keluar</p>
                                <p class="text-lg font-bold text-gray-900" id="jamKeluarHariIni">-</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Presensi Actions -->
                <div class="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">Presensi Hari Ini</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Absen Masuk -->
                        <div class="text-center">
                            <div class="bg-green-50 rounded-xl p-6 mb-4">
                                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span class="text-green-600 text-2xl">🏃‍♂️</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Absen Masuk</h3>
                                <p class="text-sm text-gray-600 mb-4">Klik tombol di bawah untuk absen masuk</p>
                                <button onclick="tukangManager.absenMasuk()" id="btnAbsenMasuk" 
                                        class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
                                    📍 Absen Masuk
                                </button>
                            </div>
                        </div>
                        
                        <!-- Absen Keluar -->
                        <div class="text-center">
                            <div class="bg-orange-50 rounded-xl p-6 mb-4">
                                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span class="text-orange-600 text-2xl">🚪</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Absen Keluar</h3>
                                <p class="text-sm text-gray-600 mb-4">Klik tombol di bawah untuk absen keluar</p>
                                <button onclick="tukangManager.absenKeluar()" id="btnAbsenKeluar" 
                                        class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full" disabled>
                                    🏠 Absen Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Info Lokasi -->
                    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div class="flex items-start space-x-3">
                            <span class="text-blue-600 text-xl">📍</span>
                            <div>
                                <h4 class="font-semibold text-blue-900">Informasi Lokasi</h4>
                                <p class="text-sm text-blue-700 mt-1">
                                    Sistem akan otomatis mendeteksi lokasi Anda saat melakukan presensi. 
                                    Pastikan GPS/lokasi aktif di perangkat Anda.
                                </p>
                                <div id="lokasiInfo" class="mt-2 text-xs text-blue-600">
                                    <span id="koordinatLokasi">Mendeteksi lokasi...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Riwayat Presensi -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-bold text-gray-900">Riwayat Presensi</h2>
                        <button onclick="tukangManager.exportRiwayat()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            📊 Export
                        </button>
                    </div>
                    
                    <!-- Filter -->
                    <div class="mb-4">
                        <div class="flex space-x-4">
                            <select id="filterBulan" onchange="tukangManager.loadRiwayatPresensi()" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                                <option value="">Semua Bulan</option>
                                <option value="1">Januari</option>
                                <option value="2">Februari</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5">Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </select>
                            <select id="filterTahun" onchange="tukangManager.loadRiwayatPresensi()" class="px-3 py-2 border border-gray-300 rounded-md text-sm">
                                <option value="">Semua Tahun</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Tabel Riwayat -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Masuk</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jam Keluar</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                </tr>
                            </thead>
                            <tbody id="riwayatTableBody" class="bg-white divide-y divide-gray-200">
                                <!-- Data will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Statistik Bulanan -->
                <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div class="text-2xl font-bold text-green-600" id="totalHadir">0</div>
                        <div class="text-sm text-gray-600">Total Hadir</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div class="text-2xl font-bold text-red-600" id="totalTidakHadir">0</div>
                        <div class="text-sm text-gray-600">Tidak Hadir</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div class="text-2xl font-bold text-blue-600" id="totalTerlambat">0</div>
                        <div class="text-sm text-gray-600">Terlambat</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div class="text-2xl font-bold text-purple-600" id="persentaseKehadiran">0%</div>
                        <div class="text-sm text-gray-600">Kehadiran</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Update tukang status
    updateTukangStatus() {
        if (!this.currentUser) return;
        
        const today = new Date().toDateString();
        this.todayPresensi = presensiData.find(p => 
            p.tukangId == this.currentUser.id && 
            new Date(p.date).toDateString() === today
        );
        
        const statusElement = document.getElementById('statusHariIni');
        const jamMasukElement = document.getElementById('jamMasukHariIni');
        const jamKeluarElement = document.getElementById('jamKeluarHariIni');
        const btnAbsenMasuk = document.getElementById('btnAbsenMasuk');
        const btnAbsenKeluar = document.getElementById('btnAbsenKeluar');
        
        if (this.todayPresensi) {
            if (this.todayPresensi.jamMasuk) {
                statusElement.textContent = 'Sudah Absen Masuk';
                statusElement.className = 'text-lg font-bold text-green-600';
                jamMasukElement.textContent = this.todayPresensi.jamMasuk;
                btnAbsenMasuk.disabled = true;
                btnAbsenMasuk.textContent = '✅ Sudah Absen Masuk';
                btnAbsenMasuk.className = 'bg-gray-400 text-white px-6 py-3 rounded-lg font-medium w-full cursor-not-allowed';
                btnAbsenKeluar.disabled = false;
                btnAbsenKeluar.className = 'bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full';
                this.isAbsenMasukDone = true;
            }
            
            if (this.todayPresensi.jamKeluar) {
                statusElement.textContent = 'Sudah Absen Keluar';
                statusElement.className = 'text-lg font-bold text-blue-600';
                jamKeluarElement.textContent = this.todayPresensi.jamKeluar;
                btnAbsenKeluar.disabled = true;
                btnAbsenKeluar.textContent = '✅ Sudah Absen Keluar';
                btnAbsenKeluar.className = 'bg-gray-400 text-white px-6 py-3 rounded-lg font-medium w-full cursor-not-allowed';
                this.isAbsenKeluarDone = true;
            }
        }
        
        // Update location info
        this.updateLocationInfo();
    }

    // Update location info
    async updateLocationInfo() {
        const koordinatElement = document.getElementById('koordinatLokasi');
        
        try {
            const position = await getCurrentPosition();
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            
            koordinatElement.innerHTML = `
                <span class="text-green-600">📍 Lokasi terdeteksi:</span><br>
                <span class="font-mono">${lat}, ${lng}</span><br>
                <span class="text-xs">Akurasi: ±${Math.round(position.coords.accuracy)}m</span>
            `;
        } catch (error) {
            koordinatElement.innerHTML = `
                <span class="text-red-600">❌ Gagal mendeteksi lokasi</span><br>
                <span class="text-xs">${error.message}</span>
            `;
        }
    }

    // Absen masuk
    async absenMasuk() {
        if (this.isAbsenMasukDone) {
            showToast('Anda sudah absen masuk hari ini!', 'warning');
            return;
        }
        
        const btnAbsenMasuk = document.getElementById('btnAbsenMasuk');
        btnAbsenMasuk.disabled = true;
        btnAbsenMasuk.innerHTML = '<div class="loading mr-2"></div>Memproses...';
        
        try {
            // Get location
            const position = await getCurrentPosition();
            const lokasi = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
            
            const currentTime = new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            const presensiData = {
                id: Date.now(),
                tukangId: this.currentUser.id,
                nama: this.currentUser.name,
                date: new Date().toISOString(),
                jamMasuk: currentTime,
                jamKeluar: '',
                status: 'Hadir',
                lokasi: lokasi,
                tanggal: new Date().toLocaleDateString('id-ID'),
                absenBy: 'tukang'
            };
            
            await api.add(CONFIG.API_ACTIONS.ADD_PRESENSI, presensiData);
            
            // Add to local data
            window.presensiData.push(presensiData);
            this.todayPresensi = presensiData;
            
            this.updateTukangStatus();
            this.loadRiwayatPresensi();
            this.updateTukangStats();
            
            showToast('Absen masuk berhasil!', 'success');
            logActivity('Presensi', `${this.currentUser.name} absen masuk pada ${currentTime}`);
            
        } catch (error) {
            showToast('Gagal absen masuk: ' + error.message, 'error');
            btnAbsenMasuk.disabled = false;
            btnAbsenMasuk.textContent = '📍 Absen Masuk';
        }
    }

    // Absen keluar
    async absenKeluar() {
        if (!this.isAbsenMasukDone) {
            showToast('Anda harus absen masuk terlebih dahulu!', 'warning');
            return;
        }
        
        if (this.isAbsenKeluarDone) {
            showToast('Anda sudah absen keluar hari ini!', 'warning');
            return;
        }
        
        const btnAbsenKeluar = document.getElementById('btnAbsenKeluar');
        btnAbsenKeluar.disabled = true;
        btnAbsenKeluar.innerHTML = '<div class="loading mr-2"></div>Memproses...';
        
        try {
            const currentTime = new Date().toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            await api.update(CONFIG.API_ACTIONS.UPDATE_PRESENSI, {
                id: this.todayPresensi.id,
                jamKeluar: currentTime
            });
            
            // Update local data
            const index = presensiData.findIndex(p => p.id === this.todayPresensi.id);
            if (index !== -1) {
                presensiData[index].jamKeluar = currentTime;
                this.todayPresensi.jamKeluar = currentTime;
            }
            
            this.updateTukangStatus();
            this.loadRiwayatPresensi();
            this.updateTukangStats();
            
            showToast('Absen keluar berhasil!', 'success');
            logActivity('Presensi', `${this.currentUser.name} absen keluar pada ${currentTime}`);
            
        } catch (error) {
            showToast('Gagal absen keluar: ' + error.message, 'error');
            btnAbsenKeluar.disabled = false;
            btnAbsenKeluar.textContent = '🏠 Absen Keluar';
        }
    }

    // Load riwayat presensi
    loadRiwayatPresensi() {
        if (!this.currentUser) return;
        
        const tbody = document.getElementById('riwayatTableBody');
        if (!tbody) return;
        
        const filterBulan = document.getElementById('filterBulan')?.value;
        const filterTahun = document.getElementById('filterTahun')?.value;
        
        let riwayat = presensiData.filter(p => p.tukangId == this.currentUser.id);
        
        // Apply filters
        if (filterBulan) {
            riwayat = riwayat.filter(p => new Date(p.date).getMonth() + 1 == filterBulan);
        }
        if (filterTahun) {
            riwayat = riwayat.filter(p => new Date(p.date).getFullYear() == filterTahun);
        }
        
        // Sort by date descending
        riwayat.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (riwayat.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                        Belum ada data presensi
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = riwayat.map(presensi => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${new Date(presensi.date).toLocaleDateString('id-ID', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
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
                    ${presensi.lokasi ? '📍 ' + presensi.lokasi.substring(0, 20) + '...' : '-'}
                </td>
            </tr>
        `).join('');
    }

    // Update tukang statistics
    updateTukangStats() {
        if (!this.currentUser) return;
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyData = presensiData.filter(p => 
            p.tukangId == this.currentUser.id &&
            new Date(p.date).getMonth() === currentMonth &&
            new Date(p.date).getFullYear() === currentYear
        );
        
        const totalHadir = monthlyData.filter(p => p.status === 'Hadir').length;
        const totalTidakHadir = monthlyData.filter(p => p.status === 'Tidak Hadir').length;
        const totalTerlambat = monthlyData.filter(p => {
            if (!p.jamMasuk) return false;
            const jamMasuk = p.jamMasuk.split(':');
            const hour = parseInt(jamMasuk[0]);
            const minute = parseInt(jamMasuk[1]);
            return hour > 8 || (hour === 8 && minute > 0); // Terlambat jika masuk setelah 08:00
        }).length;
        
        const totalPresensi = monthlyData.length;
        const persentaseKehadiran = totalPresensi > 0 ? Math.round((totalHadir / totalPresensi) * 100) : 0;
        
        document.getElementById('totalHadir').textContent = totalHadir;
        document.getElementById('totalTidakHadir').textContent = totalTidakHadir;
        document.getElementById('totalTerlambat').textContent = totalTerlambat;
        document.getElementById('persentaseKehadiran').textContent = persentaseKehadiran + '%';
    }

    // Export riwayat
    exportRiwayat() {
        if (!this.currentUser) return;
        
        try {
            const riwayat = presensiData
                .filter(p => p.tukangId == this.currentUser.id)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            
            const ws = XLSX.utils.json_to_sheet(riwayat.map(p => ({
                'Tanggal': new Date(p.date).toLocaleDateString('id-ID'),
                'Jam Masuk': p.jamMasuk || '-',
                'Jam Keluar': p.jamKeluar || '-',
                'Status': p.status,
                'Lokasi': p.lokasi || '-'
            })));
            
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Riwayat Presensi');
            
            const fileName = `Riwayat_Presensi_${this.currentUser.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.xlsx`;
            XLSX.writeFile(wb, fileName);
            
            showToast('Riwayat presensi berhasil diekspor!', 'success');
            logActivity('Export', `${this.currentUser.name} mengekspor riwayat presensi`);
            
        } catch (error) {
            showToast('Gagal mengekspor riwayat: ' + error.message, 'error');
        }
    }
}

// Global tukang manager instance
window.tukangManager = new TukangManager();

// Global functions for backward compatibility
window.updateTukangStatus = () => tukangManager.updateTukangStatus();
window.loadRiwayatPresensi = () => tukangManager.loadRiwayatPresensi();
window.updateTukangStats = () => tukangManager.updateTukangStats();

console.log('👷 Tukang manager loaded');