// Firebase Configuration
// Get these values from: https://console.firebase.google.com/
// Project Settings > Service Accounts > Firebase SDK snippet > Config

const firebaseConfig = {
    apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxx",          // Replace with your apiKey
    authDomain: "your-project.firebaseapp.com",          // Replace with your authDomain
    projectId: "your-project",                            // Replace with your projectId
    storageBucket: "your-project.appspot.com",           // Replace with your storageBucket
    messagingSenderId: "123456789",                        // Replace with your messagingSenderId
    appId: "1:123456789:web:xxxxxxxxxxxxxxxx"             // Replace with your appId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("Firebase initialized successfully!");

// Firestore Collection Names
const USERS_COLLECTION = "users";
const VIDEOS_COLLECTION = "videos";
const SHARES_COLLECTION = "shares";
