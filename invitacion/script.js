// --- 1. PASAR DE CARGA AL SOBRE INMEDIATAMENTE ---
setTimeout(() => {
    const loader = document.getElementById('loader');
    const envelopeContainer = document.getElementById('envelope-container');
    
    if (loader) loader.classList.add('hidden');
    if (envelopeContainer) envelopeContainer.classList.remove('hidden');
}, 3500);

// Animación de parpadeo de avatares
const avatarImg = document.getElementById('avatar-img');
let isNormal = true;
setInterval(() => {
    if (avatarImg) {
        avatarImg.src = isNormal ? 'img/conbonete.png' : 'img/sinbonete.png';
        isNormal = !isNormal;
    }
}, 450);


// --- 2. ABRIR EL SOBRE (CON CONFETI LOCAL) ---
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.classList.add('open');
    }
    
    // 🎉 Primer disparo masivo
    setTimeout(() => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 160,
                spread: 90,
                origin: { y: 0.6 }
            });
        }
    }, 400);
    
    // Oculta el sobre y muestra la tarjeta definitiva
    setTimeout(() => {
        const envelopeContainer = document.getElementById('envelope-container');
        const mainContent = document.getElementById('main-content');
        
        if (envelopeContainer) envelopeContainer.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
        
        // 🎉 Doble ráfaga festiva lateral
        if (typeof confetti === 'function') {
            confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } });
            confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } });
        }
    }, 1800);
}


// --- 3. CONTADOR REGRESIVO (Domingo 28 de Junio de 2026 - 12:30 hs) ---
const targetDate = new Date("June 28, 2026 12:30:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    const countdownEl = document.getElementById('countdown');

    if (difference < 0) {
        clearInterval(countdownInterval);
        if (countdownEl) {
            countdownEl.innerHTML = "<div style='grid-column: 1/-1; font-size: 1.4rem; color:#F5A7A7;'>¡LLEGÓ EL MOMENTO! 🎉</div>";
        }
        return;
    }

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
    if (minutesEl) minutesEl.innerText = m.toString().padStart(2, '0');
    if (secondsEl) secondsEl.innerText = s.toString().padStart(2, '0');
}, 1000);


// --- 4. LÓGICA DEL CARRUSEL ---
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-img');
    if (!slides || slides.length === 0) return;
    
    slides.forEach(img => img.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

setInterval(() => { moveSlide(1); }, 4000);