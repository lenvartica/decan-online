// Video Sharing Manager - Handles sharing videos between users
class VideoSharingManager {
    constructor(firebaseUserManager) {
        this.userManager = firebaseUserManager;
        this.db = firebase.firestore();
        this.videosRef = this.db.collection('videos');
        this.sharesRef = this.db.collection('shares');
    }
    
    /**
     * Create and display sharing modal
     */
    async createShareModal(videoId) {
        try {
            const currentUser = this.userManager.getCurrentUser();
            if (!currentUser) {
                alert('Please login to share videos');
                return;
            }
            
            // Get all users
            const allUsers = await this.userManager.getAllUsers();
            
            // Create modal HTML
            const modal = document.createElement('div');
            modal.id = 'share-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Share Video</h2>
                    <p style="color: #00ffff; margin: 1rem 0;">Select a user to share this video with:</p>
                    
                    <div class="share-users-list">
                        ${allUsers.map(user => `
                            <div class="share-user-item" data-user-id="${user.uid}" data-username="${user.username}">
                                <div class="share-user-info">
                                    <span class="share-user-name">${user.username}</span>
                                    <span class="share-user-email">${user.email}</span>
                                </div>
                                <button class="share-user-btn" data-video-id="${videoId}">Share</button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div id="share-status" style="margin-top: 1rem;"></div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'block';
            
            // Close modal on X click
            modal.querySelector('.close').onclick = () => {
                modal.remove();
            };
            
            // Close modal on outside click
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            };
            
            // Handle share button clicks
            modal.querySelectorAll('.share-user-btn').forEach(btn => {
                btn.onclick = async (e) => {
                    const userId = e.target.closest('.share-user-item').dataset.userId;
                    const username = e.target.closest('.share-user-item').dataset.username;
                    
                    await this.shareWithUser(videoId, userId, username);
                };
            });
            
        } catch (error) {
            console.error('Error creating share modal:', error);
            alert('Error loading users for sharing');
        }
    }
    
    /**
     * Share video with specific user
     */
    async shareWithUser(videoId, targetUserId, targetUsername) {
        try {
            const currentUser = this.userManager.getCurrentUser();
            
            const result = await this.userManager.shareVideo(videoId, targetUserId, currentUser.uid);
            
            if (result.success) {
                const statusDiv = document.getElementById('share-status');
                statusDiv.innerHTML = `
                    <div style="color: #00ff00; background: rgba(0, 255, 0, 0.1); padding: 1rem; border-radius: 8px;">
                        ✅ Video shared with ${targetUsername}!
                    </div>
                `;
                
                setTimeout(() => {
                    const modal = document.getElementById('share-modal');
                    if (modal) modal.remove();
                }, 2000);
            } else {
                const statusDiv = document.getElementById('share-status');
                statusDiv.innerHTML = `
                    <div style="color: #ff0000; background: rgba(255, 0, 0, 0.1); padding: 1rem; border-radius: 8px;">
                        ❌ ${result.error}
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error sharing video:', error);
            alert('Error sharing video');
        }
    }
    
    /**
     * Display shared videos in a section
     */
    async displaySharedVideos(containerId) {
        try {
            const currentUser = this.userManager.getCurrentUser();
            if (!currentUser) return;
            
            const sharedVideos = await this.userManager.getSharedVideos(currentUser.uid);
            const container = document.getElementById(containerId);
            
            if (!container) return;
            
            if (sharedVideos.length === 0) {
                container.innerHTML = '<p style="color: #00ffff; text-align: center; padding: 2rem;">No videos shared with you yet</p>';
                return;
            }
            
            container.innerHTML = `
                <div class="videos-grid">
                    ${sharedVideos.map(video => `
                        <div class="video-card">
                            <div class="video-player">
                                <iframe 
                                    src="${video.videoUrl}" 
                                    allowfullscreen
                                    style="width: 100%; height: 100%; border: none; border-radius: 8px;">
                                </iframe>
                            </div>
                            <div class="video-info">
                                <h3 class="video-title">${video.title}</h3>
                                <p class="video-uploader">👤 Shared by: ${video.uploadedByUsername}</p>
                                <p class="video-date">📅 ${new Date(video.sharedAt).toLocaleDateString()}</p>
                                <p class="video-description">${video.description || 'No description'}</p>
                                <div class="video-actions">
                                    <button class="action-btn" onclick="videoManager.showComments('${video.id}')">💬 Comments</button>
                                    <button class="action-btn" onclick="videoManager.recordDownload('${video.id}', '1080p')">📥 Download</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error displaying shared videos:', error);
        }
    }
}

// Initialize Video Sharing Manager
const videoSharingManager = new VideoSharingManager(firebaseUserManager);
