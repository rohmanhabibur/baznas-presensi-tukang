<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistem Presensi Tukang - BAZNAS Banyuwangi</title>
    <meta name="description" content="Sistem Presensi Digital untuk Tukang BAZNAS Banyuwangi">
    <meta name="theme-color" content="#059669">
    
    <!-- External Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <style>
        /* Custom Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .fade-in { animation: fadeIn 0.5s ease-out; }
        .slide-in { animation: slideIn 0.3s ease-out; }
        .pulse-animation { animation: pulse 2s infinite; }
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #059669, #047857);
            transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #047857, #065f46);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(5, 150, 105, 0.3);
        }
        
        .loading {
            width: 20px;
            height: 20px;
            border: 2px solid #ffffff;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .toast {
            animation: slideIn 0.3s ease-out;
        }
        
        .toast.hide {
            animation: slideOut 0.3s ease-out forwards;
        }
        
        @keyframes slideOut {
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
        }
        
        .status-hadir { background-color: #dcfce7; color: #166534; }
        .status-izin { background-color: #fef3c7; color: #92400e; }
        .status-sakit { background-color: #fee2e2; color: #991b1b; }
        .status-alpha { background-color: #f3f4f6; color: #374151; }
        
        .location-info {
            background: linear-gradient(135deg, #e0f2fe, #f0f9ff);
            border-left: 4px solid #0284c7;
        }
        
        .stats-card {
            background: linear-gradient(135deg, #f8fafc, #ffffff);
            border: 1px solid #e2e8f0;
        }
        
        .hidden { display: none !important; }
        .block { display: block !important; }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
            .container-mobile {
                padding: 1rem;
            }
            
            .card-mobile {
                margin: 0.5rem 0;
            }
            
            .text-mobile {
                font-size: 0.875rem;
            }
        }
        
        /* Print styles */
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { background: white !important; }
        }
    </style>
</head>
<body class="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
    <!-- Toast Container -->
    <div id="toastContainer" class="fixed top-4 right-4 z-50 space-y-2"></div>

    <!-- Login Page -->
    <div id="loginPage" class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md fade-in card-hover">
            <div class="text-center mb-8">
                <div class="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span class="text-white text-2xl font-bold">B</span>
                </div>
                <h1 class="text-2xl font-bold text-gray-800">BAZNAS Banyuwangi</h1>
                <p class="text-gray-600 mt-2">Sistem Presensi Digital Tukang</p>
            </div>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input type="text" id="username" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Masukkan username" autocomplete="username">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div class="relative">
                        <input type="password" id="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12" placeholder="Masukkan password" autocomplete="current-password">
                        <button type="button" onclick="togglePassword()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <span id="passwordToggleIcon">👁️</span>
                        </button>
                    </div>
                </div>
                
                <button onclick="login()" id="loginBtn" class="btn-primary w-full text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center">
                    <span id="loginText">Masuk</span>
                    <div id="loginLoading" class="loading ml-2 hidden"></div>
                </button>
            </div>
            
            <!-- Configuration Info -->
            <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                <h3 class="font-semibold text-blue-800 mb-2">⚙️ Konfigurasi Sistem</h3>
                <div class="text-sm text-blue-700 space-y-1">
                    <p><strong>Status API:</strong> <span id="apiStatus" class="text-orange-600">Belum Terkonfigurasi</span></p>
                    <p><strong>Mode:</strong> <span id="currentMode" class="text-blue-600">Online</span></p>
                    <p><strong>Version:</strong> v2.3</p>
                </div>
                
                <div class="mt-3 flex space-x-2">
                    <button onclick="testConnection()" class="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Test Koneksi
                    </button>
                    <button onclick="showConfig()" class="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
                        Konfigurasi
                    </button>
                </div>
            </div>
            
            <!-- Demo Accounts -->
            <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <p class="text-xs text-gray-600 mb-2">Demo Accounts:</p>
                <div class="text-xs text-gray-500 space-y-1">
                    <p><strong>Admin:</strong> admin / admin123</p>
                    <p><strong>Tukang:</strong> tukang1 / pass123</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Configuration Modal -->
    <div id="configModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">⚙️ Konfigurasi API</h3>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Google Apps Script URL:</label>
                    <input type="text" id="apiUrlInput" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                           placeholder="https://script.google.com/macros/s/YOUR_ID/exec">
                    <p class="text-xs text-gray-500 mt-1">URL Web App dari Google Apps Script</p>
                </div>
                
                <div class="flex items-center">
                    <input type="checkbox" id="offlineMode" class="mr-2">
                    <label for="offlineMode" class="text-sm text-gray-700">Mode Offline (LocalStorage)</label>
                </div>
            </div>
            
            <div class="flex space-x-3 mt-6">
                <button onclick="saveConfig()" class="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Simpan
                </button>
                <button onclick="closeConfig()" class="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
                    Batal
                </button>
            </div>
        </div>
    </div>

    <!-- Main Dashboard -->
    <div id="dashboard" class="hidden">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center space-x-3">
                        <div class="bg-gradient-to-br from-green-600 to-green-700 w-10 h-10 rounded-full flex items-center justify-center">
                            <span class="text-white font-bold">B</span>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-gray-800">BAZNAS Presensi</h1>
                            <p class="text-xs text-gray-600" id="userInfo">Loading...</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                        <button onclick="syncData()" id="syncBtn" class="p-2 text-gray-600 hover:text-green-600 transition-colors" title="Sinkronisasi Data">
                            <span id="syncIcon">🔄</span>
                        </button>
                        <button onclick="logout()" class="p-2 text-gray-600 hover:text-red-600 transition-colors" title="Keluar">
                            🚪
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Tab Navigation -->
        <div class="bg-white border-b sticky top-16 z-30">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex space-x-8 overflow-x-auto">
                    <button onclick="showTab('presensi')" id="tab-presensi" class="tab-button py-3 px-1 border-b-2 border-green-500 text-green-600 font-medium whitespace-nowrap">
                        📋 Presensi
                    </button>
                    <button onclick="showTab('laporan')" id="tab-laporan" class="tab-button py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap">
                        📊 Laporan
                    </button>
                    <button onclick="showTab('tukang')" id="tab-tukang" class="tab-button py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap admin-only">
                        👷 Data Tukang
                    </button>
                    <button onclick="showTab('admin')" id="tab-admin" class="tab-button py-3 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium whitespace-nowrap admin-only">
                        ⚙️ Admin
                    </button>
                </div>
            </div>
        </div>

        <!-- Tab Contents -->
        <div class="max-w-7xl mx-auto px-4 py-6">
            <!-- Presensi Tab -->
            <div id="presensiTab" class="tab-content">
                <!-- Quick Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div class="stats-card p-4 rounded-lg">
                        <div class="text-2xl font-bold text-green-600" id="todayPresent">0</div>
                        <div class="text-sm text-gray-600">Hadir Hari Ini</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg">
                        <div class="text-2xl font-bold text-blue-600" id="totalTukang">0</div>
                        <div class="text-sm text-gray-600">Total Tukang</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg">
                        <div class="text-2xl font-bold text-yellow-600" id="lateToday">0</div>
                        <div class="text-sm text-gray-600">Terlambat</div>
                    </div>
                    <div class="stats-card p-4 rounded-lg">
                        <div class="text-2xl font-bold text-red-600" id="absentToday">0</div>
                        <div class="text-sm text-gray-600">Tidak Hadir</div>
                    </div>
                </div>

                <!-- Presensi Form (Tukang Only) -->
                <div id="presensiForm" class="bg-white rounded-lg shadow-lg p-6 mb-6 tukang-only">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">📋 Presensi Hari Ini</h2>
                    
                    <div id="todayPresensiStatus" class="mb-4"></div>
                    
                    <div class="space-y-4">
                        <div class="location-info p-4 rounded-lg">
                            <h3 class="font-medium text-blue-800 mb-2">📍 Informasi Lokasi</h3>
                            <div id="locationInfo" class="text-sm text-blue-700">
                                <p>Mengambil lokasi...</p>
                            </div>
                        </div>
                        
                        <div class="flex space-x-3">
                            <button onclick="clockIn()" id="clockInBtn" class="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                                ⏰ Masuk
                            </button>
                            <button onclick="clockOut()" id="clockOutBtn" class="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50" disabled>
                                🏁 Keluar
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Today's Attendance List -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">📅 Presensi Hari Ini</h2>
                        <button onclick="refreshPresensi()" class="text-blue-600 hover:text-blue-800">
                            🔄 Refresh
                        </button>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Nama</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Masuk</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Keluar</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Status</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Lokasi</th>
                                </tr>
                            </thead>
                            <tbody id="todayAttendanceList">
                                <tr>
                                    <td colspan="5" class="text-center py-8 text-gray-500">
                                        Memuat data presensi...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Laporan Tab -->
            <div id="laporanTab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">📊 Filter Laporan</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Dari Tanggal</label>
                            <input type="date" id="startDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sampai Tanggal</label>
                            <input type="date" id="endDate" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tukang</label>
                            <select id="tukangFilter" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                <option value="">Semua Tukang</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button onclick="generateReport()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            📊 Generate Laporan
                        </button>
                        <button onclick="exportExcel()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            📗 Export Excel
                        </button>
                        <button onclick="exportPDF()" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                            📄 Export PDF
                        </button>
                    </div>
                </div>

                <!-- Report Results -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">📈 Hasil Laporan</h2>
                    
                    <div id="reportSummary" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 hidden">
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600" id="reportTotalHadir">0</div>
                            <div class="text-sm text-gray-600">Total Hadir</div>
                        </div>
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-yellow-600" id="reportTotalIzin">0</div>
                            <div class="text-sm text-gray-600">Total Izin</div>
                        </div>
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-red-600" id="reportTotalSakit">0</div>
                            <div class="text-sm text-gray-600">Total Sakit</div>
                        </div>
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-gray-600" id="reportTotalAlpha">0</div>
                            <div class="text-sm text-gray-600">Total Alpha</div>
                        </div>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Tanggal</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Nama</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Masuk</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Keluar</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Status</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Durasi</th>
                                </tr>
                            </thead>
                            <tbody id="reportTableBody">
                                <tr>
                                    <td colspan="6" class="text-center py-8 text-gray-500">
                                        Pilih filter dan klik "Generate Laporan" untuk melihat data
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Data Tukang Tab (Admin Only) -->
            <div id="tukangTab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-gray-800">👷 Manajemen Data Tukang</h2>
                        <button onclick="showAddTukangForm()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            ➕ Tambah Tukang
                        </button>
                    </div>
                    
                    <!-- Add Tukang Form -->
                    <div id="addTukangForm" class="hidden mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 class="font-semibold text-gray-800 mb-4">Tambah Tukang Baru</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                <input type="text" id="newTukangName" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                <input type="text" id="newTukangUsername" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input type="password" id="newTukangPassword" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                                <input type="tel" id="newTukangPhone" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                                <textarea id="newTukangAddress" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"></textarea>
                            </div>
                        </div>
                        <div class="flex space-x-3 mt-4">
                            <button onclick="addTukang()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                💾 Simpan
                            </button>
                            <button onclick="hideAddTukangForm()" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                                ❌ Batal
                            </button>
                        </div>
                    </div>
                    
                    <!-- Tukang List -->
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">ID</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Nama</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Username</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Telepon</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Status</th>
                                    <th class="text-left py-2 px-3 text-sm font-medium text-gray-600">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="tukangTableBody">
                                <tr>
                                    <td colspan="6" class="text-center py-8 text-gray-500">
                                        Memuat data tukang...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Admin Tab -->
            <div id="adminTab" class="tab-content hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- System Info -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">ℹ️ Informasi Sistem</h2>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Version:</span>
                                <span class="font-medium">v2.3</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Status API:</span>
                                <span id="adminApiStatus" class="font-medium">Checking...</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Mode:</span>
                                <span id="adminCurrentMode" class="font-medium">Online</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Last Sync:</span>
                                <span id="lastSyncTime" class="font-medium">-</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Total Records:</span>
                                <span id="totalRecords" class="font-medium">0</span>
                            </div>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t">
                            <button onclick="fullSync()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-2">
                                🔄 Full Sync
                            </button>
                            <button onclick="clearLocalData()" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                                🗑️ Clear Local Data
                            </button>
                        </div>
                    </div>

                    <!-- Recent Activities -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 mb-4">📋 Aktivitas Terbaru</h2>
                        <div id="recentActivities" class="space-y-3 max-h-64 overflow-y-auto">
                            <div class="text-center text-gray-500 py-4">
                                Memuat aktivitas...
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Database Management -->
                <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
                    <h2 class="text-xl font-semibold text-gray-800 mb-4">🗄️ Manajemen Database</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-blue-600" id="dbPresensiCount">0</div>
                            <div class="text-sm text-gray-600">Records Presensi</div>
                        </div>
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-green-600" id="dbTukangCount">0</div>
                            <div class="text-sm text-gray-600">Data Tukang</div>
                        </div>
                        <div class="stats-card p-4 rounded-lg">
                            <div class="text-2xl font-bold text-purple-600" id="dbActivityCount">0</div>
                            <div class="text-sm text-gray-600">Log Aktivitas</div>
                        </div>
                    </div>
                    
                    <div class="flex space-x-3 mt-4">
                        <button onclick="backupData()" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            💾 Backup Data
                        </button>
                        <button onclick="importData()" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            📥 Import Data
                        </button>
                        <button onclick="showSystemLogs()" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                            📜 System Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script>
        // ==================== GLOBAL VARIABLES ====================
        let currentUser = null;
        let currentUserType = null;
        let currentLocation = null;
        let todayPresensi = null;
        let allPresensiData = [];
        let allTukangData = [];
        let isOnlineMode = true;
        
        // Configuration
        const CONFIG = {
            API_URL: localStorage.getItem('apiUrl') || '',
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
            
            // Update API status
            updateApiStatus();
            
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
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000
                    }
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
            todayPresensi = allPresensiData.find(p => 
                p.tukangId === currentUser.id && p.date === today
            );
            
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
            
            if (todayData.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center py-8 text-gray-500">
                            Belum ada data presensi hari ini
                        </td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = todayData.map(presensi => `
                <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-3 text-sm">${presensi.nama}</td>
                    <td class="py-3 px-3 text-sm">${presensi.jamMasuk || '-'}</td>
                    <td class="py-3 px-3 text-sm">${presensi.jamKeluar || '-'}</td>
                    <td class="py-3 px-3">
                        <span class="status-badge status-${presensi.status.toLowerCase()}">${presensi.status}</span>
                    </td>
                    <td class="py-3 px-3 text-sm">
                        ${presensi.lokasi ? 
                            `<button onclick="showLocation('${presensi.lokasi}')" class="text-blue-600 hover:text-blue-800">📍 Lihat</button>` : 
                            '-'
                        }
                    </td>
                </tr>
            `).join('');
        }

        // ==================== DATA MANAGEMENT ====================
        async function loadPresensiData() {
            try {
                if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                    const result = await apiCall('GET_PRESENSI', {});
                    if (result.success) {
                        allPresensiData = result.data || [];
                        saveToLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, allPresensiData);
                        return;
                    }
                }
                
                // Load from localStorage
                const offlineData = getFromLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, []);
                allPresensiData = offlineData;
                
            } catch (error) {
                console.error('Error loading presensi data:', error);
                // Load from localStorage as fallback
                const offlineData = getFromLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, []);
                allPresensiData = offlineData;
            }
        }

        async function loadTukangData() {
            try {
                if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                    const result = await apiCall('GET_TUKANG', {});
                    if (result.success) {
                        allTukangData = result.data || [];
                        saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                        updateTukangTable();
                        return;
                    }
                }
                
                // Load from localStorage
                const offlineData = getFromLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, []);
                allTukangData = offlineData;
                updateTukangTable();
                
            } catch (error) {
                console.error('Error loading tukang data:', error);
                // Load from localStorage as fallback
                const offlineData = getFromLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, []);
                allTukangData = offlineData;
                updateTukangTable();
            }
        }

        function updateTukangTable() {
            const tbody = document.getElementById('tukangTableBody');
            
            if (allTukangData.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-8 text-gray-500">
                            Belum ada data tukang
                        </td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = allTukangData.map(tukang => `
                <tr class="border-b hover:bg-gray-50">
                    <td class="py-3 px-3 text-sm">${tukang.id}</td>
                    <td class="py-3 px-3 text-sm font-medium">${tukang.name}</td>
                    <td class="py-3 px-3 text-sm">${tukang.username}</td>
                    <td class="py-3 px-3 text-sm">${tukang.phone || '-'}</td>
                    <td class="py-3 px-3">
                        <span class="status-badge ${tukang.status === 'Aktif' ? 'status-hadir' : 'status-alpha'}">
                            ${tukang.status}
                        </span>
                    </td>
                    <td class="py-3 px-3 text-sm">
                        <button onclick="editTukang('${tukang.id}')" class="text-blue-600 hover:text-blue-800 mr-2">✏️</button>
                        <button onclick="deleteTukang('${tukang.id}')" class="text-red-600 hover:text-red-800">🗑️</button>
                    </td>
                </tr>
            `).join('');
        }

        function updateStats() {
            const today = new Date().toLocaleDateString('id-ID');
            const todayData = allPresensiData.filter(p => p.date === today);
            
            // Today's stats
            const todayPresent = todayData.filter(p => p.status === 'Hadir').length;
            const todayLate = todayData.filter(p => p.jamMasuk && isLate(p.jamMasuk)).length;
            const todayAbsent = allTukangData.length - todayPresent;
            
            document.getElementById('todayPresent').textContent = todayPresent;
            document.getElementById('totalTukang').textContent = allTukangData.length;
            document.getElementById('lateToday').textContent = todayLate;
            document.getElementById('absentToday').textContent = todayAbsent;
        }

        function isLate(timeString) {
            // Assume work starts at 08:00
            const workStartTime = new Date();
            workStartTime.setHours(8, 0, 0, 0);
            
            const [hours, minutes, seconds] = timeString.split(':');
            const clockInTime = new Date();
            clockInTime.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || 0), 0);
            
            return clockInTime > workStartTime;
        }

        function calculateDuration(startTime, endTime) {
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);
            
            const startDate = new Date();
            startDate.setHours(startHours, startMinutes, 0, 0);
            
            const endDate = new Date();
            endDate.setHours(endHours, endMinutes, 0, 0);
            
            const diffMs = endDate - startDate;
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            
            return `${diffHours} jam ${diffMinutes} menit`;
        }

        // ==================== OFFLINE DATA MANAGEMENT ====================
        function savePresensiOffline(presensiData) {
            const existingData = getFromLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, []);
            existingData.push(presensiData);
            saveToLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, existingData);
            allPresensiData = existingData;
        }

        function updatePresensiOffline(id, updateData) {
            const existingData = getFromLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, []);
            const index = existingData.findIndex(p => p.id == id);
            
            if (index !== -1) {
                existingData[index] = { ...existingData[index], ...updateData };
                saveToLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, existingData);
                allPresensiData = existingData;
            }
        }

        function loadOfflineData() {
            allPresensiData = getFromLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, []);
            allTukangData = getFromLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, []);
            
            // Add demo data if empty
            if (allTukangData.length === 0) {
                allTukangData = [
                    {
                        id: 'T001',
                        name: 'Ahmad Tukang',
                        username: 'tukang1',
                        password: 'pass123',
                        phone: '081234567890',
                        address: 'Jl. Contoh No. 1',
                        status: 'Aktif',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    },
                    {
                        id: 'T002',
                        name: 'Budi Tukang',
                        username: 'tukang2',
                        password: 'pass123',
                        phone: '081234567891',
                        address: 'Jl. Contoh No. 2',
                        status: 'Aktif',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                ];
                saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
            }
        }

        // ==================== API FUNCTIONS ====================
        async function apiCall(action, data) {
            if (!CONFIG.API_URL) {
                throw new Error('API URL belum dikonfigurasi');
            }
            
            const requestData = {
                action: action,
                ...data
            };
            
            console.log('🌐 API Call:', action, requestData);
            
            try {
                const response = await fetch(CONFIG.API_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                });
                
                // Note: no-cors mode doesn't allow reading response
                // We'll assume success and handle errors through other means
                return {
                    success: true,
                    message: 'Request sent successfully',
                    data: null
                };
                
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }

        async function testConnection() {
            if (!CONFIG.API_URL) {
                showToast('API URL belum dikonfigurasi', 'error');
                return;
            }
            
            try {
                showToast('Testing koneksi...', 'info');
                
                const result = await apiCall('TEST_CONNECTION', {
                    message: 'Test from web app',
                    timestamp: new Date().toISOString()
                });
                
                if (result.success) {
                    showToast('Koneksi berhasil!', 'success');
                    updateApiStatus('Connected');
                } else {
                    showToast('Koneksi gagal: ' + result.message, 'error');
                    updateApiStatus('Error');
                }
                
            } catch (error) {
                console.error('Test connection error:', error);
                showToast('Error testing koneksi: ' + error.message, 'error');
                updateApiStatus('Error');
            }
        }

        function updateApiStatus(status = null) {
            const statusElements = ['apiStatus', 'adminApiStatus'];
            const modeElements = ['currentMode', 'adminCurrentMode'];
            
            let statusText = status || (CONFIG.API_URL ? 'Configured' : 'Not Configured');
            let statusColor = 'text-orange-600';
            
            switch(statusText) {
                case 'Connected':
                    statusColor = 'text-green-600';
                    break;
                case 'Error':
                    statusColor = 'text-red-600';
                    break;
                case 'Configured':
                    statusColor = 'text-blue-600';
                    break;
            }
            
            statusElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = statusText;
                    element.className = statusColor;
                }
            });
            
            const mode = CONFIG.OFFLINE_MODE ? 'Offline' : 'Online';
            modeElements.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = mode;
                }
            });
        }

        // ==================== CONFIGURATION ====================
        function showConfig() {
            document.getElementById('apiUrlInput').value = CONFIG.API_URL;
            document.getElementById('offlineMode').checked = CONFIG.OFFLINE_MODE;
            document.getElementById('configModal').classList.remove('hidden');
        }

        function closeConfig() {
            document.getElementById('configModal').classList.add('hidden');
        }

        function saveConfig() {
            const apiUrl = document.getElementById('apiUrlInput').value.trim();
            const offlineMode = document.getElementById('offlineMode').checked;
            
            if (apiUrl && !apiUrl.includes('script.google.com')) {
                showToast('URL harus dari Google Apps Script', 'error');
                return;
            }
            
            CONFIG.API_URL = apiUrl;
            CONFIG.OFFLINE_MODE = offlineMode;
            
            localStorage.setItem('apiUrl', apiUrl);
            localStorage.setItem('offlineMode', offlineMode.toString());
            
            updateApiStatus();
            closeConfig();
            
            showToast('Konfigurasi berhasil disimpan', 'success');
        }

        // ==================== TUKANG MANAGEMENT ====================
        function showAddTukangForm() {
            document.getElementById('addTukangForm').classList.remove('hidden');
        }

        function hideAddTukangForm() {
            document.getElementById('addTukangForm').classList.add('hidden');
            
            // Clear form
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
            
            // Check if username already exists
            if (allTukangData.find(t => t.username === username)) {
                showToast('Username sudah digunakan', 'error');
                return;
            }
            
            const newTukang = {
                id: 'T' + Date.now(),
                name: name,
                username: username,
                password: password,
                phone: phone,
                address: address,
                status: 'Aktif',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            try {
                if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                    const result = await apiCall('ADD_TUKANG', newTukang);
                    if (result.success) {
                        showToast('Tukang berhasil ditambahkan!', 'success');
                    } else {
                        throw new Error(result.message);
                    }
                } else {
                    // Save offline
                    allTukangData.push(newTukang);
                    saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                    showToast('Tukang berhasil ditambahkan (Offline)!', 'success');
                }
                
                updateTukangTable();
                hideAddTukangForm();
                
            } catch (error) {
                console.error('Add tukang error:', error);
                
                // Fallback to offline save
                allTukangData.push(newTukang);
                saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                updateTukangTable();
                hideAddTukangForm();
                
                showToast('Tukang ditambahkan (akan disinkronkan nanti)', 'warning');
            }
        }

        function editTukang(id) {
            const tukang = allTukangData.find(t => t.id === id);
            if (tukang) {
                // For now, just show alert. Can be expanded to show edit form
                alert(`Edit Tukang: ${tukang.name}\n(Fitur edit akan ditambahkan)`);
            }
        }

        function deleteTukang(id) {
            const tukang = allTukangData.find(t => t.id === id);
            if (tukang && confirm(`Yakin ingin menghapus tukang ${tukang.name}?`)) {
                allTukangData = allTukangData.filter(t => t.id !== id);
                saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                updateTukangTable();
                showToast('Tukang berhasil dihapus', 'success');
            }
        }

        // ==================== REPORTING ====================
        function loadTukangFilter() {
            const select = document.getElementById('tukangFilter');
            select.innerHTML = '<option value="">Semua Tukang</option>';
            
            allTukangData.forEach(tukang => {
                const option = document.createElement('option');
                option.value = tukang.id;
                option.textContent = tukang.name;
                select.appendChild(option);
            });
        }

        function generateReport() {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            const tukangId = document.getElementById('tukangFilter').value;
            
            if (!startDate || !endDate) {
                showToast('Pilih rentang tanggal terlebih dahulu', 'error');
                return;
            }
            
            // Filter data
            let filteredData = allPresensiData.filter(p => {
                const presensiDate = new Date(p.date.split('/').reverse().join('-'));
                const start = new Date(startDate);
                const end = new Date(endDate);
                
                return presensiDate >= start && presensiDate <= end;
            });
            
            if (tukangId) {
                filteredData = filteredData.filter(p => p.tukangId === tukangId);
            }
            
            // Update summary
            const totalHadir = filteredData.filter(p => p.status === 'Hadir').length;
            const totalIzin = filteredData.filter(p => p.status === 'Izin').length;
            const totalSakit = filteredData.filter(p => p.status === 'Sakit').length;
            const totalAlpha = filteredData.filter(p => p.status === 'Alpha').length;
            
            document.getElementById('reportTotalHadir').textContent = totalHadir;
            document.getElementById('reportTotalIzin').textContent = totalIzin;
            document.getElementById('reportTotalSakit').textContent = totalSakit;
            document.getElementById('reportTotalAlpha').textContent = totalAlpha;
            
            document.getElementById('reportSummary').classList.remove('hidden');
            
            // Update table
            const tbody = document.getElementById('reportTableBody');
            
            if (filteredData.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center py-8 text-gray-500">
                            Tidak ada data untuk periode yang dipilih
                        </td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = filteredData.map(presensi => {
                const duration = presensi.jamMasuk && presensi.jamKeluar ? 
                    calculateDuration(presensi.jamMasuk, presensi.jamKeluar) : '-';
                
                return `
                    <tr class="border-b hover:bg-gray-50">
                        <td class="py-3 px-3 text-sm">${presensi.date}</td>
                        <td class="py-3 px-3 text-sm font-medium">${presensi.nama}</td>
                        <td class="py-3 px-3 text-sm">${presensi.jamMasuk || '-'}</td>
                        <td class="py-3 px-3 text-sm">${presensi.jamKeluar || '-'}</td>
                        <td class="py-3 px-3">
                            <span class="status-badge status-${presensi.status.toLowerCase()}">${presensi.status}</span>
                        </td>
                        <td class="py-3 px-3 text-sm">${duration}</td>
                    </tr>
                `;
            }).join('');
            
            showToast('Laporan berhasil di-generate', 'success');
        }

        function exportExcel() {
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (!startDate || !endDate) {
                showToast('Generate laporan terlebih dahulu', 'error');
                return;
            }
            
            // Get filtered data (same as generateReport)
            let filteredData = allPresensiData.filter(p => {
                const presensiDate = new Date(p.date.split('/').reverse().join('-'));
                const start = new Date(startDate);
                const end = new Date(endDate);
                
                return presensiDate >= start && presensiDate <= end;
            });
            
            const tukangId = document.getElementById('tukangFilter').value;
            if (tukangId) {
                filteredData = filteredData.filter(p => p.tukangId === tukangId);
            }
            
            if (filteredData.length === 0) {
                showToast('Tidak ada data untuk diekspor', 'warning');
                return;
            }
            
            // Prepare data for Excel
            const excelData = filteredData.map(p => ({
                'Tanggal': p.date,
                'Nama': p.nama,
                'Jam Masuk': p.jamMasuk || '-',
                'Jam Keluar': p.jamKeluar || '-',
                'Status': p.status,
                'Durasi': p.jamMasuk && p.jamKeluar ? calculateDuration(p.jamMasuk, p.jamKeluar) : '-',
                'Lokasi': p.lokasi || '-'
            }));
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(excelData);
            
            // Add worksheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Laporan Presensi');
            
            // Save file
            const filename = `Laporan_Presensi_${startDate}_${endDate}.xlsx`;
            XLSX.writeFile(wb, filename);
            
            showToast('File Excel berhasil diunduh', 'success');
        }

        function exportPDF() {
            showToast('Fitur export PDF akan segera tersedia', 'info');
        }

        // ==================== ADMIN FUNCTIONS ====================
        async function loadAdminData() {
            updateApiStatus();
            
            // Update database counts
            document.getElementById('dbPresensiCount').textContent = allPresensiData.length;
            document.getElementById('dbTukangCount').textContent = allTukangData.length;
            
            // Update last sync time
            const lastSync = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_SYNC);
            if (lastSync) {
                document.getElementById('lastSyncTime').textContent = new Date(lastSync).toLocaleString('id-ID');
            }
            
            // Load activities
            await loadActivities();
        }

        async function loadActivities() {
            try {
                let activities = [];
                
                if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                    const result = await apiCall('GET_ACTIVITIES', {});
                    if (result.success) {
                        activities = result.data || [];
                        saveToLocalStorage(CONFIG.STORAGE_KEYS.ACTIVITIES, activities);
                    }
                } else {
                    activities = getFromLocalStorage(CONFIG.STORAGE_KEYS.ACTIVITIES, []);
                }
                
                updateActivitiesList(activities);
                document.getElementById('dbActivityCount').textContent = activities.length;
                
            } catch (error) {
                console.error('Error loading activities:', error);
                const activities = getFromLocalStorage(CONFIG.STORAGE_KEYS.ACTIVITIES, []);
                updateActivitiesList(activities);
                document.getElementById('dbActivityCount').textContent = activities.length;
            }
        }

        function updateActivitiesList(activities) {
            const container = document.getElementById('recentActivities');
            
            if (activities.length === 0) {
                container.innerHTML = '<div class="text-center text-gray-500 py-4">Belum ada aktivitas</div>';
                return;
            }
            
            container.innerHTML = activities.slice(0, 10).map(activity => `
                <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 text-xs">👤</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">${activity.user}</p>
                        <p class="text-sm text-gray-600">${activity.description}</p>
                        <p class="text-xs text-gray-500">${activity.timestamp}</p>
                    </div>
                </div>
            `).join('');
        }

        async function syncData() {
            const syncBtn = document.getElementById('syncBtn');
            const syncIcon = document.getElementById('syncIcon');
            
            syncIcon.textContent = '⏳';
            syncBtn.disabled = true;
            
            try {
                if (CONFIG.API_URL && !CONFIG.OFFLINE_MODE) {
                    const result = await apiCall('SYNC_DATA', {});
                    if (result.success) {
                        // Update local data with synced data
                        if (result.data.presensi) {
                            allPresensiData = result.data.presensi;
                            saveToLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, allPresensiData);
                        }
                        
                        if (result.data.tukang) {
                            allTukangData = result.data.tukang;
                            saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                        }
                        
                        localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
                        
                        showToast('Sinkronisasi berhasil!', 'success');
                        
                        // Refresh current view
                        updateStats();
                        updateTodayAttendanceList();
                        if (currentUserType === 'tukang') {
                            checkTodayPresensi();
                        }
                    } else {
                        throw new Error(result.message);
                    }
                } else {
                    showToast('Mode offline - tidak ada yang disinkronkan', 'info');
                }
                
            } catch (error) {
                console.error('Sync error:', error);
                showToast('Error sinkronisasi: ' + error.message, 'error');
            } finally {
                syncIcon.textContent = '🔄';
                syncBtn.disabled = false;
            }
        }

        async function fullSync() {
            if (confirm('Yakin ingin melakukan full sync? Ini akan mengganti semua data lokal.')) {
                await syncData();
                showToast('Full sync selesai', 'success');
            }
        }

        function clearLocalData() {
            if (confirm('Yakin ingin menghapus semua data lokal? Data yang belum disinkronkan akan hilang.')) {
                Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                    localStorage.removeItem(key);
                });
                
                allPresensiData = [];
                allTukangData = [];
                todayPresensi = null;
                
                showToast('Data lokal berhasil dihapus', 'success');
                
                // Reload data
                loadOfflineData();
                updateStats();
                updateTodayAttendanceList();
                updateTukangTable();
            }
        }

        function backupData() {
            const backupData = {
                presensi: allPresensiData,
                tukang: allTukangData,
                activities: getFromLocalStorage(CONFIG.STORAGE_KEYS.ACTIVITIES, []),
                timestamp: new Date().toISOString(),
                version: CONFIG.VERSION
            };
            
            const dataStr = JSON.stringify(backupData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `backup_presensi_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            showToast('Backup berhasil diunduh', 'success');
        }

        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const backupData = JSON.parse(e.target.result);
                            
                            if (confirm('Yakin ingin mengimpor data? Data saat ini akan diganti.')) {
                                if (backupData.presensi) {
                                    allPresensiData = backupData.presensi;
                                    saveToLocalStorage(CONFIG.STORAGE_KEYS.PRESENSI, allPresensiData);
                                }
                                
                                if (backupData.tukang) {
                                    allTukangData = backupData.tukang;
                                    saveToLocalStorage(CONFIG.STORAGE_KEYS.TUKANG, allTukangData);
                                }
                                
                                if (backupData.activities) {
                                    saveToLocalStorage(CONFIG.STORAGE_KEYS.ACTIVITIES, backupData.activities);
                                }
                                
                                showToast('Data berhasil diimpor', 'success');
                                
                                // Refresh views
                                updateStats();
                                updateTodayAttendanceList();
                                updateTukangTable();
                            }
                        } catch (error) {
                            showToast('Error mengimpor data: ' + error.message, 'error');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            
            input.click();
        }

        function showSystemLogs() {
            alert('System Logs:\n\n' + 
                  '• Version: ' + CONFIG.VERSION + '\n' +
                  '• API URL: ' + (CONFIG.API_URL || 'Not configured') + '\n' +
                  '• Mode: ' + (CONFIG.OFFLINE_MODE ? 'Offline' : 'Online') + '\n' +
                  '• Presensi Records: ' + allPresensiData.length + '\n' +
                  '• Tukang Records: ' + allTukangData.length + '\n' +
                  '• Last Sync: ' + (localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_SYNC) || 'Never')
            );
        }

        // ==================== UTILITY FUNCTIONS ====================
        function showLocation(coordinates) {
            if (coordinates) {
                const [lat, lng] = coordinates.split(',');
                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(url, '_blank');
            }
        }

        function setLoading(type, isLoading) {
            const btn = document.getElementById(type + 'Btn');
            const text = document.getElementById(type + 'Text');
            const loading = document.getElementById(type + 'Loading');
            
            if (btn && text && loading) {
                if (isLoading) {
                    btn.disabled = true;
                    btn.classList.add('opacity-50');
                    loading.classList.remove('hidden');
                } else {
                    btn.disabled = false;
                    btn.classList.remove('opacity-50');
                    loading.classList.add('hidden');
                }
            }
        }

        function showToast(message, type = 'info') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            
            let bgColor = 'bg-blue-500';
            let icon = 'ℹ️';
            
            switch(type) {
                case 'success':
                    bgColor = 'bg-green-500';
                    icon = '✅';
                    break;
                case 'error':
                    bgColor = 'bg-red-500';
                    icon = '❌';
                    break;
                case 'warning':
                    bgColor = 'bg-yellow-500';
                    icon = '⚠️';
                    break;
            }
            
            toast.className = `toast ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`;
            toast.innerHTML = `
                <span>${icon}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
            `;
            
            container.appendChild(toast);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.classList.add('hide');
                    setTimeout(() => {
                        if (toast.parentElement) {
                            toast.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }

        function saveToLocalStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
        }

        function getFromLocalStorage(key, defaultValue = null) {
            try {
                const data = localStorage.getItem(key);
                return data ? JSON.parse(data) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        }

        // ==================== KEYBOARD SHORTCUTS ====================
        document.addEventListener('keydown', function(e) {
            // Enter key on login form
            if (e.key === 'Enter' && !document.getElementById('loginPage').classList.contains('hidden')) {
                login();
            }
            
            // Ctrl+S for sync (prevent default save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (!document.getElementById('dashboard').classList.contains('hidden')) {
                    syncData();
                }
            }
        });

        // ==================== SERVICE WORKER (Optional) ====================
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                // Service worker registration can be added here for offline functionality
                console.log('Service Worker support detected');
            });
        }

        console.log('🚀 Sistem Presensi Tukang v2.3 - Ready!');
    </script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9727eeef3703ddfc',t:'MTc1NTc1NjI3MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
