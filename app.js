/* ============================================
   EQUIPE ASIMOV #21081 - WEBSITE JAVASCRIPT
   Funcionalidades interativas para todas as páginas
============================================ */

// Elementos do DOM
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// === NAVEGAÇÃO MOBILE === 
if (navToggle) {
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
}

// Fechar menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const hamburgers = navToggle.querySelectorAll('.hamburger');
                hamburgers.forEach(line => {
                    line.style.transform = 'none';
                    line.style.opacity = '1';
                });
            }
        }
    });
});

// === NAVEGAÇÃO SUAVE === 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Só prevenir default para âncoras internas (#)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // Para links externos (historia.html, index.html), deixar funcionar normalmente
    });
});

// === NAVEGAÇÃO ATIVA BASEADA NO SCROLL === 
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
                // Verificar se o link aponta para esta seção
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${sectionId}` || linkHref.endsWith(`#${sectionId}`)) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// === EFEITO DE BACKDROP NO NAVBAR === 
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }
}

// === ANIMAÇÃO DE CONTADORES === 
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

// === INTERSECTION OBSERVERS === 
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

// Observer para estatísticas FIRST
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((number, index) => {
                setTimeout(() => {
                    // Animar entrada do card
                    number.closest('.stat-card').style.opacity = '0';
                    number.closest('.stat-card').style.transform = 'translateY(20px)';
                    number.closest('.stat-card').style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        number.closest('.stat-card').style.opacity = '1';
                        number.closest('.stat-card').style.transform = 'translateY(0)';
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
                        card.style.transform = card.classList.contains('premium') 
                            ? 'translateY(0) scale(1.05)' 
                            : 'translateY(0) scale(1)';
                    }, 100);
                }, index * 150);
            });

            sponsorshipObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para timeline (página história)
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(50px)';
                    item.style.transition = 'all 0.8s ease';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 300);
            });

            timelineObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para projetos sociais
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projects = entry.target.querySelectorAll('.project-card');
            projects.forEach((project, index) => {
                setTimeout(() => {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(30px) scale(0.9)';
                    project.style.transition = 'all 0.7s ease';

                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                }, index * 200);
            });

            projectsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer para cards de valores
const valuesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const values = entry.target.querySelectorAll('.value-card');
            values.forEach((value, index) => {
                setTimeout(() => {
                    value.style.opacity = '0';
                    value.style.transform = 'translateX(-30px)';
                    value.style.transition = 'all 0.6s ease';

                    setTimeout(() => {
                        value.style.opacity = '1';
                        value.style.transform = 'translateX(0)';
                    }, 100);
                }, index * 150);
            });

            valuesObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// === APLICAR OBSERVERS QUANDO DOM CARREGAR === 
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

    // Observer para timeline (página história)
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        timelineObserver.observe(timelineContainer);
    }

    // Observer para projetos sociais (página história)
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsObserver.observe(projectsGrid);
    }

    // Observer para cards de valores (página história)
    const valuesGrid = document.querySelector('.values-grid');
    if (valuesGrid) {
        valuesObserver.observe(valuesGrid);
    }
});

// === EVENT LISTENERS PARA SCROLL === 
window.addEventListener('scroll', () => {
    updateActiveNav();
    updateNavbar();
});

// === SMOOTH SCROLL PARA BOTÕES CTA === 
document.addEventListener('DOMContentLoaded', () => {
    // Botão hero principal
    const heroBtn = document.querySelector('.btn-hero');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            const href = heroBtn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // Outros botões CTA
    const ctaButtons = document.querySelectorAll('[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// === EFEITOS DE HOVER NOS CARDS DE PATROCÍNIO === 
document.addEventListener('DOMContentLoaded', () => {
    const sponsorshipCards = document.querySelectorAll('.sponsorship-card');

    sponsorshipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('premium')) {
                card.style.transform = 'translateY(-15px) scale(1.08)';
                card.style.boxShadow = '0 25px 60px rgba(117, 41, 149, 0.4)';
            } else {
                card.style.transform = 'translateY(-15px) scale(1.02)';
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

// === PARALLAX SUAVE NO HERO === 
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// === ANIMAÇÃO DE ENTRADA DO HERO === 
window.addEventListener('load', () => {
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

// === OTIMIZAÇÃO DE PERFORMANCE - DEBOUNCE === 
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

// Aplicar debounce aos event listeners de scroll mais intensivos
const debouncedUpdateNav = debounce(updateActiveNav, 100);
const debouncedUpdateNavbar = debounce(updateNavbar, 50);

// Substituir os listeners diretos pelos debounced
window.removeEventListener('scroll', updateActiveNav);
window.removeEventListener('scroll', updateNavbar);
window.addEventListener('scroll', debouncedUpdateNav);
window.addEventListener('scroll', debouncedUpdateNavbar);

// === FUNÇÃO PARA COPIAR INFORMAÇÕES DE CONTATO === 
function copyToClipboard(text, button) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copiado!';
            button.style.background = '#28a745';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        });
    } else {
        // Fallback para browsers que não suportam clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const originalText = button.textContent;
            button.textContent = 'Copiado!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.log('Erro ao copiar texto');
        }
        document.body.removeChild(textArea);
    }
}

// === EASTER EGG: KONAMI CODE === 
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Ativar modo "robô" com efeitos especiais
        document.body.style.transition = 'filter 1s ease';
        document.body.style.filter = 'hue-rotate(180deg) contrast(1.2)';

        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.innerHTML = '🤖 MODO ASIMOV ATIVADO! Os robôs aprovam esta proposta! 🚀';
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--purple-primary);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            animation: fadeInUp 0.5s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.style.filter = '';
            document.body.removeChild(notification);
        }, 3000);

        // Reset do código
        konamiCode = [];
    }
});

// === TRATAMENTO DE ERROS GLOBAL === 
window.addEventListener('error', (e) => {
    console.log('Erro JavaScript interceptado:', e.error);
    // Em produção, enviar erro para serviço de monitoramento
});

// === INICIALIZAÇÃO COMPLETA === 
document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 Website ASIMOV #21081 carregado com sucesso!');
    console.log('Desenvolvido com ❤️ para formar os líderes tecnológicos do amanhã');
    console.log('Dica: Tente o Konami Code para uma surpresa! 😉');
    console.log('↑↑↓↓←→←→BA');

    // Marcar que o site foi totalmente carregado
    document.body.classList.add('loaded');
});

// === LOG DE PERFORMANCE === 
window.addEventListener('load', () => {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Site carregado em ${loadTime}ms`);
    }
});