// Authentication functions
// Version: 1.0

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.loginAttempts = 0;
        this.maxAttempts = CONFIG.MAX_LOGIN_ATTEMPTS;
    }

    // Login function
    async login(username, password) {
        if (!username || !password) {
            throw new Error('Harap isi username dan password!');
        }

        if (this.loginAttempts >= this.maxAttempts) {
            throw new Error('Terlalu banyak percobaan login. Coba lagi nanti.');
        }

        if (!CONFIG.GOOGLE_SHEETS_URL) {
            throw new Error('Harap konfigurasi Google Sheets terlebih dahulu!');
        }

        try {
            // Load data from Google Sheets
            const dataLoaded = await api.loadAllData();
            if (!dataLoaded) {
                throw new Error('Gagal memuat data dari Google Sheets');
            }

            // Check admin credentials
            const admin = adminData.find(a => {
                const adminUsername = String(a.username || '').trim();
                const adminPassword = String(a.password || '').trim();
                return adminUsername === username && adminPassword === password;
            });
            
            if (admin) {
                this.currentUser = { 
                    type: 'admin', 
                    username: admin.username,
                    name: admin.name,
                    email: admin.email,
                    role: admin.role
                };
                
                this.loginAttempts = 0;
                logActivity('Login', `Admin ${admin.name} masuk ke sistem`);
                return { type: 'admin', user: this.currentUser };
            }

            // Check tukang credentials
            const tukang = tukangData.find(t => {
                const tukangUsername = String(t.username || '').trim();
                const tukangPassword = String(t.password || '').trim();
                return tukangUsername === username && tukangPassword === password;
            });
            
            if (tukang) {
                this.currentUser = { type: 'tukang', data: tukang };
                
                this.loginAttempts = 0;
                logActivity('Login', `Tukang ${tukang.name} masuk ke sistem`);
                return { type: 'tukang', user: this.currentUser };
            }

            this.loginAttempts++;
            throw new Error('Username atau password salah!');
            
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    // Logout function
    logout() {
        if (this.currentUser) {
            const userName = this.currentUser.type === 'admin' ? 
                            this.currentUser.name : 
                            this.currentUser.data.name;
            
            logActivity('Logout', `${this.currentUser.type === 'admin' ? 'Admin' : 'Tukang'} ${userName} keluar dari sistem`);
        }
        
        this.currentUser = null;
        this.loginAttempts = 0;
        
        // Show login page
        document.getElementById('loginPage').classList.remove('hidden');
        document.getElementById('adminPage').classList.add('hidden');
        document.getElementById('tukangPage').classList.add('hidden');
        
        // Clear form
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        showToast('Anda telah logout', 'info');
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Check if user is admin
    isAdmin() {
        return this.currentUser && this.currentUser.type === 'admin';
    }

    // Check if user is tukang
    isTukang() {
        return this.currentUser && this.currentUser.type === 'tukang';
    }
}

// Password toggle function
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

// Global login function
async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const loginLoading = document.getElementById('loginLoading');

    // Show loading
    loginText.textContent = 'Memverifikasi...';
    loginLoading.classList.remove('hidden');
    loginBtn.disabled = true;

    try {
        const result = await auth.login(username, password);
        
        if (result.type === 'admin') {
            showAdminPage();
            showToast(`Selamat datang, ${result.user.name}!`, 'success');
        } else if (result.type === 'tukang') {
            showTukangPage();
            showToast(`Selamat datang, ${result.user.data.name}!`, 'success');
        }
        
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        // Reset button
        loginText.textContent = 'Masuk';
        loginLoading.classList.add('hidden');
        loginBtn.disabled = false;
    }
}

// Global logout function
function logout() {
    auth.logout();
}

// Create global auth instance
window.auth = new AuthManager();

console.log('🔐 Authentication manager initialized');