# 🔥 Firebase Setup Guide - NEXUS Video Platform

## Quick Start: Set Up Firebase in 5 Minutes

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Enter project name: `nexus-video-platform`
4. Click "Continue"
5. Disable Google Analytics (optional)
6. Click "Create Project"
7. Wait for project creation to complete

### Step 2: Set Up Authentication

1. In Firebase Console, go to **Authentication** section
2. Click "Get started"
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider
5. Save changes

### Step 3: Create Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click "Create database"
3. Choose **Start in test mode**
4. Select your location
5. Click "Create"

### Step 4: Set Up Cloud Storage

1. Go to **Cloud Storage** in Firebase Console
2. Click "Get started"
3. Start in **test mode**
4. Select your location
5. Click "Done"

### Step 5: Get Your Firebase Config

1. In Firebase Console, click the gear icon (⚙️) at the top
2. Select "Project Settings"
3. Go to "General" tab
4. Scroll down to "Your apps" section
5. Click "Web" icon (</>)
6. Register your app with any name
7. Copy the config object

### Step 6: Update firebaseConfig.js

Open `firebaseConfig.js` in your editor and replace the placeholder values with your config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};
```

### Step 7: Set Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Videos collection
    match /videos/{videoId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth.uid == resource.data.uploadedBy;
      allow delete: if request.auth.uid == resource.data.uploadedBy;
    }
    
    // Shares collection
    match /shares/{shareId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 8: Set Cloud Storage Security Rules

1. In Cloud Storage, go to **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### Step 9: Test the Setup

1. Open `index.html` in your browser
2. Try to sign up with a new account
3. Upload a test video
4. Share video with another user
5. Check Firebase Console to see data in collections

---

## Firebase Collections Structure

### `users` Collection
```javascript
{
  uid: "firebase-uid",
  email: "user@example.com",
  username: "username",
  profilePic: "emoji",
  createdAt: "2024-01-01T12:00:00Z",
  uploadedVideos: ["videoId1", "videoId2"],
  favorites: {},
  comments: {},
  downloads: [],
  watchlist: [],
  sharedWithMe: [
    {
      videoId: "id",
      sharedFrom: "uid",
      sharedAt: "2024-01-01T12:00:00Z"
    }
  ],
  iShared: [
    {
      videoId: "id",
      sharedWith: "uid",
      sharedAt: "2024-01-01T12:00:00Z"
    }
  ],
  theme: "dark"
}
```

### `videos` Collection
```javascript
{
  title: "Video Title",
  description: "Description",
  category: "category",
  uploadedBy: "userId",
  uploadedByUsername: "username",
  uploadedByEmail: "email",
  videoUrl: "firebase-storage-url",
  thumbnailUrl: "firebase-storage-url",
  uploadedAt: "2024-01-01T12:00:00Z",
  likes: ["userId1", "userId2"],
  comments: [
    {
      userId: "userId",
      username: "username",
      text: "comment text",
      timestamp: "2024-01-01T12:00:00Z"
    }
  ],
  downloads: ["userId1"],
  shares: ["userId1"],
  isPublic: true,
  views: 0
}
```

### `shares` Collection
```javascript
{
  videoId: "id",
  sharedFrom: "userId",
  sharedTo: "userId",
  sharedAt: "2024-01-01T12:00:00Z"
}
```

---

## Cloud Storage Structure

```
gs://your-bucket/
└── videos/
    └── {userId}/
        ├── {timestamp}_filename.mp4
        └── {timestamp}_filename.webm
```

---

## Common Issues & Solutions

### "Firebase is not defined"
**Solution:** Make sure Firebase SDK is loaded before firebaseConfig.js
- Check: `<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>`

### "Auth not initialized"
**Solution:** Ensure firebaseConfig.js is loaded
- Add to `index.html` before other scripts

### "Permission denied" error
**Solution:** Update Firestore and Storage security rules
- Check rules match the ones above
- Wait a few seconds after publishing

### Users can't upload
**Solution:** Check Cloud Storage permissions
- Verify Cloud Storage is enabled
- Check storage rules allow writes for authenticated users

### Videos not appearing after upload
**Solution:** 
1. Check Firestore database has video documents
2. Verify Cloud Storage has video files
3. Check browser console for errors
4. Reload page to refresh

---

## Testing Checklist

- [ ] Can create account
- [ ] Can login with email/password
- [ ] Can logout
- [ ] Can upload video
- [ ] Video appears in grid
- [ ] Can like video
- [ ] Can comment on video
- [ ] Can download video
- [ ] Can share video with another user
- [ ] Shared videos appear in "Shared with Me"
- [ ] Can switch dark/light theme
- [ ] Theme preference persists

---

## File Structure Updated

```
video site/
├── index.html
├── firebaseConfig.js          (NEW - Firebase configuration)
├── firebaseUserManager.js     (NEW - Firebase authentication)
├── firebaseUploadManager.js   (NEW - Firebase video upload)
├── videoSharingManager.js     (NEW - Video sharing)
├── ... (other existing files)
```

---

## Next Steps

1. ✅ Complete steps 1-8 above
2. ✅ Update firebaseConfig.js with your config
3. ✅ Test with sample account
4. ✅ Share with friends!

---

## Additional Resources

- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Cloud Firestore Guide](https://firebase.google.com/docs/firestore)
- [Cloud Storage Guide](https://firebase.google.com/docs/storage)

---

**Setup Time:** ~5 minutes  
**Difficulty:** Easy  
**Free Tier:** Includes 1GB storage, 50K reads/day  

Enjoy your Firebase-powered NEXUS Video Platform! 🚀
