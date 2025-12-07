// === SMOOTH FADE-IN ON SCROLL ===
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach((el) => observer.observe(el));
});

// === NAVBAR COLOR CHANGE ON SCROLL ===
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const menuLabel = document.querySelector('.menu-icon');
const navLinks = document.getElementById('primary-nav');
const navLinkItems = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

const updateNavA11y = () => {
    if (!navLinks || !menuToggle) return;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    const expanded = menuToggle.checked;

    if (mobile) {
        navLinks.setAttribute('aria-hidden', (!expanded).toString());
        navLinkItems.forEach(link => {
            link.tabIndex = expanded ? 0 : -1;
        });
    } else {
        navLinks.removeAttribute('aria-hidden');
        navLinkItems.forEach(link => link.tabIndex = 0);
    }
};

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

window.addEventListener('resize', updateNavA11y);
window.addEventListener('orientationchange', updateNavA11y);

// === ACCESSIBLE HAMBURGER TOGGLE ===
const syncMenuState = () => {
    if (!menuToggle || !menuLabel) return;
    const expanded = menuToggle.checked;
    menuLabel.setAttribute('aria-expanded', expanded);
    menuLabel.setAttribute('aria-label', expanded ? 'Zavřít navigaci' : 'Otevřít navigaci');
    updateNavA11y();
};

if (menuToggle && menuLabel) {
    menuToggle.addEventListener('change', syncMenuState);
    menuLabel.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            menuToggle.checked = !menuToggle.checked;
            syncMenuState();
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
            syncMenuState();
        });
    });

    syncMenuState();
}
