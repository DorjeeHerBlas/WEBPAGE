// ─── #9 Deep-link scroll helper ──────────────────────────────────────────────
// Reads the actual rendered nav height so the offset is always correct,
// even on mobile where the nav wraps to two lines.
// ─── i18n ────────────────────────────────────────────────────────────────────
// English is the default. Spanish is the alternative.
// Keys follow dotted notation: section.key. The HTML uses these attributes:
//   data-i18n         → replace textContent
//   data-i18n-html    → replace innerHTML (use only with trusted strings)
//   data-i18n-aria    → replace aria-label
//   data-i18n-typed   → replace data-text (terminal text rendered instantly)
const I18N = {
    en: {
        // Meta / a11y shell
        'title': "Dorjee — Video Game & Software Developer",
        'meta.description': "Dorjee Khyber — Video Game & Software Developer specializing in C++, Unity, SDL, Android and iOS.",
        'skip': "Skip to content",
        'aria.toggleSound': "Toggle sound",
        'aria.toggleLang': "Switch language",
        'aria.goToAbout': "Go to About section",
        'aria.mainNav': "Main navigation",
        'aria.backToTop': "Back to top",
        'aria.stats': "Stats",
        'aria.langs': "Top languages",
        'aria.repos': "Featured repositories",
        'aria.details': "Details",
        'nav.tfg': "./thesis",
        // Header
        'header.subtitle': "Video Game & Software Developer",
        'header.scroll': "↓ Scroll",
        // About
        'about.boot': "> Booting system...",
        'about.loading': "> Loading profile: DORJEE",
        'about.role': "> Video Game Developer (C++ / Unity / SDL)",
        'about.platforms': "> Cross-platform development: Android, watchOS, iOS, Desktop",
        // Experience
        'exp.title': "Experience",
        'exp.devRole': "> Software Developer — Personal Projects",
        'exp.devDates': "2021 – Present",
        'exp.dev1': "> Designed and developed video games in <strong>C++</strong> with <strong>SDL2</strong>: memory management, physics and rendering systems.",
        'exp.dev2': "> Cross-platform games in <strong>Unity / C#</strong>: AI, audio, UI and build pipelines.",
        'exp.dev3': "> Published apps on <strong>Android</strong> (Java/Kotlin) and <strong>watchOS</strong> (Swift).",
        'exp.dev4': "> Version control with <strong>Git</strong>, technical documentation and basic CI.",
        'exp.researchRole': "> Researcher — Master's in History and Anthropology of America",
        'exp.researchDates': "2020 – 2021",
        'exp.research1': "> Qualitative and quantitative data analysis for academic research.",
        'exp.research2': "> Technical and academic writing in English and Spanish.",
        'exp.research3': "> Transferable skills: systems thinking, narrative and project management.",
        'exp.tagResearch': "Research",
        'exp.tagAnalysis': "Data analysis",
        'exp.tagDocs': "Documentation",
        // Education
        'edu.title': "Education",
        'edu.degree1': "> Bachelor's Degree in Video Game Development",
        'edu.degree2': "> Master's Degree in History and Anthropology of America",
        'edu.degree3': "> Bachelor's Degree in Anthropology",
        'edu.school': "> Complutense University of Madrid (UCM)",
        // Skills
        'skills.title': "Skills",
        'skills.expert': "Expert",
        'skills.advanced': "Advanced",
        'skills.intermediate': "Intermediate",
        'skills.basic': "Basic",
        // Projects
        'projects.title': "Projects",
        'proj.manage.summary': "Task management app with tags, priorities and date-based search.",
        'proj.watch.summary': "watchOS app that recommends daily series or movies, with synopsis, duration and streaming platform.",
        'proj.bubble.summary': "Puzzle Bobble-style game in Android Studio. Shoot bubbles, match colors and complete levels with animated effects.",
        'aria.expandManage': "Expand ManageYourLife",
        'aria.expandWatch': "Expand WhatToWatch",
        'aria.expandBubble': "Expand Bubble Adventure",
        'aria.viewManage': "View ManageYourLife on GitHub (opens in new tab)",
        'aria.viewWatch': "View WhatToWatch on GitHub (opens in new tab)",
        'aria.viewBubble': "View Bubble Adventure on GitHub (opens in new tab)",
        // TFG
        'tfg.title': "Final Degree Project",
        'tfg.boot': "> Loading final_degree_project.md",
        'tfg.badge': "Bachelor's Thesis",
        'tfg.grade': "Grade: 10",
        'tfg.name': "Player Protection: The Black Box of Logic",
        'tfg.description': "A cybersecurity-focused Final Degree Project for video games. It studies the risks of trusting the player's device and proposes a server-side validation model based on distributed computing and serverless cloud architecture.",
        'tfg.point1': "> Moves gameplay validation from the client to a secure backend to reduce cheating, score fraud and data manipulation.",
        'tfg.point2': "> Applies <strong>AWS</strong>, <strong>serverless</strong> services and distributed-computing principles to build scalable, traceable systems.",
        'tfg.point3': "> Defines a reproducible framework for safer, more sustainable game development without slowing down iteration.",
        'tfg.download': "> Download thesis:",
        'tfg.pdfEs': "Thesis in Spanish",
        'tfg.pdfEn': "Thesis in English",
        'aria.downloadTfgEs': "Download TFG in Spanish",
        'aria.downloadTfgEn': "Download TFG in English",
        // GitHub
        'gh.title': "GitHub Activity",
        'gh.connecting': "> Connecting to api.github.com...",
        'gh.viewProfile': "View full profile",
        'gh.topLangs': "Top languages:",
        'gh.featuredRepos': "Featured repositories:",
        'gh.langDistribution': "Language distribution",
        'gh.noDescription': "No description",
        // Contact
        'contact.title': "Contact",
        'contact.boot': "> Initiating communication protocols...",
        'contact.cv': "> Download CV:",
        'contact.cvEs': "CV in Spanish",
        'contact.cvEn': "CV in English",
        'aria.socialGithub': "Dorjee's GitHub (opens in new tab)",
        'aria.socialLinkedin': "Dorjee's LinkedIn (opens in new tab)",
        'aria.socialX': "Dorjee's X/Twitter (opens in new tab)",
        'aria.downloadEs': "Download CV in Spanish",
        'aria.downloadEn': "Download CV in English",
    },
    es: {
        // Meta / a11y shell
        'title': "Dorjee — Desarrollador de Videojuegos y Software",
        'meta.description': "Dorjee Khyber — Desarrollador de Videojuegos y Software especializado en C++, Unity, SDL, Android e iOS.",
        'skip': "Saltar al contenido",
        'aria.toggleSound': "Activar o desactivar sonido",
        'aria.toggleLang': "Cambiar idioma",
        'aria.goToAbout': "Ir a la sección About",
        'aria.mainNav': "Navegación principal",
        'aria.backToTop': "Volver arriba",
        'aria.stats': "Estadísticas",
        'aria.langs': "Lenguajes más usados",
        'aria.repos': "Repositorios destacados",
        'aria.details': "Detalles",
        'nav.tfg': "./tfg",
        // Header
        'header.subtitle': "Desarrollador de Videojuegos y Software",
        'header.scroll': "↓ Scroll",
        // About
        'about.boot': "> Iniciando sistema...",
        'about.loading': "> Cargando perfil: DORJEE",
        'about.role': "> Desarrollador de Videojuegos (C++ / Unity / SDL)",
        'about.platforms': "> Programación multiplataforma: Android, watchOS, iOS, Desktop",
        // Experience
        'exp.title': "Experiencia",
        'exp.devRole': "> Software Developer — Proyectos Personales",
        'exp.devDates': "2021 – Presente",
        'exp.dev1': "> Diseño y desarrollo de videojuegos en <strong>C++</strong> con <strong>SDL2</strong>: gestión de memoria, sistemas de físicas y render.",
        'exp.dev2': "> Juegos multiplataforma en <strong>Unity / C#</strong>: IA, audio, UI y build pipelines.",
        'exp.dev3': "> Publicación de apps en <strong>Android</strong> (Java/Kotlin) y <strong>watchOS</strong> (Swift).",
        'exp.dev4': "> Control de versiones con <strong>Git</strong>, documentación técnica y CI básico.",
        'exp.researchRole': "> Investigador — Máster en Historia y Antropología de América",
        'exp.researchDates': "2020 – 2021",
        'exp.research1': "> Análisis de datos cualitativos y cuantitativos para investigación académica.",
        'exp.research2': "> Redacción de documentación técnica y académica en inglés y español.",
        'exp.research3': "> Habilidades transferibles: pensamiento sistémico, narrativa y gestión de proyectos.",
        'exp.tagResearch': "Investigación",
        'exp.tagAnalysis': "Análisis de datos",
        'exp.tagDocs': "Documentación",
        // Education
        'edu.title': "Educación",
        'edu.degree1': "> Grado en Desarrollo de Videojuegos",
        'edu.degree2': "> Máster en Historia y Antropología de América",
        'edu.degree3': "> Grado en Antropología",
        'edu.school': "> Universidad Complutense de Madrid (UCM)",
        // Skills
        'skills.title': "Skills",
        'skills.expert': "Experto",
        'skills.advanced': "Avanzado",
        'skills.intermediate': "Intermedio",
        'skills.basic': "Básico",
        // Projects
        'projects.title': "Proyectos",
        'proj.manage.summary': "App de gestión de tareas con etiquetas, prioridades y búsqueda por fecha.",
        'proj.watch.summary': "App para watchOS que recomienda series o películas diarias, con sinopsis, duración y plataforma de streaming.",
        'proj.bubble.summary': "Juego tipo Puzzle Bobble en Android Studio. Dispara burbujas, combina colores y completa niveles con efectos animados.",
        'aria.expandManage': "Expandir ManageYourLife",
        'aria.expandWatch': "Expandir WhatToWatch",
        'aria.expandBubble': "Expandir Bubble Adventure",
        'aria.viewManage': "Ver ManageYourLife en GitHub (abre en pestaña nueva)",
        'aria.viewWatch': "Ver WhatToWatch en GitHub (abre en pestaña nueva)",
        'aria.viewBubble': "Ver Bubble Adventure en GitHub (abre en pestaña nueva)",
        // TFG
        'tfg.title': "Trabajo de Fin de Grado",
        'tfg.boot': "> Cargando trabajo_fin_de_grado.md",
        'tfg.badge': "Trabajo de Fin de Grado",
        'tfg.grade': "Nota: 10",
        'tfg.name': "Protección del jugador: la caja negra de la lógica",
        'tfg.description': "Un Trabajo de Fin de Grado centrado en ciberseguridad aplicada a videojuegos. Analiza los riesgos de confiar en el dispositivo del jugador y propone un modelo de validación en servidor basado en computación distribuida y arquitectura cloud serverless.",
        'tfg.point1': "> Traslada la validación de la lógica de juego desde el cliente a un backend seguro para reducir trampas, fraude de puntuaciones y manipulación de datos.",
        'tfg.point2': "> Aplica <strong>AWS</strong>, servicios <strong>serverless</strong> y principios de computación distribuida para construir sistemas escalables y trazables.",
        'tfg.point3': "> Define un marco reproducible para desarrollar videojuegos más seguros y sostenibles sin perder agilidad en la iteración.",
        'tfg.download': "> Descargar TFG:",
        'tfg.pdfEs': "TFG en Español",
        'tfg.pdfEn': "TFG en Inglés",
        'aria.downloadTfgEs': "Descargar TFG en Español",
        'aria.downloadTfgEn': "Descargar TFG en Inglés",
        // GitHub
        'gh.title': "Actividad en GitHub",
        'gh.connecting': "> Conectando a api.github.com...",
        'gh.viewProfile': "Ver perfil completo",
        'gh.topLangs': "Lenguajes más usados:",
        'gh.featuredRepos': "Repositorios destacados:",
        'gh.langDistribution': "Distribución de lenguajes",
        'gh.noDescription': "Sin descripción",
        // Contact
        'contact.title': "Contacto",
        'contact.boot': "> Iniciando protocolos de comunicación...",
        'contact.cv': "> Descargar CV:",
        'contact.cvEs': "CV en Español",
        'contact.cvEn': "CV en Inglés",
        'aria.socialGithub': "GitHub de Dorjee (abre en pestaña nueva)",
        'aria.socialLinkedin': "LinkedIn de Dorjee (abre en pestaña nueva)",
        'aria.socialX': "X/Twitter de Dorjee (abre en pestaña nueva)",
        'aria.downloadEs': "Descargar CV en Español",
        'aria.downloadEn': "Descargar CV en Inglés",
    }
};

const I18N_STORAGE_KEY = 'dorjee.lang';
let CURRENT_LANG = 'en';

// Get the initial language: saved preference > browser preference > 'en'.
function getInitialLanguage() {
    try {
        const saved = localStorage.getItem(I18N_STORAGE_KEY);
        if (saved === 'en' || saved === 'es') return saved;
    } catch (_) { /* localStorage may be blocked in private mode */ }

    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.startsWith('es') ? 'es' : 'en';
}

function t(key) {
    return (I18N[CURRENT_LANG] && I18N[CURRENT_LANG][key]) || I18N.en[key] || key;
}

// Apply the active language to the DOM. Safe to call multiple times.
function applyLanguage(lang) {
    if (!I18N[lang]) lang = 'en';
    CURRENT_LANG = lang;

    document.documentElement.lang = lang;

    // <title> and meta description
    const title = t('title');
    if (document.title !== title) document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description'));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('meta.description'));

    // Plain text replacements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = t(key);
        if (el.textContent !== value) el.textContent = value;
    });

    // innerHTML replacements — only used for strings that contain <strong> etc.
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });

    // aria-label replacements
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });

    // data-text replacements for terminal text.
    document.querySelectorAll('[data-i18n-typed]').forEach(el => {
        const value = t(el.getAttribute('data-i18n-typed'));
        el.setAttribute('data-text', value);
        if (el.textContent && el.textContent.length > 0) el.textContent = value;
    });

    // Skill level labels — they live in <span class="level-label"> inside <div data-level="...">
    document.querySelectorAll('.level-bar[data-level]').forEach(bar => {
        const level = bar.getAttribute('data-level'); // expert | advanced | intermediate | basic
        const label = bar.querySelector('.level-label');
        if (label) label.textContent = t('skills.' + level);
        // Update the parent skill-card aria-label too (e.g. "C++ — Advanced")
        const card = bar.closest('.skill-card');
        if (card) {
            const heading = card.querySelector('h3');
            if (heading) {
                card.setAttribute('aria-label', `${heading.textContent} — ${t('skills.' + level)}`);
            }
            bar.setAttribute('aria-label', `${t('skills.' + level)} level`);
        }
    });

    // Toggle button shows the OTHER language (the one you'd switch to)
    const toggleLabel = document.getElementById('lang-toggle-label');
    if (toggleLabel) toggleLabel.textContent = lang === 'en' ? 'ES' : 'EN';
}

function setLanguage(lang) {
    applyLanguage(lang);
    try { localStorage.setItem(I18N_STORAGE_KEY, lang); } catch (_) {}
}

function toggleLanguage() {
    setLanguage(CURRENT_LANG === 'en' ? 'es' : 'en');
}

function getNavHeight() {
    const nav = document.getElementById('main-nav');
    return nav ? nav.getBoundingClientRect().height + 8 : 70;
}

// Expose the real nav height to CSS so scroll-margin-top is always accurate
function syncNavHeightVar() {
    const h = getNavHeight();
    document.documentElement.style.setProperty('--nav-height', h + 'px');
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - getNavHeight();
    window.scrollTo({ top, behavior: 'auto' });
}

// Handle hash on initial page load (deep links like portfolio.com/#skills)
function handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
        const id = hash.slice(1);
        setTimeout(() => scrollToSection(id), 0);
    }
}

// ─── Terminal Text ────────────────────────────────────────────────────────────
function renderTerminalText() {
    document.querySelectorAll('.type-text').forEach(el => {
        el.textContent = el.getAttribute('data-text') || '';
        el.style.opacity = '1';
    });
}

// ─── Back-to-top button ──────────────────────────────────────────────────────
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.hidden = false;

    const SHOW_AT = 600;
    const onScroll = () => {
        btn.classList.toggle('visible', window.pageYOffset > SHOW_AT);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
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
    sections.forEach(section => section.classList.add('visible'));
    document.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'none';
        const bar = card.querySelector('.level-bar');
        if (bar) bar.classList.add('animated');
    });
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
            'C': '#555555', 'default': '#3d7771'
        };

        document.getElementById('github-langs').innerHTML = `
            <p class="github-section-label">&gt; ${t('gh.topLangs')}</p>
            <div class="lang-bar-track" role="img" aria-label="${t('gh.langDistribution')}">
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
            <p class="github-section-label">&gt; ${t('gh.featuredRepos')}</p>
            <div class="repo-grid">
                ${topRepos.map(r => `
                    <a href="${r.html_url}" target="_blank" rel="noopener noreferrer"
                       class="repo-card" aria-label="${r.name}, ${r.description || t('gh.noDescription')}">
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

const BG_MUSIC_SOURCE = 'https://cdn.pixabay.com/audio/2023/10/29/14-16-19-672_200x200.mp3';

function loadAudio() {
    if (audioLoaded) return;
    audioLoaded = true;
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) bgMusic.src = BG_MUSIC_SOURCE;
}

function toggleSound() {
    loadAudio();
    soundEnabled = !soundEnabled;
    const bgMusic = document.getElementById('bg-music');
    const icon    = document.getElementById('sound-icon');
    if (!bgMusic) return;
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
        content.scrollIntoView({ behavior: 'auto', block: 'nearest' });
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
        overlay.remove();
    };

    overlay.querySelector('.close-fullscreen').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    const escFn = e => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escFn); } };
    document.addEventListener('keydown', escFn);
    overlay.querySelector('.close-fullscreen').focus();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(getInitialLanguage());

    syncNavHeightVar();
    window.addEventListener('resize', syncNavHeightVar, { passive: true });

    renderTerminalText();
    initSmoothScroll();
    initActiveNav();
    handleSectionVisibility();
    initBackToTop();
    loadGithubStats();
    syncNavHeightVar();
    handleInitialHash();
});
