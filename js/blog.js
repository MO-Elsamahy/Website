// Initialize Firebase (reuse config from admin-dashboard/firebase-config.js)
const firebaseConfig = {
  apiKey: "AIzaSyBW2fJ2t-MkCw82Aak94e9Rf5s1QkAb0mU",
  authDomain: "website-2025-ef12e.firebaseapp.com",
  projectId: "website-2025-ef12e",
  storageBucket: "website-2025-ef12e.appspot.com"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
  const blogList = document.getElementById('blog-list');
  db.collection('blogs').orderBy('createdAt', 'desc').get().then(snapshot => {
    blogList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'blog-item';
      div.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p>`;
      blogList.appendChild(div);
    });
  });
}); 