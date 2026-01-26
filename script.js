document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('svg');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            // Switch to Moon icon for "click to darkened"
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        } else {
            // Switch to Sun icon
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
    }

    // Scroll Reveal Animation with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it has revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // AI Chat Animation Trigger
    const aiVisual = document.querySelector('.ai-visual');
    if (aiVisual) {
        const aiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('start-animation');
                    aiObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        aiObserver.observe(aiVisual);
    }


    // Scroll Fill Animation for Footer Button
    const footerBtn = document.querySelector('.footer-btn');
    if (footerBtn) {
        const fillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fill-in');
                    fillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });
        fillObserver.observe(footerBtn);
    }

    // Navigation Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add high-end mouse parallax effect to hero background (optional but wows users)
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            hero.style.setProperty('--mouse-x', `${x}px`);
            hero.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // Portal Particles Generator
    const particlesContainer = document.querySelector('.portal-particles');
    if (particlesContainer) {
        const colors = ['#6c5ce7', '#06b6d4', '#ffffff'];
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.style.setProperty('--x', `${Math.random() * 100}%`);
            span.style.setProperty('--delay', `${Math.random() * 3}s`);
            span.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
            span.style.setProperty('--size', `${2 + Math.random() * 3}px`);
            span.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            particlesContainer.appendChild(span);
        }
    }

    const particlesWideContainer = document.querySelector('.portal-particles-wide');
    if (particlesWideContainer) {
        const colors = ['#6c5ce7', '#06b6d4', '#ffffff'];
        for (let i = 0; i < 40; i++) {
            const span = document.createElement('span');
            span.style.setProperty('--x', `${Math.random() * 100}%`);
            span.style.setProperty('--delay', `${Math.random() * 4}s`);
            span.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
            span.style.setProperty('--size', `${1 + Math.random() * 3}px`);
            span.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
            particlesWideContainer.appendChild(span);
        }
    }

    // Smoke Effect Generator
    const smokeContainer = document.querySelector('.hero-smoke');
    if (smokeContainer) {
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.style.setProperty('--x', `${Math.random() * 100}%`);
            span.style.setProperty('--delay', `${Math.random() * 5}s`);
            span.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
            span.style.setProperty('--size', `${50 + Math.random() * 100}px`);
            smokeContainer.appendChild(span);
        }
    }
});
