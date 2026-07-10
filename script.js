
const slides = document.querySelectorAll('#carousel .slide');
const dotsWrap = document.getElementById('dots');
const AUTOPLAY_MS = 4000;
let current = 0;
let timer;

slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot bg-white/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('.dot');

function render() {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
        dot.classList.toggle('bg-white', i === current);
        dot.classList.toggle('bg-white/40', i !== current);
    });
}

function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
}

function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
}

document.getElementById('next').addEventListener('click', () => goTo(current + 1));
document.getElementById('prev').addEventListener('click', () => goTo(current - 1));

render();
restartAutoplay();

// ---- Mobile menu ----
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('flex');
    mobileMenu.classList.toggle('hidden', !isOpen);
    iconOpen.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
});
