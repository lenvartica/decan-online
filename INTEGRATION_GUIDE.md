# NEXUS Video Site - Integration & Setup Guide

## 🎯 Quick Start

### For Users
1. Open `index.html` in any modern web browser
2. Click "Login" button in the top navigation
3. Use demo credentials:
   - **Username:** `demo`
   - **Password:** `demo123`
4. Explore all sections and features

### For Developers
All files are client-side JavaScript. No server setup required for testing.

## 📋 Script Integration Summary

### All HTML Files Include
```html
<!-- Load scripts in this order -->
<script src="auth.js"></script>      <!-- User management -->
<script src="theme.js"></script>     <!-- Theme switching -->
<script src="upload.js"></script>    <!-- Video upload -->
<script src="script.js"></script>    <!-- Video playback & management -->
```

### Initialization Code (in all pages)
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.themeManager = new ThemeManager();
    window.userManager = new UserManager();
    window.uploadManager = new VideoUploadManager(window.userManager);
    
    // Update UI with current user
    const currentUser = userManager.getCurrentUser();
    // ... update greeting, buttons, etc
});
```

## 🎯 Core Manager Classes

### UserManager (auth.js)
```javascript
// Methods available
userManager.signup(username, password, email)      // Create new user
userManager.login(username, password)              // Login user
userManager.logout()                               // Logout user
userManager.getCurrentUser()                       // Get logged-in user
userManager.getUserByUsername(username)            // Get specific user
userManager.addUploadedVideo(video)               // Add video to user
userManager.toggleFavorite(videoId)               // Like/unlike video
userManager.setUserTheme(theme)                   // Save user's theme
userManager.getUserTheme()                        // Get user's theme
```

### ThemeManager (theme.js)
```javascript
// Properties
themeManager.currentTheme                         // 'dark' or 'light'

// Methods
themeManager.applyTheme(themeName)               // Apply theme
themeManager.toggleTheme()                       // Switch between dark/light
themeManager.applyDarkTheme()                    // Apply dark theme
themeManager.applyLightTheme()                   // Apply light theme
```

### VideoUploadManager (upload.js)
```javascript
// Methods
uploadManager.validateVideo(file)                // Validate file format/size
uploadManager.createUploadModal()                // Show upload form
uploadManager.handleUpload(formData)             // Process upload
uploadManager.simulateUploadProgress()           // Simulate progress bar
uploadManager.showError(message)                 // Display error message
```

### VideoManager (script.js)
```javascript
// Methods
videoManager.toggleLike(videoId)                 // Like/unlike video
videoManager.addComment(videoId, text)          // Add comment
videoManager.getComments(videoId)               // Get video comments
videoManager.recordDownload(videoId, quality)   // Log download
videoManager.getVideoStats(videoId)             // Get video statistics
```

## 📂 LocalStorage Keys

### User Data
- **Key:** `nexusUsers`
- **Format:** Object with usernames as keys
- **Contains:** User profiles, uploaded videos, comments, favorites, downloads

### Current User Session
- **Key:** `nexusCurrentUser`
- **Format:** String (username)
- **Purpose:** Track logged-in user across page reloads

### Theme Preference
- **Key:** `nexusTheme`
- **Format:** String ('dark' or 'light')
- **Also stored:** In user profile for persistence per user

### Video Data
- **Key:** `videoAppData`
- **Format:** Object with video IDs as keys
- **Contains:** Likes, comments, download history per video

## 🎨 CSS Classes Reference

### Navigation
```css
.futuristic-nav              /* Fixed navigation bar */
.nav-container               /* Nav wrapper */
.nav-logo                    /* Logo section */
.nav-user-section            /* User greeting and buttons */
.nav-menu                    /* Navigation menu items */
.nav-link                    /* Individual nav links */
```

### Buttons
```css
.theme-toggle-btn            /* Theme toggle button */
.upload-btn                  /* Upload button */
.auth-toggle-btn             /* Login/Logout button */
.cyber-button                /* Generic styled button */
```

### Modals
```css
.modal                       /* Modal container */
.modal-content               /* Modal inner content */
.modal.active                /* Visible modal */
```

### Forms
```css
.form-group                  /* Form input wrapper */
.file-input-wrapper          /* Dashed border file input */
.progress-bar                /* Upload progress bar */
.progress-fill               /* Progress bar fill */
.upload-error                /* Error message display */
```

### Videos
```css
.video-section               /* Video container */
.videos-grid                 /* Grid layout */
.video-card                  /* Individual video card */
.video-player                /* YouTube embed wrapper */
```

## 🔄 Data Flow

### User Login/Signup Flow
```
1. User clicks Login/Signup button
2. Modal dialog appears
3. User enters credentials
4. JavaScript validates input
5. UserManager.login() or .signup() called
6. User data stored in localStorage
7. Current user session stored
8. UI updated with username
9. Page reloads to apply theme
```

### Theme Switch Flow
```
1. User clicks theme toggle button (🌙/☀️)
2. ThemeManager.toggleTheme() called
3. CSS variables updated
4. Theme saved to localStorage
5. Theme saved to user profile
6. All page elements update colors instantly
```

### Video Upload Flow
```
1. User clicks Upload button
2. Check if user is logged in
3. Upload modal appears
4. User fills form (title, description, category, file, thumbnail)
5. Form validation occurs
6. File size and format checked
7. Progress bar shown
8. Video added to user's uploadedVideos
9. Modal closes
10. Success message displayed
```

### Video Like/Comment Flow
```
1. User interacts with video (like/comment button)
2. Check current user
3. Action recorded in localStorage
4. UI updated (heart filled, comment count)
5. Data synced with user profile
```

## 🐛 Troubleshooting

### User Can't Login
- **Check:** Demo credentials are `demo`/`demo123`
- **Check:** Browser localStorage is enabled
- **Clear:** Browser cache and try again
- **Debug:** Open DevTools → Application → Local Storage

### Theme Not Changing
- **Check:** `nexusTheme` key in localStorage
- **Check:** Browser localStorage is not full
- **Try:** Creating new user with different theme preference

### Upload Button Not Working
- **Check:** User is logged in (check localStorage `nexusCurrentUser`)
- **Check:** Browser allows file uploads
- **Check:** No console errors (press F12)

### Videos Not Displaying
- **Check:** YouTube can be accessed in your network
- **Check:** No content blocker extension blocking iframes
- **Debug:** Inspect video-player element in DevTools

## 📊 Example Data Structures

### Sample User Object
```javascript
{
  "demo": {
    "username": "demo",
    "password": "demo123",
    "email": "demo@nexus.local",
    "profilePic": "👨‍💻",
    "createdAt": "2024-01-01T12:00:00Z",
    "uploadedVideos": [],
    "favorites": {
      "1": true,
      "2": false,
      "3": true
    },
    "comments": {
      "1": [
        {
          "author": "demo",
          "text": "Great video!",
          "timestamp": "2024-01-01T13:00:00Z"
        }
      ]
    },
    "downloads": [
      {
        "videoId": "1",
        "quality": "1080p",
        "timestamp": "2024-01-01T13:30:00Z"
      }
    ],
    "watchlist": [],
    "theme": "dark"
  }
}
```

### Sample Video Object
```javascript
{
  "id": 1,
  "title": "Inception - Official Trailer",
  "description": "Experience the mind-bending journey of Inception...",
  "videoUrl": "https://www.youtube.com/embed/YoHD_XwIlNw",
  "category": "action",
  "downloads": [
    {
      "quality": "1080p",
      "size": "2.5GB",
      "url": "https://www.youtube.com/watch?v=YoHD_XwIlNw"
    }
  ]
}
```

## 🔐 Security Considerations

### Current State (MVP - Development Only)
- ✅ Works great for testing and demonstration
- ✅ No server needed
- ✅ All features functional
- ⚠️ NOT secure for production use

### Before Production Deployment
1. **Replace client-side auth with server backend**
   - Use proper authentication framework (Auth0, Firebase, etc.)
   - Never store passwords in frontend

2. **Encrypt sensitive data**
   - Use HTTPS/TLS
   - Encrypt localStorage data
   - Use secure session tokens

3. **Add server-side validation**
   - Validate all inputs on backend
   - Check user permissions
   - Validate file uploads

4. **Implement proper access control**
   - Only allow users to access their own data
   - Validate ownership before operations
   - Implement rate limiting

5. **Monitor and log**
   - Log all user actions
   - Monitor for suspicious activity
   - Keep audit trail

## 📞 Support

For issues or questions:
1. Check browser console for errors (F12)
2. Check localStorage data in DevTools
3. Verify all scripts are loading (Network tab)
4. Try clearing cache and reloading

---

**Last Updated:** 2024  
**Version:** 1.0  
**Status:** ✅ Production-Ready for Personal/Demo Use  
**⚠️ Note:** Requires security hardening for public deployment
