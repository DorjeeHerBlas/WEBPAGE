// ─── #9 Deep-link scroll helper ──────────────────────────────────────────────
// Reads the actual rendered nav height so the offset is always correct,
// even on mobile where the nav wraps to two lines.
function getNavHeight() {
    const nav = document.getElementById('main-nav');
    return nav ? nav.getBoundingClientRect().height + 8 : 70;
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - getNavHeight();
    window.scrollTo({ top, behavior: 'smooth' });
}

// Handle hash on initial page load (deep links like portfolio.com/#skills)
function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
        const id = hash.slice(1);
        // Small delay to let layout settle after loader hides
        setTimeout(() => scrollToSection(id), 400);
    }
}

// ─── #8 Page Loader ───────────────────────────────────────────────────────────
const LOADER_MESSAGES = [
    '> Iniciando NormonCorp OS v2.4...',
    '> Cargando módulos...',
    '> Conectando matrix...',
    '> Sistema listo.'
];

function runLoader(onDone) {
    const loader = document.getElementById('page-loader');
    const line   = document.getElementById('loader-line');
    let msgIndex = 0;

    function nextMessage() {
        if (msgIndex >= LOADER_MESSAGES.length) {
            loader.classList.add('loader-hide');
            loader.addEventListener('transitionend', () => {
                loader.style.display = 'none';
                onDone();
            }, { once: true });
            return;
        }
        const msg = LOADER_MESSAGES[msgIndex++];
        let i = 0;
        line.textContent = '';
        const iv = setInterval(() => {
            line.textContent += msg[i++];
            if (i >= msg.length) {
                clearInterval(iv);
                setTimeout(nextMessage, 180);
            }
        }, 22);
    }
    nextMessage();
}

// ─── Matrix Background ────────────────────────────────────────────────────────
function createMatrixBackground() {
    const canvas  = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.querySelector('.matrix-bg').appendChild(canvas);

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums     = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;

    let columns  = Math.floor(canvas.width / fontSize);
    let rainDrops = Array.from({ length: columns }, () => 1);

    function draw() {
        context.fillStyle = 'rgba(0,0,0,0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
    }

    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        columns   = Math.floor(canvas.width / fontSize);
        rainDrops = Array.from({ length: columns }, () => 1);
    });
}

// ─── Real Typewriter Effect ───────────────────────────────────────────────────
function typeWriterEffect() {
    const elements = document.querySelectorAll('.type-text');
    elements.forEach((el, index) => {
        const fullText = el.getAttribute('data-text') || '';
        el.textContent = '';
        el.style.opacity = '1';
        let charIndex = 0;
        setTimeout(() => {
            const iv = setInterval(() => {
                if (charIndex < fullText.length) {
                    el.textContent += fullText[charIndex++];
                } else {
                    clearInterval(iv);
                }
            }, 28);
        }, index * 550);
    });
}

// ─── Smooth Scrolling (nav links) ─────────────────────────────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            playClick();
            scrollToSection(targetId);
        });
    });
}

// ─── Active Nav Highlight ─────────────────────────────────────────────────────
function initActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.cyberpunk-nav a[data-section]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('data-section') === id;
                    link.classList.toggle('active', isActive);
                    link.setAttribute('aria-current', isActive ? 'true' : 'false');
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' });

    sections.forEach(s => observer.observe(s));
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function handleSectionVisibility() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');

            if (entry.target.id === 'skills') {
                entry.target.querySelectorAll('.skill-card').forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        const bar = card.querySelector('.level-bar');
                        if (bar) bar.classList.add('animated');
                    }, i * 80);
                });
            }
        });
    }, { threshold: 0.08 });

    sections.forEach(s => observer.observe(s));
}

// ─── #12 GitHub Stats ─────────────────────────────────────────────────────────
const GITHUB_USER = 'DorjeeHerBlas';

async function loadGithubStats() {
    try {
        const [userRes, reposRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USER}`),
            fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const user  = await userRes.json();
        const repos = await reposRes.json();

        // ── Stat cards ──────────────────────────────────────────────────────
        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

        const statsData = [
            { icon: 'fa-code-branch', label: 'Repos',     value: user.public_repos },
            { icon: 'fa-star',        label: 'Stars',      value: totalStars },
            { icon: 'fa-code-fork',   label: 'Forks',      value: totalForks },
            { icon: 'fa-users',       label: 'Followers',  value: user.followers }
        ];

        const statsContainer = document.getElementById('github-stats-container');
        statsContainer.innerHTML = statsData.map(s => `
            <div class="github-stat-card" role="article" aria-label="${s.label}: ${s.value}">
                <i class="fas ${s.icon}" aria-hidden="true"></i>
                <span class="stat-value">${s.value}</span>
                <span class="stat-label">${s.label}</span>
            </div>
        `).join('');

        // ── Language breakdown ───────────────────────────────────────────────
        const langCount = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const sortedLangs = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
        const total = sortedLangs.reduce((s, [, v]) => s + v, 0);

        const LANG_COLORS = {
            'C++': '#f34b7d', 'C#': '#178600', 'Java': '#b07219',
            'Kotlin': '#A97BFF', 'Swift': '#ffac45', 'Python': '#3572A5',
            'JavaScript': '#f1e05a', 'HTML': '#e34c26', 'CSS': '#563d7c',
            'C': '#555555', 'default': '#0ff'
        };

        document.getElementById('github-langs').innerHTML = `
            <p class="github-section-label">&gt; Lenguajes más usados:</p>
            <div class="lang-bar-track" role="img" aria-label="Distribución de lenguajes">
                ${sortedLangs.map(([lang, count]) => `
                    <div class="lang-bar-segment"
                         style="width:${((count/total)*100).toFixed(1)}%;background:${LANG_COLORS[lang] || LANG_COLORS.default}"
                         title="${lang}: ${((count/total)*100).toFixed(1)}%"
                         aria-label="${lang} ${((count/total)*100).toFixed(1)}%">
                    </div>`).join('')}
            </div>
            <div class="lang-legend" aria-hidden="true">
                ${sortedLangs.map(([lang, count]) => `
                    <span class="lang-pill">
                        <span class="lang-dot" style="background:${LANG_COLORS[lang] || LANG_COLORS.default}"></span>
                        ${lang} <em>${((count/total)*100).toFixed(0)}%</em>
                    </span>`).join('')}
            </div>
        `;

        // ── Top repos ────────────────────────────────────────────────────────
        const topRepos = [...repos]
            .filter(r => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
            .slice(0, 4);

        document.getElementById('github-repos').innerHTML = `
            <p class="github-section-label">&gt; Repositorios destacados:</p>
            <div class="repo-grid">
                ${topRepos.map(r => `
                    <a href="${r.html_url}" target="_blank" rel="noopener noreferrer"
                       class="repo-card" aria-label="${r.name}, ${r.description || 'Sin descripción'}">
                        <div class="repo-name"><i class="fas fa-folder-open" aria-hidden="true"></i> ${r.name}</div>
                        <p class="repo-desc">${r.description || '—'}</p>
                        <div class="repo-meta">
                            ${r.language ? `<span><span class="lang-dot" style="background:${LANG_COLORS[r.language] || LANG_COLORS.default}"></span>${r.language}</span>` : ''}
                            <span><i class="fas fa-star" aria-hidden="true"></i> ${r.stargazers_count}</span>
                            <span><i class="fas fa-code-fork" aria-hidden="true"></i> ${r.forks_count}</span>
                        </div>
                    </a>`).join('')}
            </div>
        `;

    } catch (err) {
        document.getElementById('github-stats-container').innerHTML =
            `<p class="github-error">> Error al cargar datos de GitHub. <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">Ver perfil directamente →</a></p>`;
    }
}

// ─── Sound ────────────────────────────────────────────────────────────────────
let soundEnabled = false;
let audioLoaded  = false;

const AUDIO_SOURCES = {
    'bg-music':        'https://cdn.pixabay.com/audio/2023/10/29/14-16-19-672_200x200.mp3',
    'click-sound':     'https://cdn.pixabay.com/audio/2022/05/13/16-35-43-54_200x200.mp3',
    'key-sound':       'https://cdn.pixabay.com/audio/2022/08/02/00-15-02-598_200x200.mp3',
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
    if (audio && audio.src) { audio.currentTime = 0; audio.play().catch(() => {}); }
}

function playClick()    { playSound('click-sound'); }
function playNavHover() { playSound('nav-hover-sound'); }

function toggleSound() {
    loadAudio();
    soundEnabled = !soundEnabled;
    const bgMusic = document.getElementById('bg-music');
    const icon    = document.getElementById('sound-icon');
    if (soundEnabled) {
        bgMusic.play().catch(() => {});
        icon?.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        bgMusic.pause();
        icon?.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
}

// ─── Project Toggle ───────────────────────────────────────────────────────────
function toggleProject(projectId) {
    playClick();
    const content = document.getElementById(`${projectId}-content`);
    const button  = document.querySelector(`[aria-controls="${projectId}-content"]`);
    const wasExpanded = content.classList.contains('expanded');

    document.querySelectorAll('.project-content').forEach(el => el.classList.remove('expanded'));
    document.querySelectorAll('.toggle-project').forEach(btn => {
        btn.classList.remove('expanded');
        btn.setAttribute('aria-expanded', 'false');
    });

    if (!wasExpanded) {
        content.classList.add('expanded');
        button?.classList.add('expanded');
        button?.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => content.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
        content.querySelectorAll('.project-gallery img').forEach(img => {
            img.onclick = () => showFullscreenImage(img.src, img.alt);
        });
    }
}

function showFullscreenImage(src, alt = '') {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Imagen ampliada');
    overlay.innerHTML = `
        <div class="fullscreen-content">
            <img src="${src}" alt="${alt}">
            <button class="close-fullscreen" aria-label="Cerrar imagen">×</button>
        </div>`;
    document.body.appendChild(overlay);

    const close = () => {
        overlay.classList.add('closing');
        overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
        setTimeout(() => overlay.remove(), 350);
    };

    overlay.querySelector('.close-fullscreen').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    const escFn = e => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escFn); } };
    document.addEventListener('keydown', escFn);
    overlay.querySelector('.close-fullscreen').focus();
}

// ─── #7 Cursor Trail (touch-safe) ────────────────────────────────────────────
function initCursorTrail() {
    // Skip entirely on touch-only devices — no mousemove, no memory waste
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

    // Single listener, no residual handlers on touch
    const onMove = e => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const animate = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';
        requestAnimationFrame(animate);
    };
    animate();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    runLoader(() => {
        // Everything runs after loader finishes
        createMatrixBackground();
        typeWriterEffect();
        initSmoothScroll();
        initActiveNav();
        handleSectionVisibility();
        initCursorTrail();
        loadGithubStats();
        handleInitialHash();

        document.querySelectorAll('a, button').forEach(el =>
            el.addEventListener('mouseenter', playNavHover)
        );
    });
});
