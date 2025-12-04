// ==================== VIDEO UPLOAD SYSTEM ====================
// Allows users to upload and manage their own videos

class VideoUploadManager {
    constructor() {
        this.maxFileSize = 500 * 1024 * 1024; // 500MB
        this.allowedFormats = ['mp4', 'webm', 'mkv', 'avi'];
    }

    validateVideo(file) {
        if (!file) {
            return { valid: false, error: 'No file selected' };
        }

        // Check file size
        if (file.size > this.maxFileSize) {
            return { valid: false, error: 'File size exceeds 500MB limit' };
        }

        // Check file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!this.allowedFormats.includes(fileExtension)) {
            return { valid: false, error: `Only ${this.allowedFormats.join(', ')} formats allowed` };
        }

        return { valid: true };
    }

    createUploadModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'upload-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>📹 Upload Your Video</h2>
                
                <form id="video-upload-form" class="upload-form">
                    <div class="form-group">
                        <label for="video-title">Video Title *</label>
                        <input type="text" id="video-title" placeholder="Enter video title" required>
                    </div>

                    <div class="form-group">
                        <label for="video-description">Description</label>
                        <textarea id="video-description" placeholder="Describe your video..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="video-category">Category *</label>
                        <select id="video-category" required>
                            <option value="">Select Category</option>
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
                        <label for="video-file">Video File *</label>
                        <div class="file-input-wrapper">
                            <input type="file" id="video-file" accept="video/*" required>
                            <span id="file-name">No file selected</span>
                        </div>
                        <small>Max size: 500MB. Formats: MP4, WebM, MKV, AVI</small>
                    </div>

                    <div class="form-group">
                        <label for="video-thumbnail">Thumbnail URL (Optional)</label>
                        <input type="url" id="video-thumbnail" placeholder="https://example.com/thumbnail.jpg">
                    </div>

                    <div class="upload-progress" id="upload-progress" style="display: none;">
                        <div class="progress-bar">
                            <div class="progress-fill" id="progress-fill"></div>
                        </div>
                        <p id="progress-text">0%</p>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="cyber-button">📤 Upload Video</button>
                        <button type="button" class="cyber-button" id="cancel-upload">Cancel</button>
                    </div>

                    <div id="upload-error" class="upload-error"></div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => modal.remove());

        const cancelBtn = modal.querySelector('#cancel-upload');
        cancelBtn.addEventListener('click', () => modal.remove());

        const fileInput = modal.querySelector('#video-file');
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0]?.name || 'No file selected';
            modal.querySelector('#file-name').textContent = fileName;
        });

        const form = modal.querySelector('#video-upload-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpload(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    handleUpload(modal) {
        const currentUser = userManager.getCurrentUser();
        if (!currentUser) {
            this.showError(modal, 'Please login to upload videos');
            return;
        }

        const fileInput = modal.querySelector('#video-file');
        const file = fileInput.files[0];

        // Validate
        const validation = this.validateVideo(file);
        if (!validation.valid) {
            this.showError(modal, validation.error);
            return;
        }

        const title = modal.querySelector('#video-title').value.trim();
        const description = modal.querySelector('#video-description').value.trim();
        const category = modal.querySelector('#video-category').value;
        const thumbnail = modal.querySelector('#video-thumbnail').value.trim();

        if (!title) {
            this.showError(modal, 'Please enter a video title');
            return;
        }

        // Show progress
        const progressDiv = modal.querySelector('#upload-progress');
        progressDiv.style.display = 'block';

        // Simulate upload progress
        this.simulateUploadProgress(modal, () => {
            // Create video object
            const video = {
                title: title,
                description: description,
                category: category,
                thumbnail: thumbnail || 'https://via.placeholder.com/400x250?text=User+Upload',
                videoUrl: URL.createObjectURL(file),
                source: 'User Upload',
                downloads: []
            };

            // Add to user's uploaded videos
            const result = userManager.addUploadedVideo(currentUser.username, video);

            if (result.success) {
                showToast('🎉 Video uploaded successfully!');
                setTimeout(() => {
                    modal.remove();
                    // Refresh video grid if available
                    if (window.initializeVideosGrid) {
                        window.initializeVideosGrid();
                    }
                }, 1500);
            } else {
                this.showError(modal, result.message);
            }
        });
    }

    simulateUploadProgress(modal, onComplete) {
        const progressFill = modal.querySelector('#progress-fill');
        const progressText = modal.querySelector('#progress-text');
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;

            progressFill.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
        }, 200);
    }

    showError(modal, message) {
        const errorDiv = modal.querySelector('#upload-error');
        errorDiv.textContent = '❌ ' + message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 4000);
    }

    addUploadStyles() {
        if (document.getElementById('upload-styles')) return;

        const style = document.createElement('style');
        style.id = 'upload-styles';
        style.textContent = `
            .upload-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                margin-top: 1.5rem;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .form-group label {
                color: #00ffff;
                font-weight: bold;
                font-size: 0.95rem;
                text-transform: uppercase;
                letter-spacing: 0.05rem;
            }

            .form-group input,
            .form-group textarea,
            .form-group select {
                padding: 12px;
                border: 2px solid #00ffff;
                background: rgba(0, 0, 0, 0.6);
                color: #00ffff;
                border-radius: 8px;
                font-family: 'Orbitron', monospace;
                transition: all 0.3s ease;
            }

            .form-group input:focus,
            .form-group textarea:focus,
            .form-group select:focus {
                outline: none;
                border-color: #ff00ff;
                box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
                background: rgba(255, 0, 255, 0.05);
                color: #ffff00;
            }

            .form-group textarea {
                resize: vertical;
                min-height: 100px;
            }

            .form-group small {
                color: rgba(0, 255, 255, 0.6);
                font-size: 0.85rem;
            }

            .file-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border: 2px dashed #00ffff;
                border-radius: 8px;
                background: rgba(0, 255, 255, 0.05);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .file-input-wrapper:hover {
                background: rgba(0, 255, 255, 0.15);
                border-color: #ff00ff;
            }

            .file-input-wrapper input {
                display: none;
            }

            #file-name {
                color: #ffff00;
                font-weight: bold;
            }

            .upload-progress {
                padding: 1rem;
                background: rgba(0, 255, 255, 0.05);
                border-radius: 8px;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: rgba(0, 255, 255, 0.2);
                border-radius: 10px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00ffff, #ff00ff);
                width: 0%;
                transition: width 0.2s ease;
            }

            #progress-text {
                color: #00ffff;
                font-weight: bold;
                text-align: center;
                margin: 0;
            }

            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }

            .form-actions button {
                flex: 1;
            }

            .upload-error {
                padding: 1rem;
                background: rgba(255, 0, 0, 0.1);
                border: 2px solid #ff0000;
                border-radius: 8px;
                color: #ff6666;
                text-align: center;
                font-weight: bold;
                display: none;
                animation: slideIn 0.3s ease;
            }

            @media (max-width: 768px) {
                .form-actions {
                    flex-direction: column;
                }

                .form-actions button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize global upload manager
const uploadManager = new VideoUploadManager();
uploadManager.addUploadStyles();
