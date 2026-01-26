/* ====================================
   mehow.se - Webb & Kod Byrå
   Interactive Scripts
   ==================================== */

// DOM Elements
const input = document.getElementById("cmd-input");
const terminalContent = document.getElementById("terminal-content");
const commandLine = document.querySelector(".command-line");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.querySelector(".navbar");
const contactForm = document.getElementById("contact-form");

// ====================================
// TERMINAL COMMANDS
// ====================================
const commands = {
    help: "Available commands: <span class='keyword'>help, ls, services, about, contact, clear</span>",
    ls: `
    <span class="comment">// Våra sektioner:</span>
    <div class="link-grid">
      <div><a href="#services">📦 Tjänster</a></div>
      <div><a href="#projects">🚀 Projekt</a></div>
      <div><a href="#about">👋 Om oss</a></div>
      <div><a href="#contact">📧 Kontakt</a></div>
    </div>
  `,
    services: `
    <span class="keyword">Våra tjänster:</span><br>
    • Webbutveckling (React, Next.js, Vue)<br>
    • Apputveckling (React Native, Flutter)<br>
    • UX/UI Design<br>
    • AI-lösningar & Automation
  `,
    about: `
    <span class="keyword">mehow.se</span> - Webb & Kod Byrå<br>
    <span class="comment">// 10+ års erfarenhet</span><br>
    <span class="comment">// 50+ genomförda projekt</span><br>
    <span class="comment">// 30+ nöjda kunder</span>
  `,
    contact: "Email: <a href='mailto:hej@mehow.se'>hej@mehow.se</a><br>Tel: <a href='tel:+46701234567'>+46 70 123 45 67</a>",
    clear: "CLEAR",
    whoami: "guest@mehow.se",
    date: new Date().toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
};

// Terminal input handler
if (input) {
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const command = input.value.trim();
            if (command) {
                processCommand(command);
            }
            input.value = "";
            input.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Keep focus on terminal input when clicking inside terminal
if (terminalContent) {
    terminalContent.addEventListener("click", () => {
        input?.focus();
    });
}

function processCommand(cmd) {
    // Create history line
    const historyLine = document.createElement("div");
    historyLine.className = "output";
    historyLine.innerHTML = `
    <span class="prompt"><span class="tilda">➜</span> <span class="directory">~</span></span> 
    <span class="foreground">${escapeHtml(cmd)}</span>
  `;
    terminalContent.insertBefore(historyLine, commandLine);

    const lowerCmd = cmd.toLowerCase();
    let response = "";

    if (commands[lowerCmd]) {
        response = commands[lowerCmd];
    } else if (lowerCmd.startsWith("cat ")) {
        response = `cat: ${cmd.split(" ")[1]}: No such file or directory`;
    } else if (lowerCmd === "sudo" || lowerCmd.startsWith("sudo ")) {
        response = `<span class="keyword">Nice try!</span> 😏`;
    } else {
        response = `<span class='red'>command not found: ${escapeHtml(cmd)}</span>`;
    }

    if (response === "CLEAR") {
        const outputs = terminalContent.querySelectorAll(".output");
        outputs.forEach(el => el.remove());
    } else {
        const responseLine = document.createElement("div");
        responseLine.className = "output";
        responseLine.innerHTML = response;
        terminalContent.insertBefore(responseLine, commandLine);
    }

    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ====================================
// MOBILE NAVIGATION
// ====================================
if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add background on scroll
    if (currentScroll > 50) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

// ====================================
// SCROLL REVEAL ANIMATIONS
// ====================================
const revealElements = document.querySelectorAll('.service-card, .project-card, .about-content, .about-tech, .contact-info, .contact-form');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
};

// Initial reveal styles
revealElements.forEach(element => {
    element.classList.add('reveal');
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// CONTACT FORM HANDLING
// ====================================
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Create mailto link (simple fallback - you can replace with actual form submission)
        const subject = encodeURIComponent(`Kontaktförfrågan från ${name}`);
        const body = encodeURIComponent(`Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`);

        window.location.href = `mailto:hej@mehow.se?subject=${subject}&body=${body}`;

        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Tack! Vi återkommer snart.</span> ✨';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ====================================
// PROJECT CARDS HOVER EFFECT
// ====================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ====================================
// SERVICE CARDS STAGGER ANIMATION
// ====================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const serviceCards = document.querySelectorAll('.service-card');

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            serviceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    serviceObserver.observe(card);
});

// ====================================
// TYPING EFFECT FOR TERMINAL
// ====================================
function typeCommand(command, callback) {
    let i = 0;
    const typingSpeed = 50;

    input.value = '';

    const typeInterval = setInterval(() => {
        if (i < command.length) {
            input.value += command.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            if (callback) callback();
        }
    }, typingSpeed);
}

// Auto-type help command on first visit
if (sessionStorage.getItem('visited') !== 'true') {
    sessionStorage.setItem('visited', 'true');

    setTimeout(() => {
        typeCommand('help', () => {
            setTimeout(() => {
                processCommand('help');
                input.value = '';
            }, 300);
        });
    }, 2000);
}