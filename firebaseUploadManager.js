// Firebase Video Upload Manager - Handles video uploads to Firebase Storage
class FirebaseVideoUploadManager {
    constructor(firebaseUserManager) {
        this.userManager = firebaseUserManager;
        this.db = firebase.firestore();
        this.storage = firebase.storage();
    }
    
    /**
     * Validate video file
     */
    validateVideo(file) {
        if (!file) return { valid: false, error: 'No file selected' };
        
        const maxSize = 500 * 1024 * 1024; // 500MB
        const validFormats = ['video/mp4', 'video/webm', 'video/x-matroska', 'video/x-msvideo'];
        
        if (file.size > maxSize) {
            return { valid: false, error: `File too large (max 500MB, got ${(file.size / 1024 / 1024).toFixed(2)}MB)` };
        }
        
        if (!validFormats.includes(file.type)) {
            return { valid: false, error: 'Invalid format. Use MP4, WebM, MKV, or AVI' };
        }
        
        return { valid: true };
    }
    
    /**
     * Create upload modal
     */
    createUploadModal() {
        const currentUser = this.userManager.getCurrentUser();
        if (!currentUser) {
            alert('Please login to upload videos');
            return;
        }
        
        const modal = document.createElement('div');
        modal.id = 'upload-modal';
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Upload Video</h2>
                
                <form id="upload-form">
                    <div class="form-group">
                        <label for="video-title">Title (Required):</label>
                        <input type="text" id="video-title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="video-description">Description:</label>
                        <textarea id="video-description" placeholder="Describe your video..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="video-category">Category:</label>
                        <select id="video-category">
                            <option value="shorts">Shorts</option>
                            <option value="movies">Movies</option>
                            <option value="anime">Anime</option>
                            <option value="gaming">Gaming</option>
                            <option value="music">Music</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="video-file">Video File:</label>
                        <div class="file-input-wrapper" id="file-wrapper">
                            <input type="file" id="video-file" accept="video/*" required>
                            <label for="video-file" class="file-input-label">📁 Click to select or drag & drop video file</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="video-thumbnail">Thumbnail URL (Optional):</label>
                        <input type="url" id="video-thumbnail" placeholder="https://example.com/thumbnail.jpg">
                    </div>
                    
                    <div id="upload-progress" style="display: none;">
                        <p>Uploading: <span id="progress-percent">0</span>%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                    </div>
                    
                    <div id="upload-error" class="upload-error"></div>
                    
                    <button type="submit" id="upload-submit" class="cyber-button">Upload Video</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        // Drag and drop
        const wrapper = document.getElementById('file-wrapper');
        wrapper.addEventListener('dragover', (e) => {
            e.preventDefault();
            wrapper.style.background = 'rgba(0, 255, 255, 0.2)';
        });
        wrapper.addEventListener('dragleave', () => {
            wrapper.style.background = '';
        });
        wrapper.addEventListener('drop', (e) => {
            e.preventDefault();
            wrapper.style.background = '';
            if (e.dataTransfer.files.length > 0) {
                document.getElementById('video-file').files = e.dataTransfer.files;
            }
        });
        
        // Form submission
        document.getElementById('upload-form').onsubmit = async (e) => {
            e.preventDefault();
            await this.handleUpload();
        };
    }
    
    /**
     * Handle video upload
     */
    async handleUpload() {
        const currentUser = this.userManager.getCurrentUser();
        const fileInput = document.getElementById('video-file');
        const titleInput = document.getElementById('video-title');
        const descInput = document.getElementById('video-description');
        const categorySelect = document.getElementById('video-category');
        const thumbnailInput = document.getElementById('video-thumbnail');
        const errorDiv = document.getElementById('upload-error');
        const progressDiv = document.getElementById('upload-progress');
        const submitBtn = document.getElementById('upload-submit');
        
        // Reset error
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
        
        // Validate file
        const file = fileInput.files[0];
        if (!file) {
            this.showError('Please select a file');
            return;
        }
        
        const validation = this.validateVideo(file);
        if (!validation.valid) {
            this.showError(validation.error);
            return;
        }
        
        if (!titleInput.value.trim()) {
            this.showError('Please enter a video title');
            return;
        }
        
        // Show progress
        progressDiv.style.display = 'block';
        submitBtn.disabled = true;
        
        try {
            // Upload video to Firebase Storage
            const fileName = `${Date.now()}_${file.name}`;
            const storageRef = this.storage.ref(`videos/${currentUser.uid}/${fileName}`);
            
            const uploadTask = storageRef.put(file);
            
            // Monitor progress
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    document.getElementById('progress-percent').textContent = progress;
                    document.getElementById('progress-fill').style.width = progress + '%';
                },
                (error) => {
                    this.showError('Upload failed: ' + error.message);
                    submitBtn.disabled = false;
                    progressDiv.style.display = 'none';
                },
                async () => {
                    // Get download URL
                    const downloadUrl = await storageRef.getDownloadURL();
                    
                    // Get user profile for username
                    const userProfile = await this.userManager.loadUserProfile(currentUser.uid);
                    
                    // Create video document in Firestore
                    const videoData = {
                        title: titleInput.value.trim(),
                        description: descInput.value.trim(),
                        category: categorySelect.value,
                        uploadedBy: currentUser.uid,
                        uploadedByUsername: userProfile.username,
                        uploadedByEmail: currentUser.email,
                        videoUrl: downloadUrl,
                        thumbnailUrl: thumbnailInput.value || null,
                        uploadedAt: new Date().toISOString(),
                        likes: [],
                        comments: [],
                        downloads: [],
                        shares: [],
                        isPublic: true,
                        views: 0
                    };
                    
                    const videosRef = this.db.collection('videos');
                    const videoDoc = await videosRef.add(videoData);
                    
                    // Add to user's uploadedVideos array
                    const usersRef = this.db.collection('users');
                    const userDoc = await usersRef.doc(currentUser.uid).get();
                    const userData = userDoc.data();
                    userData.uploadedVideos = userData.uploadedVideos || [];
                    userData.uploadedVideos.push(videoDoc.id);
                    await usersRef.doc(currentUser.uid).update({ uploadedVideos: userData.uploadedVideos });
                    
                    // Success
                    document.getElementById('upload-modal').remove();
                    alert(`✅ Video "${titleInput.value}" uploaded successfully!`);
                    
                    // Refresh page to show new video
                    location.reload();
                }
            );
        } catch (error) {
            this.showError('Error uploading video: ' + error.message);
            submitBtn.disabled = false;
            progressDiv.style.display = 'none';
        }
    }
    
    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.getElementById('upload-error');
        errorDiv.textContent = '❌ ' + message;
        errorDiv.style.display = 'block';
    }
}

// Initialize Firebase Upload Manager
const firebaseUploadManager = new FirebaseVideoUploadManager(firebaseUserManager);
