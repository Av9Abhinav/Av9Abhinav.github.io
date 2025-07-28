const validPages = ['home', 'about', 'skills', 'projects', 'gallery', 'contact'];
let lastPage = null;

function setThemeColor(color) {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
        metaTag.setAttribute('content', color);
    }
}

function showPage(pageId) {
    // If no hash or invalid page → fallback to home
    if (!validPages.includes(pageId)) {
        pageId = 'home';
        history.replaceState(null, '', '#home');
        console.warn("Invalid or empty hash. Redirected to #home");
    }

    if (pageId === lastPage) return;
    lastPage = pageId;

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

    // Update footer link with UTM tracking
    const footerLink = document.getElementById("footer-link");
    if (footerLink) {
        const utmURL = `https://iabhinav.me?utm_source=av9abhinav&utm_medium=footer&utm_campaign=footer_from_${pageId}`;
        footerLink.setAttribute("href", utmURL);
    }
}

// Toggle hamburger menu (mobile)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// On hash change (back/forward buttons or manual change)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || !validPages.includes(hash)) {
        window.location.hash = '#home';
        window.location.reload();
    }
    showPage(hash || 'home');
});

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (!hash || !validPages.includes(hash)) {
        window.location.hash = '#home';
    }

    // Typing effect for homepage
    new Typed("#typed-text", {
        strings: [
            "Welcome to My Portfolio",
            "Tech Enthusiast from Bangalore",
            "NIT Trichy Postgraduate"
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 3000,
        loop: true,
        showCursor: true,
        cursorChar: " |"
    });

    setTimeout(() => {
        setThemeColor("#00001e");
    }, 2000);

    showPage(hash || 'home');
});

//function toggleAccordion(clickedHeader) {
//  const allCards = document.querySelectorAll('.accordion-card');
//
//  allCards.forEach(card => {
//    const header = card.querySelector('.accordion-header');
//    const body = card.querySelector('.accordion-body');
//
//    if (header !== clickedHeader) {
//      header.classList.remove('open');
//      body.classList.remove('open');
//    }
//  });
//
//  const body = clickedHeader.nextElementSibling;
//  clickedHeader.classList.toggle('open');
//  body.classList.toggle('open');
//}

