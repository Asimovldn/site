// Elementos do DOM
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle do menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animação do hambúrguer
    const hamburgers = navToggle.querySelectorAll('.hamburger');
    hamburgers.forEach((line, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) line.style.opacity = '0';
            if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            line.style.transform = 'none';
            line.style.opacity = '1';
        }
    });
});

// Fechar menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const hamburgers = navToggle.querySelectorAll('.hamburger');
        hamburgers.forEach(line => {
            line.style.transform = 'none';
            line.style.opacity = '1';
        });
    });
});

// Navegação suave
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navegação ativa baseada no scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Efeito de backdrop no navbar ao fazer scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Função para animar contadores
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    }

    updateCounter();
}

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

// Observer para contadores de estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCards = entry.target.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });

            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para contadores de impacto
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const impactNumbers = entry.target.querySelectorAll('.impact-number');
            impactNumbers.forEach((number, index) => {
                const target = parseInt(number.dataset.target);
                setTimeout(() => {
                    animateCounter(number, target);
                }, index * 200);
            });

            impactObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para cards de patrocínio
const sponsorshipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.sponsorship-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 150);
            });

            sponsorshipObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para timeline de conquistas
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.achievement-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 300);
            });

            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observers quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Observer para estatísticas FIRST
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }

    // Observer para métricas de impacto
    const impactGrid = document.querySelector('.impact-grid');
    if (impactGrid) {
        impactObserver.observe(impactGrid);
    }

    // Observer para cards de patrocínio
    const sponsorshipGrid = document.querySelector('.sponsorship-grid');
    if (sponsorshipGrid) {
        sponsorshipObserver.observe(sponsorshipGrid);
    }

    // Observer para timeline de conquistas
    const timeline = document.querySelector('.achievement-timeline');
    if (timeline) {
        timelineObserver.observe(timeline);
    }
});

// Event listeners para scroll
window.addEventListener('scroll', () => {
    updateActiveNav();
    updateNavbar();
});

// Smooth scroll para botões CTA
document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.querySelector('.btn-hero');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#sponsorship');
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Efeito de hover nos cards de patrocínio
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sponsorship-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';

            // Efeito especial no card premium
            if (card.classList.contains('premium')) {
                card.style.boxShadow = '0 20px 60px rgba(117, 41, 149, 0.3)';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('premium')) {
                card.style.transform = 'translateY(0) scale(1.05)';
            } else {
                card.style.transform = 'translateY(0) scale(1)';
            }
            card.style.boxShadow = '';
        });
    });
});

// Parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loader para melhor experiência
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animar entrada do hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Otimização de performance - debounce para scroll
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce aos event listeners de scroll
const debouncedUpdateNav = debounce(updateActiveNav);
const debouncedUpdateNavbar = debounce(updateNavbar);

window.addEventListener('scroll', () => {
    debouncedUpdateNav();
    debouncedUpdateNavbar();
});

// Função para copiar informações de contato
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.background = '#28a745';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Ativar modo "robô" com efeitos especiais
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
            alert('🤖 Modo ASIMOV ativado! Os robôs aprovam esta proposta!');
        }, 1000);
    }
});

console.log('🤖 ASIMOV Landing Page carregada!');
console.log('Desenvolvido com ❤️ para a Equipe ASIMOV #21081');
console.log('Dica: Tente o Konami Code! 😉');