// Configuration file for Sistem Presensi BAZNAS Banyuwangi
// Version: 1.0

// Environment Configuration
const CONFIG = {
    // Google Sheets URL - Set via environment or localStorage
    GOOGLE_SHEETS_URL: window.GOOGLE_SHEETS_URL || 
                      process?.env?.GOOGLE_SHEETS_URL || 
                      localStorage.getItem('sheetsUrl') || 
                      '',
    
    // Application Settings
    APP_NAME: 'Sistem Presensi BAZNAS Banyuwangi',
    VERSION: '1.0.0',
    
    // Auto close settings
    AUTO_CLOSE_TIME: '16:00',
    TIMEZONE: 'Asia/Jakarta',
    
    // Session settings
    SESSION_TIMEOUT: 480, // minutes
    MAX_LOGIN_ATTEMPTS: 5,
    
    // Default admin credentials
    DEFAULT_ADMIN: {
        username: 'admin',
        password: 'admin123',
        name: 'Administrator',
        email: 'admin@baznas.org',
        role: 'Super Admin'
    },
    
    // API endpoints
    API_ACTIONS: {
        TEST: 'test',
        GET_ADMIN: 'getAdmin',
        GET_TUKANG: 'getTukang',
        GET_PRESENSI: 'getPresensi',
        ADD_TUKANG: 'addTukang',
        ADD_ADMIN: 'addAdmin',
        ADD_PRESENSI: 'addPresensi',
        UPDATE_PRESENSI: 'updatePresensi',
        DELETE_TUKANG: 'deleteTukang',
        DELETE_ADMIN: 'deleteAdmin',
        SYNC_ALL: 'syncAll'
    },
    
    // Toast settings
    TOAST_DURATION: 3000,
    
    // Data refresh intervals (milliseconds)
    INTERVALS: {
        CONNECTION_CHECK: 30000,
        ONLINE_STATUS: 5000,
        AUTO_CLOSE_CHECK: 60000,
        DATETIME_UPDATE: 1000
    }
};

// Export for use in other files
window.CONFIG = CONFIG;

console.log('🔧 Configuration loaded:', CONFIG.APP_NAME, 'v' + CONFIG.VERSION);