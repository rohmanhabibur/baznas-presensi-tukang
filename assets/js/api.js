// Google Sheets API functions
// Version: 1.0

class GoogleSheetsAPI {
    constructor() {
        this.baseUrl = CONFIG.GOOGLE_SHEETS_URL;
    }

    // Test connection to Google Sheets
    async testConnection() {
        if (!this.baseUrl) {
            throw new Error('Google Sheets URL belum dikonfigurasi');
        }

        try {
            const url = new URL(this.baseUrl);
            url.searchParams.append('action', CONFIG.API_ACTIONS.TEST);
            
            const response = await fetch(url.toString(), { 
                method: 'GET',
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Connection test failed');
            }

            return result;
        } catch (error) {
            console.error('Connection test failed:', error);
            throw error;
        }
    }

    // Generic GET request to Google Sheets
    async get(action, params = {}) {
        if (!this.baseUrl) {
            throw new Error('Google Sheets URL belum dikonfigurasi');
        }

        try {
            const url = new URL(this.baseUrl);
            url.searchParams.append('action', action);
            
            // Add parameters
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    url.searchParams.append(key, String(params[key]));
                }
            });

            const response = await fetch(url.toString(), {
                method: 'GET',
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.error || result.message || 'Unknown error');
            }

            return result.data;
        } catch (error) {
            console.error('Google Sheets API Error:', error);
            throw error;
        }
    }

    // Load all data from Google Sheets
    async loadAllData() {
        try {
            showToast('Memuat data dari Google Sheets...', 'info');
            
            const [adminData, tukangData, presensiData] = await Promise.all([
                this.get(CONFIG.API_ACTIONS.GET_ADMIN),
                this.get(CONFIG.API_ACTIONS.GET_TUKANG),
                this.get(CONFIG.API_ACTIONS.GET_PRESENSI)
            ]);
            
            // Store in global variables
            window.adminData = adminData || [];
            window.tukangData = tukangData || [];
            window.presensiData = presensiData || [];
            
            console.log('Data loaded:', {
                admin: window.adminData.length,
                tukang: window.tukangData.length,
                presensi: window.presensiData.length
            });
            
            showToast('Data berhasil dimuat dari Google Sheets!', 'success');
            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            showToast('Gagal memuat data: ' + error.message, 'error');
            return false;
        }
    }

    // Add new record
    async add(action, data) {
        return await this.get(action, data);
    }

    // Update existing record
    async update(action, data) {
        return await this.get(action, data);
    }

    // Delete record
    async delete(action, data) {
        return await this.get(action, data);
    }
}

// Create global API instance
window.api = new GoogleSheetsAPI();

console.log('🔌 Google Sheets API initialized');