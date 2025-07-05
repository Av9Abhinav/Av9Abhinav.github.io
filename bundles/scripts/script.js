// Show a specific section and highlight its nav link
function showPage(pageId) {
    // Hide all sections
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected section
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.classList.add('active');

    // Update active nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`nav ul li a[href="#${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    // Close mobile menu if open
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
    }
}

// Toggle hamburger menu (mobile)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Handle navigation on initial page load
window.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.replace('#', '') || 'home';
    showPage(initialPage);
});

// Handle hash change (user navigates manually or via browser back/forward)
window.addEventListener('hashchange', () => {
    const newPage = window.location.hash.replace('#', '') || 'home';
    showPage(newPage);
});
