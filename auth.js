// ==================== USER MANAGEMENT SYSTEM ====================
// Handles user authentication, profiles, and video allocation

class UserManager {
    constructor() {
        this.storageKey = 'nexusUsers';
        this.currentUserKey = 'nexusCurrentUser';
        this.initializeUsers();
    }

    initializeUsers() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultUsers = {
                'demo': {
                    username: 'demo',
                    password: 'demo123',
                    email: 'demo@nexus.com',
                    profilePic: '👨‍💻',
                    createdAt: new Date().toISOString(),
                    uploadedVideos: [],
                    favorites: {},
                    comments: {},
                    downloads: [],
                    watchlist: [],
                    theme: 'dark'
                },
                'admin': {
                    username: 'admin',
                    password: 'admin123',
                    email: 'admin@nexus.com',
                    profilePic: '👨‍🔧',
                    createdAt: new Date().toISOString(),
                    uploadedVideos: [],
                    favorites: {},
                    comments: {},
                    downloads: [],
                    watchlist: [],
                    theme: 'dark'
                }
            };
            localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
        }
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    }

    getUserByUsername(username) {
        const users = this.getAllUsers();
        return users[username] || null;
    }

    getCurrentUser() {
        const username = localStorage.getItem(this.currentUserKey);
        return username ? this.getUserByUsername(username) : null;
    }

    setCurrentUser(username) {
        localStorage.setItem(this.currentUserKey, username);
    }

    clearCurrentUser() {
        localStorage.removeItem(this.currentUserKey);
    }

    signup(username, password, email) {
        const users = this.getAllUsers();

        // Validation
        if (users[username]) {
            return { success: false, message: 'Username already exists!' };
        }
        if (username.length < 3) {
            return { success: false, message: 'Username must be at least 3 characters!' };
        }
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters!' };
        }

        // Create new user
        const newUser = {
            username: username,
            password: password, // In production, this should be hashed
            email: email,
            profilePic: this.generateAvatar(username),
            createdAt: new Date().toISOString(),
            uploadedVideos: [],
            favorites: {},
            comments: {},
            downloads: [],
            watchlist: [],
            theme: 'dark'
        };

        users[username] = newUser;
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        return { success: true, message: 'Account created successfully!', user: newUser };
    }

    login(username, password) {
        const user = this.getUserByUsername(username);

        if (!user) {
            return { success: false, message: 'Username not found!' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Incorrect password!' };
        }

        this.setCurrentUser(username);
        return { success: true, message: 'Login successful!', user: user };
    }

    logout() {
        this.clearCurrentUser();
        return { success: true, message: 'Logged out successfully!' };
    }

    generateAvatar(username) {
        const avatars = ['👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🎬', '👩‍🎬', '🧑‍🎤', '👨‍🚀', '👩‍🚀'];
        const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return avatars[hash % avatars.length];
    }

    updateUser(username, updates) {
        const users = this.getAllUsers();
        if (!users[username]) {
            return { success: false, message: 'User not found!' };
        }

        users[username] = { ...users[username], ...updates };
        localStorage.setItem(this.storageKey, JSON.stringify(users));

        // Update current user if it's the same
        if (localStorage.getItem(this.currentUserKey) === username) {
            this.setCurrentUser(username);
        }

        return { success: true, message: 'User updated!', user: users[username] };
    }

    addUploadedVideo(username, video) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const videoWithId = {
            ...video,
            id: `user-${username}-${Date.now()}`,
            uploadedBy: username,
            uploadedAt: new Date().toISOString()
        };

        const updates = {
            uploadedVideos: [...(user.uploadedVideos || []), videoWithId]
        };

        return this.updateUser(username, updates);
    }

    getUserUploadedVideos(username) {
        const user = this.getUserByUsername(username);
        return user ? (user.uploadedVideos || []) : [];
    }

    toggleFavorite(username, videoId) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const favorites = { ...user.favorites };
        if (favorites[videoId]) {
            delete favorites[videoId];
        } else {
            favorites[videoId] = { videoId, timestamp: new Date().toISOString() };
        }

        return this.updateUser(username, { favorites });
    }

    setUserTheme(username, theme) {
        return this.updateUser(username, { theme: theme });
    }

    getUserTheme(username) {
        const user = this.getUserByUsername(username);
        return user ? user.theme : 'dark';
    }
}

// Initialize global user manager
const userManager = new UserManager();
