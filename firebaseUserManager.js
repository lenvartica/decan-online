// Firebase User Manager - Handles authentication and user management
class FirebaseUserManager {
    constructor() {
        this.currentUser = null;
        this.db = firebase.firestore();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.usersRef = this.db.collection('users');
        this.videosRef = this.db.collection('videos');
        this.sharesRef = this.db.collection('shares');
        
        // Listen for auth state changes
        this.auth.onAuthStateChanged(async (user) => {
            if (user) {
                this.currentUser = user;
                await this.loadUserProfile(user.uid);
                console.log("User logged in:", user.email);
            } else {
                this.currentUser = null;
                console.log("User logged out");
            }
        });
    }
    
    /**
     * Sign up a new user with email and password
     */
    async signup(email, password, username) {
        try {
            // Validate inputs
            if (!email || !password || !username) {
                throw new Error("Email, password, and username are required");
            }
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters");
            }
            if (username.length < 3) {
                throw new Error("Username must be at least 3 characters");
            }
            
            // Check if username already exists
            const usernameQuery = await this.usersRef.where('username', '==', username).get();
            if (!usernameQuery.empty) {
                throw new Error("Username already taken");
            }
            
            // Create user with Firebase Auth
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;
            
            // Create user profile in Firestore
            const userProfile = {
                uid: uid,
                email: email,
                username: username,
                profilePic: this.generateAvatar(username),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                uploadedVideos: [],
                favorites: {},
                comments: {},
                downloads: [],
                watchlist: [],
                sharedWithMe: [],
                iShared: [],
                theme: 'dark'
            };
            
            // Save user profile to Firestore
            await this.usersRef.doc(uid).set(userProfile);
            
            console.log("User signed up successfully:", username);
            return { success: true, user: userProfile };
        } catch (error) {
            console.error("Signup error:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Log in user with email and password
     */
    async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            console.log("User logged in:", email);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Log out current user
     */
    async logout() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            console.log("User logged out");
            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Get user profile from Firestore
     */
    async loadUserProfile(uid) {
        try {
            const userDoc = await this.usersRef.doc(uid).get();
            if (userDoc.exists) {
                return userDoc.data();
            }
            return null;
        } catch (error) {
            console.error("Error loading user profile:", error);
            return null;
        }
    }
    
    /**
     * Update user profile
     */
    async updateProfile(uid, updates) {
        try {
            updates.updatedAt = new Date().toISOString();
            await this.usersRef.doc(uid).update(updates);
            console.log("Profile updated");
            return { success: true };
        } catch (error) {
            console.error("Error updating profile:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Upload video to Firebase Storage
     */
    async uploadVideo(file, videoData, userId) {
        try {
            if (!file || file.size > 500 * 1024 * 1024) {
                throw new Error("File too large (max 500MB)");
            }
            
            const validFormats = ['video/mp4', 'video/webm', 'video/x-matroska', 'video/x-msvideo'];
            if (!validFormats.includes(file.type)) {
                throw new Error("Invalid video format. Use MP4, WebM, MKV, or AVI");
            }
            
            // Create storage path: videos/{userId}/{filename}
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = this.storage.ref(`videos/${userId}/${fileName}`);
            
            // Upload file
            const uploadTask = storageRef.put(file);
            
            // Monitor upload progress
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload progress:', progress + '%');
                },
                (error) => {
                    console.error('Upload error:', error);
                },
                async () => {
                    // Get download URL
                    const downloadUrl = await storageRef.getDownloadURL();
                    
                    // Save video metadata to Firestore
                    const videoDoc = {
                        title: videoData.title,
                        description: videoData.description,
                        category: videoData.category,
                        uploadedBy: userId,
                        uploadedByUsername: videoData.username,
                        videoUrl: downloadUrl,
                        thumbnailUrl: videoData.thumbnailUrl || null,
                        uploadedAt: new Date().toISOString(),
                        likes: [],
                        comments: [],
                        downloads: [],
                        shares: [],
                        isPublic: true
                    };
                    
                    const videoRef = await this.videosRef.add(videoDoc);
                    console.log("Video uploaded:", videoRef.id);
                    
                    // Add to user's uploaded videos
                    const userDoc = await this.usersRef.doc(userId).get();
                    const user = userDoc.data();
                    user.uploadedVideos.push(videoRef.id);
                    await this.usersRef.doc(userId).update({ uploadedVideos: user.uploadedVideos });
                    
                    return { success: true, videoId: videoRef.id, downloadUrl };
                }
            );
        } catch (error) {
            console.error("Error uploading video:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Share video with another user
     */
    async shareVideo(videoId, targetUserId, currentUserId) {
        try {
            // Create share record
            const shareDoc = {
                videoId: videoId,
                sharedFrom: currentUserId,
                sharedTo: targetUserId,
                sharedAt: new Date().toISOString()
            };
            
            const shareRef = await this.sharesRef.add(shareDoc);
            
            // Update target user's sharedWithMe array
            const targetUserDoc = await this.usersRef.doc(targetUserId).get();
            const targetUser = targetUserDoc.data();
            targetUser.sharedWithMe = targetUser.sharedWithMe || [];
            targetUser.sharedWithMe.push({
                videoId: videoId,
                sharedFrom: currentUserId,
                sharedAt: new Date().toISOString()
            });
            await this.usersRef.doc(targetUserId).update({ sharedWithMe: targetUser.sharedWithMe });
            
            // Update current user's iShared array
            const currentUserDoc = await this.usersRef.doc(currentUserId).get();
            const currentUser = currentUserDoc.data();
            currentUser.iShared = currentUser.iShared || [];
            currentUser.iShared.push({
                videoId: videoId,
                sharedWith: targetUserId,
                sharedAt: new Date().toISOString()
            });
            await this.usersRef.doc(currentUserId).update({ iShared: currentUser.iShared });
            
            console.log("Video shared successfully");
            return { success: true, shareId: shareRef.id };
        } catch (error) {
            console.error("Error sharing video:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Get shared videos for a user
     */
    async getSharedVideos(userId) {
        try {
            const userDoc = await this.usersRef.doc(userId).get();
            if (!userDoc.exists) return [];
            
            const sharedWithMe = userDoc.data().sharedWithMe || [];
            const videos = [];
            
            for (const share of sharedWithMe) {
                const videoDoc = await this.videosRef.doc(share.videoId).get();
                if (videoDoc.exists) {
                    videos.push({ id: share.videoId, ...videoDoc.data(), sharedAt: share.sharedAt });
                }
            }
            
            return videos;
        } catch (error) {
            console.error("Error getting shared videos:", error);
            return [];
        }
    }
    
    /**
     * Get all users (for sharing dropdown)
     */
    async getAllUsers() {
        try {
            const usersSnapshot = await this.usersRef.get();
            const users = [];
            usersSnapshot.forEach(doc => {
                if (doc.id !== this.currentUser.uid) { // Exclude current user
                    users.push({
                        uid: doc.id,
                        username: doc.data().username,
                        email: doc.data().email
                    });
                }
            });
            return users;
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
    }
    
    /**
     * Add/remove like on video
     */
    async toggleLike(videoId, userId) {
        try {
            const videoDoc = await this.videosRef.doc(videoId).get();
            if (!videoDoc.exists) throw new Error("Video not found");
            
            const video = videoDoc.data();
            const likes = video.likes || [];
            
            if (likes.includes(userId)) {
                // Remove like
                likes.splice(likes.indexOf(userId), 1);
            } else {
                // Add like
                likes.push(userId);
            }
            
            await this.videosRef.doc(videoId).update({ likes: likes });
            return { success: true, liked: likes.includes(userId) };
        } catch (error) {
            console.error("Error toggling like:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Add comment to video
     */
    async addComment(videoId, userId, username, text) {
        try {
            const videoDoc = await this.videosRef.doc(videoId).get();
            if (!videoDoc.exists) throw new Error("Video not found");
            
            const video = videoDoc.data();
            const comments = video.comments || [];
            
            const comment = {
                userId: userId,
                username: username,
                text: text,
                timestamp: new Date().toISOString()
            };
            
            comments.push(comment);
            await this.videosRef.doc(videoId).update({ comments: comments });
            
            return { success: true, comment: comment };
        } catch (error) {
            console.error("Error adding comment:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Set user theme preference
     */
    async setUserTheme(userId, theme) {
        try {
            await this.usersRef.doc(userId).update({ theme: theme });
            return { success: true };
        } catch (error) {
            console.error("Error setting theme:", error);
            return { success: false, error: error.message };
        }
    }
    
    /**
     * Generate avatar emoji based on username
     */
    generateAvatar(username) {
        const emojis = ['👨‍💻', '👩‍💻', '🧑‍💻', '🎬', '🎭', '🎪', '🎨', '🎯', '🚀', '⭐'];
        const charCode = username.charCodeAt(0);
        return emojis[charCode % emojis.length];
    }
}

// Initialize Firebase User Manager
const firebaseUserManager = new FirebaseUserManager();
