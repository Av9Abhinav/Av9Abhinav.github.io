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


    setTimeout(() => {
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
        setThemeColor("#00001e");
    }, 2000);

    removeSplash();
    showPage(hash || 'home');
});

function removeSplash() {
    setTimeout(() => {
        const splash = document.getElementById("splash-screen");
        if (splash) splash.remove();
    }, 3000);
}

// Secret Sequences
let terminalBuffer = '';
let abhinavBuffer = '';

const terminalSecret = 'terminal';
const abhinavSecret = 'abhinav';

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  // Only track letters
  if (/^[a-z]$/.test(key)) {
    terminalBuffer += key;
    abhinavBuffer += key;

    // Trim to max lengths
    if (terminalBuffer.length > terminalSecret.length) {
      terminalBuffer = terminalBuffer.slice(-terminalSecret.length);
    }
    if (abhinavBuffer.length > abhinavSecret.length) {
      abhinavBuffer = abhinavBuffer.slice(-abhinavSecret.length);
    }

    // Check matches
    if (terminalBuffer === terminalSecret) {
      window.location.href = 'https://terminal.iabhinav.me';
    }

    if (abhinavBuffer === abhinavSecret) {
      activateKonamiEasterEgg();
      abhinavBuffer = '';
    }

  } else {
    // Reset buffers on invalid keys
    terminalBuffer = '';
    abhinavBuffer = '';
  }

  // Escape key handling
  if (e.key === "Escape") {
    stopKonamiMusic();
  }
});

function activateKonamiEasterEgg() {
  const splash = document.getElementById("konami-splash");
  const audio = document.getElementById("konami-audio");

  if (splash) splash.style.display = "flex";
  startConfetti();

  if (audio) {
    try {
      audio.currentTime = 0;
      audio.play().catch(err => console.warn("Autoplay failed:", err));
    } catch (e) {
      console.error("Audio play error:", e);
    }
  }

  showToast("Press ESC to stop music");

  // Optional: auto-hide splash after 15s (music continues)
  setTimeout(() => {
    if (splash) splash.style.display = "none";
    stopConfetti();
  }, 15000);
}

function stopKonamiMusic() {
  const audio = document.getElementById("konami-audio");
  const splash = document.getElementById("konami-splash");

  if (audio && !audio.paused) {
    audio.pause();
    audio.currentTime = 0;
    showToast("🎵 Music stopped");
  }

  if (splash && splash.style.display !== "none") {
    splash.style.display = "none";
    stopConfetti();
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Confetti logic
let konamiConfettiCanvas;
let konamiCtx;
let konamiParticles = [];
let konamiAnimFrame;

function startConfetti() {
  konamiConfettiCanvas = document.getElementById("konami-confetti");
  konamiConfettiCanvas.width = window.innerWidth;
  konamiConfettiCanvas.height = window.innerHeight;
  konamiCtx = konamiConfettiCanvas.getContext("2d");

  konamiParticles = Array.from({ length: 120 }, () => ({
    x: Math.random() * konamiConfettiCanvas.width,
    y: Math.random() * -konamiConfettiCanvas.height,
    speed: Math.random() * 3 + 2,
    radius: Math.random() * 6 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  }));

  animateConfetti();
}

function animateConfetti() {
  konamiCtx.clearRect(0, 0, konamiConfettiCanvas.width, konamiConfettiCanvas.height);
  for (const p of konamiParticles) {
    konamiCtx.beginPath();
    konamiCtx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    konamiCtx.fillStyle = p.color;
    konamiCtx.fill();
    p.y += p.speed;
    if (p.y > konamiConfettiCanvas.height) p.y = -10;
  }
  konamiAnimFrame = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
  cancelAnimationFrame(konamiAnimFrame);
}



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

