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
  const portfolioList = document.getElementById('portfolio-list');
  db.collection('portfolio').orderBy('createdAt', 'desc').get().then(snapshot => {
    portfolioList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'portfolio-item';
      div.innerHTML = `<h3>${data.title}</h3><img src="${data.image}" alt="${data.title}" style="max-width:200px;"><p>${data.description}</p>`;
      portfolioList.appendChild(div);
    });
  });
}); 