// Animated tech background using particles.js
window.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('tech-bg')) {
    particlesJS.load('tech-bg', 'js/particles-config.json');
  }

  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      document.body.classList.toggle('bg-dark');
      document.body.classList.toggle('text-light');
      document.body.classList.toggle('bg-light');
      document.body.classList.toggle('text-dark');
      // Save preference
      if (document.body.classList.contains('bg-dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
    // Load preference
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.body.classList.remove('bg-dark', 'text-light');
      document.body.classList.add('bg-light', 'text-dark');
    }
  }
}); 