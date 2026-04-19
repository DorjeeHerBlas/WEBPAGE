// ─── Matrix Background Effect ───────────────────────────────────────────────
function createMatrixBackground() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.querySelector('.matrix-bg').appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let rainDrops = [];

    function initDrops() {
        rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
    }
    initDrops();

    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        initDrops();
    });
}

// ─── Real Typewriter Effect ──────────────────────────────────────────────────
// Each .type-text element must have a data-text attribute with the target string.
function typeWriterEffect() {
    const elements = document.querySelectorAll('.type-text');

    elements.forEach((el, index) => {
        const fullText = el.getAttribute('data-text') || '';
        el.textContent = '';
        el.style.opacity = '1'; // visible from the start, we build content char by char

        let charIndex = 0;
        const baseDelay = index * 600; // stagger each line

        setTimeout(() => {
            const interval = setInterval(() => {
                if (charIndex < fullText.length) {
                    el.textContent += fullText[charIndex];
                    charIndex++;
                    playKey();
                } else {
                    clearInterval(interval);
                }
            }, 35);
        }, baseDelay);
    });
}

// ─── Smooth Scrolling ────────────────────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            playClick();

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;

            const offset = (targetId === '#about' || targetId === '#education') ? 20 : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}

// ─── Active Nav Highlight ────────────────────────────────────────────────────
function initActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.cyberpunk-nav a[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('data-section') === id);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-60px 0px -40% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
function handleSectionVisibility() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill cards + bars when skills section becomes visible
                if (entry.target.id === 'skills') {
                    entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            // Trigger bar animation by adding .animated class
                            const bar = card.querySelector('.level-bar');
                            if (bar) bar.classList.add('animated');
                        }, index * 80);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    sections.forEach(section => observer.observe(section));
}

// ─── Sound Effects ────────────────────────────────────────────────────────────
// Sound is OFF by default — only activates after user explicitly enables it.
let soundEnabled = false;
let audioLoaded = false;

const AUDIO_SOURCES = {
    'bg-music': 'https://cdn.pixabay.com/audio/2023/10/29/14-16-19-672_200x200.mp3',
    'click-sound': 'https://cdn.pixabay.com/audio/2022/05/13/16-35-43-54_200x200.mp3',
    'key-sound': 'https://cdn.pixabay.com/audio/2022/08/02/00-15-02-598_200x200.mp3',
    'nav-hover-sound': 'https://cdn.pixabay.com/audio/2022/03/10/15-43-24-182_200x200.mp3'
};

function loadAudio() {
    if (audioLoaded) return;
    audioLoaded = true;
    Object.entries(AUDIO_SOURCES).forEach(([id, src]) => {
        const el = document.getElementById(id);
        if (el) el.src = src;
    });
}

function playSound(audioId) {
    if (!soundEnabled) return;
    const audio = document.getElementById(audioId);
    if (audio && audio.src) {
        audio.currentTime = 0;
        audio.play().catch(() => {}); // silence AbortError on rapid triggers
    }
}

function playClick() { playSound('click-sound'); }
function playKey() { /* intentionally silent during typing — avoid spam */ }
function playNavHover() { playSound('nav-hover-sound'); }

function toggleSound() {
    loadAudio(); // load sources on first interaction

    soundEnabled = !soundEnabled;
    const bgMusic = document.getElementById('bg-music');
    const icon = document.getElementById('sound-icon');

    if (soundEnabled) {
        bgMusic.play().catch(() => {});
        if (icon) { icon.classList.remove('fa-volume-mute'); icon.classList.add('fa-volume-up'); }
    } else {
        bgMusic.pause();
        if (icon) { icon.classList.remove('fa-volume-up'); icon.classList.add('fa-volume-mute'); }
    }
}

// ─── Project Toggle ───────────────────────────────────────────────────────────
function toggleProject(projectId) {
    playClick();
    const content = document.getElementById(`${projectId}-content`);
    const button = document.querySelector(`[onclick="toggleProject('${projectId}')"]`);
    const wasExpanded = content.classList.contains('expanded');

    // Close all first
    document.querySelectorAll('.project-content').forEach(item => item.classList.remove('expanded'));
    document.querySelectorAll('.toggle-project').forEach(btn => btn.classList.remove('expanded'));

    if (!wasExpanded) {
        content.classList.add('expanded');
        button.classList.add('expanded');

        requestAnimationFrame(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });

        // Attach fullscreen click to images
        content.querySelectorAll('.project-gallery img').forEach(img => {
            img.onclick = function () { showFullscreenImage(this.src); };
        });
    }
}

function showFullscreenImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.innerHTML = `
        <div class="fullscreen-content">
            <img src="${src}" alt="Fullscreen view">
            <button class="close-fullscreen">×</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const close = () => {
        overlay.classList.add('closing');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.close-fullscreen').onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };

    const escListener = (e) => {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escListener); }
    };
    document.addEventListener('keydown', escListener);
}

// ─── Cursor Trail ─────────────────────────────────────────────────────────────
function initCursorTrail() {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    createMatrixBackground();
    initSmoothScroll();
    initActiveNav();
    handleSectionVisibility();
    initCursorTrail();
    typeWriterEffect();

    // Hover sound on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', playNavHover);
    });
});
