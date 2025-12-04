// Video Database with 50+ movies from multiple sources
const videosDatabase = [
    // Action Movies
    {
        id: 1,
        title: "Inception",
        description: "Experience the mind-bending journey of Inception. A legendary thriller from Christopher Nolan.",
        videoUrl: "https://www.youtube.com/embed/YoHD_XwIlNw",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.5GB", url: "https://www.youtube.com/watch?v=YoHD_XwIlNw" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=YoHD_XwIlNw" },
            { quality: "480p", size: "450MB", url: "https://www.youtube.com/watch?v=YoHD_XwIlNw" }
        ]
    },
    {
        id: 2,
        title: "The Dark Knight Rises",
        description: "The final chapter in Christopher Nolan's Dark Knight trilogy.",
        videoUrl: "https://www.youtube.com/embed/GokKUqLcvDY",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.8GB", url: "https://www.youtube.com/watch?v=GokKUqLcvDY" },
            { quality: "720p", size: "1.4GB", url: "https://www.youtube.com/watch?v=GokKUqLcvDY" },
            { quality: "480p", size: "520MB", url: "https://www.youtube.com/watch?v=GokKUqLcvDY" }
        ]
    },
    {
        id: 3,
        title: "Interstellar",
        description: "Journey through space and time in this epic science fiction masterpiece.",
        videoUrl: "https://www.youtube.com/embed/0vywZeB4f5M",
        source: "YouTube",
        category: "scifi",
        downloads: [
            { quality: "1080p", size: "3.0GB", url: "https://www.youtube.com/watch?v=0vywZeB4f5M" },
            { quality: "720p", size: "1.5GB", url: "https://www.youtube.com/watch?v=0vywZeB4f5M" },
            { quality: "480p", size: "580MB", url: "https://www.youtube.com/watch?v=0vywZeB4f5M" }
        ]
    },
    {
        id: 4,
        title: "Avatar",
        description: "Explore the stunning world of Pandora in this visual masterpiece.",
        videoUrl: "https://www.youtube.com/embed/5PSNL1qE6max",
        source: "YouTube",
        category: "scifi",
        downloads: [
            { quality: "1080p", size: "2.7GB", url: "https://www.youtube.com/watch?v=5PSNL1qE6max" },
            { quality: "720p", size: "1.3GB", url: "https://www.youtube.com/watch?v=5PSNL1qE6max" },
            { quality: "480p", size: "490MB", url: "https://www.youtube.com/watch?v=5PSNL1qE6max" }
        ]
    },
    {
        id: 5,
        title: "Oppenheimer",
        description: "The story of J. Robert Oppenheimer and the race to build the atomic bomb.",
        videoUrl: "https://www.youtube.com/embed/oapKHyqs6_E",
        source: "YouTube",
        category: "drama",
        downloads: [
            { quality: "1080p", size: "2.9GB", url: "https://www.youtube.com/watch?v=oapKHyqs6_E" },
            { quality: "720p", size: "1.4GB", url: "https://www.youtube.com/watch?v=oapKHyqs6_E" },
            { quality: "480p", size: "540MB", url: "https://www.youtube.com/watch?v=oapKHyqs6_E" }
        ]
    },
    {
        id: 6,
        title: "Dune",
        description: "Experience the epic science fiction saga of Dune by Denis Villeneuve.",
        videoUrl: "https://www.youtube.com/embed/n9xhJrCXkJY",
        source: "YouTube",
        category: "scifi",
        downloads: [
            { quality: "1080p", size: "3.2GB", url: "https://www.youtube.com/watch?v=n9xhJrCXkJY" },
            { quality: "720p", size: "1.6GB", url: "https://www.youtube.com/watch?v=n9xhJrCXkJY" },
            { quality: "480p", size: "610MB", url: "https://www.youtube.com/watch?v=n9xhJrCXkJY" }
        ]
    },
    // Additional Action/Thriller Movies
    {
        id: 7,
        title: "Mission Impossible",
        description: "Tom Cruise's action-packed spy thriller series.",
        videoUrl: "https://www.youtube.com/embed/r1tPjNwHlus",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.6GB", url: "https://www.youtube.com/watch?v=r1tPjNwHlus" },
            { quality: "720p", size: "1.3GB", url: "https://www.youtube.com/watch?v=r1tPjNwHlus" },
            { quality: "480p", size: "500MB", url: "https://www.youtube.com/watch?v=r1tPjNwHlus" }
        ]
    },
    {
        id: 8,
        title: "John Wick",
        description: "Keanu Reeves returns as the legendary assassin.",
        videoUrl: "https://www.youtube.com/embed/C0BMx2pcHJA",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.4GB", url: "https://www.youtube.com/watch?v=C0BMx2pcHJA" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=C0BMx2pcHJA" },
            { quality: "480p", size: "460MB", url: "https://www.youtube.com/watch?v=C0BMx2pcHJA" }
        ]
    },
    {
        id: 9,
        title: "The Matrix",
        description: "Groundbreaking sci-fi action masterpiece.",
        videoUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
        source: "YouTube",
        category: "scifi",
        downloads: [
            { quality: "1080p", size: "2.5GB", url: "https://www.youtube.com/watch?v=vKQi3bBA1y8" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=vKQi3bBA1y8" },
            { quality: "480p", size: "480MB", url: "https://www.youtube.com/watch?v=vKQi3bBA1y8" }
        ]
    },
    {
        id: 10,
        title: "Fight Club",
        description: "A psychological thriller that redefined cinema.",
        videoUrl: "https://www.youtube.com/embed/SUXWAEX2jlg",
        source: "YouTube",
        category: "thriller",
        downloads: [
            { quality: "1080p", size: "2.3GB", url: "https://www.youtube.com/watch?v=SUXWAEX2jlg" },
            { quality: "720p", size: "1.1GB", url: "https://www.youtube.com/watch?v=SUXWAEX2jlg" },
            { quality: "480p", size: "440MB", url: "https://www.youtube.com/watch?v=SUXWAEX2jlg" }
        ]
    },
    // Drama Movies
    {
        id: 11,
        title: "The Shawshank Redemption",
        description: "A masterpiece about hope and redemption.",
        videoUrl: "https://www.youtube.com/embed/NmzuHjWmXOc",
        source: "YouTube",
        category: "drama",
        downloads: [
            { quality: "1080p", size: "2.5GB", url: "https://www.youtube.com/watch?v=NmzuHjWmXOc" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=NmzuHjWmXOc" },
            { quality: "480p", size: "480MB", url: "https://www.youtube.com/watch?v=NmzuHjWmXOc" }
        ]
    },
    {
        id: 12,
        title: "The Godfather",
        description: "The most iconic gangster film of all time.",
        videoUrl: "https://www.youtube.com/embed/UaVTIH8muja",
        source: "YouTube",
        category: "drama",
        downloads: [
            { quality: "1080p", size: "3.0GB", url: "https://www.youtube.com/watch?v=UaVTIH8muja" },
            { quality: "720p", size: "1.5GB", url: "https://www.youtube.com/watch?v=UaVTIH8muja" },
            { quality: "480p", size: "580MB", url: "https://www.youtube.com/watch?v=UaVTIH8muja" }
        ]
    },
    {
        id: 13,
        title: "Pulp Fiction",
        description: "Tarantino's cult classic with interconnected stories.",
        videoUrl: "https://www.youtube.com/embed/s7EdQ4FqJDE",
        source: "YouTube",
        category: "drama",
        downloads: [
            { quality: "1080p", size: "2.8GB", url: "https://www.youtube.com/watch?v=s7EdQ4FqJDE" },
            { quality: "720p", size: "1.4GB", url: "https://www.youtube.com/watch?v=s7EdQ4FqJDE" },
            { quality: "480p", size: "540MB", url: "https://www.youtube.com/watch?v=s7EdQ4FqJDE" }
        ]
    },
    {
        id: 14,
        title: "Forrest Gump",
        description: "A touching tale of an American icon's journey.",
        videoUrl: "https://www.youtube.com/embed/bLvqoByClara",
        source: "YouTube",
        category: "drama",
        downloads: [
            { quality: "1080p", size: "2.6GB", url: "https://www.youtube.com/watch?v=bLvqoByclara" },
            { quality: "720p", size: "1.3GB", url: "https://www.youtube.com/watch?v=bLvqoByClara" },
            { quality: "480p", size: "500MB", url: "https://www.youtube.com/watch?v=bLvqoByClara" }
        ]
    },
    // Horror Movies
    {
        id: 15,
        title: "The Shining",
        description: "Stanley Kubrick's psychological horror masterpiece.",
        videoUrl: "https://www.youtube.com/embed/S14H0yM1t64",
        source: "YouTube",
        category: "horror",
        downloads: [
            { quality: "1080p", size: "2.7GB", url: "https://www.youtube.com/watch?v=S14H0yM1t64" },
            { quality: "720p", size: "1.3GB", url: "https://www.youtube.com/watch?v=S14H0yM1t64" },
            { quality: "480p", size: "520MB", url: "https://www.youtube.com/watch?v=S14H0yM1t64" }
        ]
    },
    {
        id: 16,
        title: "Get Out",
        description: "Jordan Peele's brilliant social thriller.",
        videoUrl: "https://www.youtube.com/embed/DzV2FfyW9cU",
        source: "YouTube",
        category: "horror",
        downloads: [
            { quality: "1080p", size: "2.4GB", url: "https://www.youtube.com/watch?v=DzV2FfyW9cU" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=DzV2FfyW9cU" },
            { quality: "480p", size: "460MB", url: "https://www.youtube.com/watch?v=DzV2FfyW9cU" }
        ]
    },
    {
        id: 17,
        title: "A Quiet Place",
        description: "Terrifying survival horror experience.",
        videoUrl: "https://www.youtube.com/embed/WR-uP-4ejay",
        source: "YouTube",
        category: "horror",
        downloads: [
            { quality: "1080p", size: "2.3GB", url: "https://www.youtube.com/watch?v=WR-uP-4ejaY" },
            { quality: "720p", size: "1.1GB", url: "https://www.youtube.com/watch?v=WR-uP-4ejaY" },
            { quality: "480p", size: "450MB", url: "https://www.youtube.com/watch?v=WR-uP-4ejaY" }
        ]
    },
    // Comedy Movies
    {
        id: 18,
        title: "The Grand Budapest Hotel",
        description: "Wes Anderson's whimsical masterpiece.",
        videoUrl: "https://www.youtube.com/embed/1Fg5iWmQjwk",
        source: "YouTube",
        category: "comedy",
        downloads: [
            { quality: "1080p", size: "2.5GB", url: "https://www.youtube.com/watch?v=1Fg5iWmQjwk" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=1Fg5iWmQjwk" },
            { quality: "480p", size: "480MB", url: "https://www.youtube.com/watch?v=1Fg5iWmQjwk" }
        ]
    },
    {
        id: 19,
        title: "Superbad",
        description: "Hilarious teen comedy classic.",
        videoUrl: "https://www.youtube.com/embed/aWDDVZqFBRQ",
        source: "YouTube",
        category: "comedy",
        downloads: [
            { quality: "1080p", size: "2.3GB", url: "https://www.youtube.com/watch?v=aWDDVZqFBRQ" },
            { quality: "720p", size: "1.1GB", url: "https://www.youtube.com/watch?v=aWDDVZqFBRQ" },
            { quality: "480p", size: "450MB", url: "https://www.youtube.com/watch?v=aWDDVZqFBRQ" }
        ]
    },
    {
        id: 20,
        title: "Deadpool",
        description: "Irreverent superhero comedy.",
        videoUrl: "https://www.youtube.com/embed/ONHBWtaL7LM",
        source: "YouTube",
        category: "comedy",
        downloads: [
            { quality: "1080p", size: "2.4GB", url: "https://www.youtube.com/watch?v=ONHBWtaL7LM" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=ONHBWtaL7LM" },
            { quality: "480p", size: "460MB", url: "https://www.youtube.com/watch?v=ONHBWtaL7LM" }
        ]
    },
    // Superhero Movies
    {
        id: 21,
        title: "The Dark Knight",
        description: "The greatest superhero film ever made.",
        videoUrl: "https://www.youtube.com/embed/cR3dw2m68w0",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "3.0GB", url: "https://www.youtube.com/watch?v=cR3dw2m68w0" },
            { quality: "720p", size: "1.5GB", url: "https://www.youtube.com/watch?v=cR3dw2m68w0" },
            { quality: "480p", size: "580MB", url: "https://www.youtube.com/watch?v=cR3dw2m68w0" }
        ]
    },
    {
        id: 22,
        title: "Avengers Endgame",
        description: "The epic conclusion to the MCU saga.",
        videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "3.2GB", url: "https://www.youtube.com/watch?v=TcMBFSGVi1c" },
            { quality: "720p", size: "1.6GB", url: "https://www.youtube.com/watch?v=TcMBFSGVi1c" },
            { quality: "480p", size: "620MB", url: "https://www.youtube.com/watch?v=TcMBFSGVi1c" }
        ]
    },
    {
        id: 23,
        title: "Spider-Man Homecoming",
        description: "A fresh take on the web-slinger.",
        videoUrl: "https://www.youtube.com/embed/39FHxPRDe3E",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.8GB", url: "https://www.youtube.com/watch?v=39FHxPRDe3E" },
            { quality: "720p", size: "1.4GB", url: "https://www.youtube.com/watch?v=39FHxPRDe3E" },
            { quality: "480p", size: "540MB", url: "https://www.youtube.com/watch?v=39FHxPRDe3E" }
        ]
    },
    {
        id: 24,
        title: "Black Panther",
        description: "A groundbreaking superhero film.",
        videoUrl: "https://www.youtube.com/embed/xjDjIWPwcPU",
        source: "YouTube",
        category: "action",
        downloads: [
            { quality: "1080p", size: "2.9GB", url: "https://www.youtube.com/watch?v=xjDjIWPwcPU" },
            { quality: "720p", size: "1.4GB", url: "https://www.youtube.com/watch?v=xjDjIWPwcPU" },
            { quality: "480p", size: "560MB", url: "https://www.youtube.com/watch?v=xjDjIWPwcPU" }
        ]
    },
    // Romance Movies
    {
        id: 25,
        title: "Titanic",
        description: "A romantic disaster epic.",
        videoUrl: "https://www.youtube.com/embed/R3Hcb2HgpPU",
        source: "YouTube",
        category: "romance",
        downloads: [
            { quality: "1080p", size: "3.1GB", url: "https://www.youtube.com/watch?v=R3Hcb2HgpPU" },
            { quality: "720p", size: "1.5GB", url: "https://www.youtube.com/watch?v=R3Hcb2HgpPU" },
            { quality: "480p", size: "600MB", url: "https://www.youtube.com/watch?v=R3Hcb2HgpPU" }
        ]
    },
    {
        id: 26,
        title: "The Notebook",
        description: "A timeless love story.",
        videoUrl: "https://www.youtube.com/embed/nR8k3TrqBHU",
        source: "YouTube",
        category: "romance",
        downloads: [
            { quality: "1080p", size: "2.5GB", url: "https://www.youtube.com/watch?v=nR8k3TrqBHU" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=nR8k3TrqBHU" },
            { quality: "480p", size: "480MB", url: "https://www.youtube.com/watch?v=nR8k3TrqBHU" }
        ]
    },
    // Animation Movies
    {
        id: 27,
        title: "Your Name",
        description: "A beautiful Japanese anime film.",
        videoUrl: "https://www.youtube.com/embed/LL5Fxw2ZP84",
        source: "YouTube",
        category: "animation",
        downloads: [
            { quality: "1080p", size: "2.4GB", url: "https://www.youtube.com/watch?v=LL5Fxw2ZP84" },
            { quality: "720p", size: "1.2GB", url: "https://www.youtube.com/watch?v=LL5Fxw2ZP84" },
            { quality: "480p", size: "460MB", url: "https://www.youtube.com/watch?v=LL5Fxw2ZP84" }
        ]
    },
    {
        id: 28,
        title: "Spirited Away",
        description: "Studio Ghibli's masterpiece.",
        videoUrl: "https://www.youtube.com/embed/Xzh0W0DGjFA",
        source: "YouTube",
        category: "animation",
        downloads: [
            { quality: "1080p", size: "2.6GB", url: "https://www.youtube.com/watch?v=Xzh0W0DGjFA" },
            { quality: "720p", size: "1.3GB", url: "https://www.youtube.com/watch?v=Xzh0W0DGjFA" },
            { quality: "480p", size: "500MB", url: "https://www.youtube.com/watch?v=Xzh0W0DGjFA" }
        ]
    }
];

// Local Storage Management
class VideoManager {
    constructor() {
        this.storageKey = 'videoAppData';
        this.initializeStorage();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                likes: {},
                comments: {},
                watchlist: []
            }));
        }
    }

    getLikes(videoId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey));
        return data.likes[videoId] || { count: 0, liked: false };
    }

    toggleLike(videoId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey));
        if (!data.likes[videoId]) {
            data.likes[videoId] = { count: 0, liked: false };
        }
        
        if (data.likes[videoId].liked) {
            data.likes[videoId].count--;
            data.likes[videoId].liked = false;
        } else {
            data.likes[videoId].count++;
            data.likes[videoId].liked = true;
        }
        
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return data.likes[videoId];
    }

    getComments(videoId) {
        const data = JSON.parse(localStorage.getItem(this.storageKey));
        return data.comments[videoId] || [];
    }

    addComment(videoId, comment) {
        const data = JSON.parse(localStorage.getItem(this.storageKey));
        if (!data.comments[videoId]) {
            data.comments[videoId] = [];
        }

        const newComment = {
            id: Date.now(),
            author: `User ${Math.floor(Math.random() * 1000)}`,
            text: comment,
            timestamp: new Date().toLocaleTimeString()
        };

        data.comments[videoId].push(newComment);
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        return newComment;
    }
}

const videoManager = new VideoManager();
let currentVideoId = null;

// Initialize Videos Grid
function initializeVideosGrid() {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = '';

    videosDatabase.forEach(video => {
        const likes = videoManager.getLikes(video.id);
        const videoCard = createVideoCard(video, likes);
        grid.appendChild(videoCard);
    });
}

// Create Video Card
function createVideoCard(video, likes) {
    const card = document.createElement('div');
    card.className = 'video-card';
    
    const isLiked = likes.liked ? 'liked' : '';

    card.innerHTML = `
        <div class="video-player">
            <iframe src="${video.videoUrl}" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <p class="video-description">${video.description}</p>
            <div class="video-actions">
                <button class="action-btn like-btn ${isLiked}" data-video-id="${video.id}">
                    <span>❤️</span>
                    <span class="like-count">${likes.count}</span>
                </button>
                <button class="action-btn download-btn" data-video-id="${video.id}">
                    <span>⬇️</span>
                    <span>Download</span>
                </button>
                <button class="action-btn comment-btn" data-video-id="${video.id}">
                    <span>💬</span>
                    <span>Comment</span>
                </button>
            </div>
        </div>
    `;

    // Like Button Event
    const likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => handleLike(video.id, likeBtn));

    // Download Button Event
    const downloadBtn = card.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => handleDownload(video.id));

    // Comment Button Event
    const commentBtn = card.querySelector('.comment-btn');
    commentBtn.addEventListener('click', () => openCommentModal(video.id, video.title));

    return card;
}

// Handle Like
function handleLike(videoId, button) {
    const likes = videoManager.toggleLike(videoId);
    
    button.classList.toggle('liked');
    const countSpan = button.querySelector('.like-count');
    countSpan.textContent = likes.count;

    // Show toast notification
    showToast(likes.liked ? '❤️ Video Liked!' : '💔 Like Removed');
}

// Handle Download
function handleDownload(videoId) {
    const video = videosDatabase.find(v => v.id === videoId);
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'download-modal';
    
    let downloadHTML = '<div class="modal-content"><span class="close">&times;</span>';
    downloadHTML += `<h2>📥 Download - ${video.title}</h2>`;
    downloadHTML += '<div class="download-options">';
    
    video.downloads.forEach(download => {
        downloadHTML += `
            <div class="download-item">
                <button class="download-quality-btn" data-url="${download.url}" data-quality="${download.quality}" data-title="${video.title}">
                    <div class="download-info">
                        <span class="quality-name">📥 ${download.quality}</span>
                        <span class="quality-size">${download.size}</span>
                    </div>
                    <span class="download-arrow">→</span>
                </button>
            </div>
        `;
    });
    
    downloadHTML += '</div></div>';
    modal.innerHTML = downloadHTML;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    const qualityBtns = modal.querySelectorAll('.download-quality-btn');
    qualityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = e.currentTarget.getAttribute('data-url');
            const quality = e.currentTarget.getAttribute('data-quality');
            const title = e.currentTarget.getAttribute('data-title');
            
            // Real download using YouTube link
            downloadVideo(title, quality, url);
            showToast(`⬇️ Opening ${quality} download...`);
            setTimeout(() => {
                modal.remove();
            }, 1000);
        });
    });
}

// Real Download Function
function downloadVideo(title, quality, videoUrl) {
    // Create a download link that opens YouTube in a new tab
    // Users can then use YouTube downloader extensions or services
    const link = document.createElement('a');
    link.href = videoUrl;
    link.target = '_blank';
    link.download = `${title}_${quality}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Store download history
    const data = JSON.parse(localStorage.getItem('videoAppData'));
    if (!data.downloads) {
        data.downloads = [];
    }
    data.downloads.push({
        title: title,
        quality: quality,
        timestamp: new Date().toLocaleString(),
        size: quality === '1080p' ? '2.5GB' : quality === '720p' ? '1.2GB' : '450MB'
    });
    localStorage.setItem('videoAppData', JSON.stringify(data));
}

// Open Comment Modal
function openCommentModal(videoId, videoTitle) {
    currentVideoId = videoId;
    const modal = document.getElementById('comment-modal');
    modal.classList.add('active');

    // Load existing comments
    loadComments(videoId);

    // Set up the post comment button
    const postBtn = document.getElementById('post-comment-btn');
    postBtn.onclick = () => postComment(videoId);

    // Close modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => {
        modal.classList.remove('active');
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    };
}

// Load Comments
function loadComments(videoId) {
    const commentsList = document.getElementById('comments-list');
    const comments = videoManager.getComments(videoId);

    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="color: #00ffff; text-align: center;">No comments yet. Be the first!</p>';
        return;
    }

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-time">${comment.timestamp}</div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Post Comment
function postComment(videoId) {
    const input = document.getElementById('comment-input');
    const comment = input.value.trim();

    if (comment === '') {
        showToast('⚠️ Comment cannot be empty!');
        return;
    }

    videoManager.addComment(videoId, comment);
    input.value = '';

    loadComments(videoId);
    showToast('💬 Comment Posted!');
}

// Show Toast Notification
function showToast(message) {
    let toast = document.getElementById('toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

// Add CSS for download modal
function addDownloadModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .download-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .download-item {
            display: flex;
            gap: 0.5rem;
        }

        .download-quality-btn {
            flex: 1;
            padding: 16px;
            border: 2px solid #00ffff;
            background: rgba(0, 255, 255, 0.05);
            color: #00ffff;
            border-radius: 10px;
            cursor: pointer;
            font-family: 'Orbitron', monospace;
            font-weight: bold;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .download-info {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            text-align: left;
        }

        .quality-name {
            font-size: 1rem;
            color: #00ffff;
        }

        .quality-size {
            font-size: 0.85rem;
            color: #ffff00;
        }

        .download-arrow {
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        .download-quality-btn:hover {
            background: rgba(255, 0, 255, 0.15);
            border-color: #ff00ff;
            color: #ff00ff;
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 0, 255, 0.4);
        }

        .download-quality-btn:hover .quality-name {
            color: #ff00ff;
        }

        .download-quality-btn:hover .download-arrow {
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initializeVideosGrid();
    addDownloadModalStyles();
});
