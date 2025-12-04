// ==================== THEME MANAGEMENT SYSTEM ====================
// Handles dark mode (hacker theme) and light mode (nature theme)

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.initializeTheme();
    }

    initializeTheme() {
        const currentUser = userManager.getCurrentUser();
        if (currentUser) {
            this.currentTheme = currentUser.theme || 'dark';
        } else {
            this.currentTheme = localStorage.getItem('nexusTheme') || 'dark';
        }
        this.applyTheme(this.currentTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        const root = document.documentElement;

        if (theme === 'dark') {
            this.applyDarkTheme(root);
        } else {
            this.applyLightTheme(root);
        }

        // Save theme preference
        localStorage.setItem('nexusTheme', theme);
        const currentUser = userManager.getCurrentUser();
        if (currentUser) {
            userManager.setUserTheme(currentUser.username, theme);
        }
    }

    applyDarkTheme(root) {
        // Hacker/Neon Dark Mode
        root.style.setProperty('--bg-primary', '#0a0e27');
        root.style.setProperty('--bg-secondary', '#1a1f3a');
        root.style.setProperty('--bg-tertiary', 'rgba(15, 12, 41, 0.9)');
        
        root.style.setProperty('--color-primary', '#00ffff');
        root.style.setProperty('--color-secondary', '#ff00ff');
        root.style.setProperty('--color-accent', '#ffff00');
        root.style.setProperty('--color-text', '#e0e6ff');
        root.style.setProperty('--color-text-secondary', 'rgba(200, 255, 255, 0.7)');
        
        root.style.setProperty('--glow-primary', 'rgba(0, 255, 255, 0.3)');
        root.style.setProperty('--glow-secondary', 'rgba(255, 0, 255, 0.3)');
        
        root.style.setProperty('--border-color', '#00ffff');
        root.style.setProperty('--shadow-primary', '0 0 30px rgba(0, 255, 255, 0.3)');

        document.body.style.background = 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)';
        document.body.style.color = '#e0e6ff';
        
        // Apply dark styles
        this.applyDarkStyles();
    }

    applyLightTheme(root) {
        // Nature/Light Mode
        root.style.setProperty('--bg-primary', '#f5f7fa');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--bg-tertiary', 'rgba(255, 255, 255, 0.95)');
        
        root.style.setProperty('--color-primary', '#2d7a4f');
        root.style.setProperty('--color-secondary', '#8b5a9e');
        root.style.setProperty('--color-accent', '#f09a3d');
        root.style.setProperty('--color-text', '#2c3e50');
        root.style.setProperty('--color-text-secondary', 'rgba(76, 110, 130, 0.8)');
        
        root.style.setProperty('--glow-primary', 'rgba(45, 122, 79, 0.15)');
        root.style.setProperty('--glow-secondary', 'rgba(139, 90, 158, 0.15)');
        
        root.style.setProperty('--border-color', '#2d7a4f');
        root.style.setProperty('--shadow-primary', '0 8px 32px rgba(45, 122, 79, 0.1)');

        document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #e8f5e9 100%)';
        document.body.style.color = '#2c3e50';
        
        // Apply light styles
        this.applyLightStyles();
    }

    applyDarkStyles() {
        let styleElement = document.getElementById('theme-dark-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'theme-dark-styles';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            :root {
                --bg-primary: #0a0e27;
                --bg-secondary: #1a1f3a;
                --bg-tertiary: rgba(15, 12, 41, 0.9);
                --color-primary: #00ffff;
                --color-secondary: #ff00ff;
                --color-accent: #ffff00;
                --color-text: #e0e6ff;
                --color-text-secondary: rgba(200, 255, 255, 0.7);
                --glow-primary: rgba(0, 255, 255, 0.3);
                --glow-secondary: rgba(255, 0, 255, 0.3);
                --border-color: #00ffff;
                --shadow-primary: 0 0 30px rgba(0, 255, 255, 0.3);
            }

            /* Dark mode overrides */
            .futuristic-nav {
                background: rgba(15, 12, 41, 0.95) !important;
                border-bottom-color: #00ffff !important;
            }

            .nav-link {
                color: #00ffff !important;
            }

            .video-card {
                background: rgba(15, 12, 41, 0.9) !important;
                border-color: #00ffff !important;
            }

            .section-title, .heading-glow {
                color: #00ffff !important;
                text-shadow: 0 0 20px rgba(0, 255, 255, 0.5) !important;
            }

            .heading-sub {
                color: #ff00ff !important;
            }

            .modal-content {
                background: rgba(15, 12, 41, 0.95) !important;
                border-color: #00ffff !important;
                color: #e0e6ff !important;
            }

            .cyber-button {
                background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00) !important;
                color: #000 !important;
            }

            .comment-item {
                background: rgba(0, 255, 255, 0.05) !important;
                border-left-color: #00ffff !important;
            }

            .comment-author {
                color: #ff00ff !important;
            }

            .comment-text {
                color: rgba(200, 255, 255, 0.8) !important;
            }
        `;
    }

    applyLightStyles() {
        let styleElement = document.getElementById('theme-light-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'theme-light-styles';
            document.head.appendChild(styleElement);
        }

        styleElement.textContent = `
            :root {
                --bg-primary: #f5f7fa;
                --bg-secondary: #ffffff;
                --bg-tertiary: rgba(255, 255, 255, 0.95);
                --color-primary: #2d7a4f;
                --color-secondary: #8b5a9e;
                --color-accent: #f09a3d;
                --color-text: #2c3e50;
                --color-text-secondary: rgba(76, 110, 130, 0.8);
                --glow-primary: rgba(45, 122, 79, 0.15);
                --glow-secondary: rgba(139, 90, 158, 0.15);
                --border-color: #2d7a4f;
                --shadow-primary: 0 8px 32px rgba(45, 122, 79, 0.1);
            }

            /* Light mode overrides */
            .futuristic-nav {
                background: rgba(255, 255, 255, 0.95) !important;
                border-bottom-color: #2d7a4f !important;
                box-shadow: 0 4px 20px rgba(45, 122, 79, 0.1) !important;
            }

            .nav-link {
                color: #2d7a4f !important;
            }

            .nav-link:hover,
            .nav-link.active {
                background: rgba(45, 122, 79, 0.1) !important;
                border-color: #2d7a4f !important;
                box-shadow: 0 0 15px rgba(45, 122, 79, 0.2) !important;
                color: #8b5a9e !important;
            }

            .logo-icon {
                animation: none !important;
                color: #2d7a4f !important;
            }

            .video-card {
                background: rgba(255, 255, 255, 0.95) !important;
                border-color: #2d7a4f !important;
                box-shadow: 0 4px 15px rgba(45, 122, 79, 0.08) !important;
            }

            .video-card:hover {
                box-shadow: 0 8px 30px rgba(45, 122, 79, 0.15) !important;
            }

            .section-title, .heading-glow {
                color: #2d7a4f !important;
                text-shadow: 0 2px 10px rgba(45, 122, 79, 0.15) !important;
            }

            .heading-sub {
                color: #8b5a9e !important;
            }

            .modal-content {
                background: rgba(255, 255, 255, 0.98) !important;
                border-color: #2d7a4f !important;
                color: #2c3e50 !important;
                box-shadow: 0 20px 60px rgba(45, 122, 79, 0.15) !important;
            }

            .cyber-button {
                background: linear-gradient(45deg, #2d7a4f, #8b5a9e, #f09a3d) !important;
                color: #fff !important;
                border-color: #2d7a4f !important;
            }

            .cyber-button:hover {
                box-shadow: 0 8px 20px rgba(45, 122, 79, 0.2) !important;
            }

            .comment-item {
                background: rgba(45, 122, 79, 0.05) !important;
                border-left-color: #2d7a4f !important;
            }

            .comment-author {
                color: #8b5a9e !important;
            }

            .comment-text {
                color: rgba(76, 110, 130, 0.8) !important;
            }

            #button, #button2, #button3 {
                background: linear-gradient(45deg, #2d7a4f, #8b5a9e) !important;
                border-color: #2d7a4f !important;
                color: #fff !important;
            }

            #button:hover, #button2:hover, #button3:hover {
                box-shadow: 0 8px 20px rgba(45, 122, 79, 0.25) !important;
            }

            .action-btn {
                border-color: #2d7a4f !important;
                background: rgba(45, 122, 79, 0.1) !important;
                color: #2d7a4f !important;
            }

            .action-btn:hover {
                background: rgba(45, 122, 79, 0.2) !important;
                box-shadow: 0 0 15px rgba(45, 122, 79, 0.2) !important;
            }
        `;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        return newTheme;
    }

    getTheme() {
        return this.currentTheme;
    }
}

// Initialize global theme manager
const themeManager = new ThemeManager();
