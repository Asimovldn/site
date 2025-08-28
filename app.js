// DOM elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const hamburger = navToggle.querySelector('.hamburger');
    hamburger.style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg)' 
        : 'rotate(0deg)';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const hamburger = navToggle.querySelector('.hamburger');
        hamburger.style.transform = 'rotate(0deg)';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation state based on scroll position
window.addEventListener('scroll', () => {
    const currentPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (currentPos >= sectionTop && currentPos <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Change navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Counter Animation Function
function animateCounter(element, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Format large numbers
        if (end >= 1000) {
            element.textContent = value.toLocaleString('pt-BR');
        } else {
            element.textContent = value;
        }
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add fade-in animation
            element.classList.add('fade-in-up');
            
            // Animate counters for stat numbers
            if (element.classList.contains('stat-number') || element.classList.contains('impact-number')) {
                const target = parseInt(element.getAttribute('data-target'));
                animateCounter(element, 0, target, 2000);
            }
            
            // Animate cards with staggered delay
            if (element.classList.contains('stat-card') || 
                element.classList.contains('impact-card') || 
                element.classList.contains('sponsor-card')) {
                const cards = element.parentElement.children;
                const index = Array.from(cards).indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.stat-card, .impact-card, .sponsor-card, .timeline-item, .stat-number, .impact-number'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.circuit-pattern');
    
    if (parallax) {
        const speed = 0.5;
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Enhanced hover effects for sponsor cards
document.addEventListener('DOMContentLoaded', () => {
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    
    sponsorCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(117, 41, 149, 0.2)';
            card.style.borderColor = '#752995';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            // Reset border color based on card type
            if (card.classList.contains('premium')) {
                card.style.borderColor = '#752995';
            } else if (card.classList.contains('high')) {
                card.style.borderColor = 'rgba(117, 41, 149, 0.6)';
            } else if (card.classList.contains('medium')) {
                card.style.borderColor = 'rgba(117, 41, 149, 0.4)';
            } else if (card.classList.contains('standard')) {
                card.style.borderColor = 'rgba(117, 41, 149, 0.2)';
            } else if (card.classList.contains('basic')) {
                card.style.borderColor = 'rgba(117, 41, 149, 0.1)';
            }
        });
    });
});

// Enhanced hover effects for other cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.stat-card, .impact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 35px rgba(117, 41, 149, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('stat-card')) {
                card.style.boxShadow = '0 10px 30px rgba(117, 41, 149, 0.1)';
            } else {
                card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    });
});

// Button hover effects enhancement
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
});

// Loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for sections on scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });
});

// Enhanced timeline animation
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});

// Contact button interactions
document.addEventListener('DOMContentLoaded', () => {
    const contactBtns = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #752995, #000000);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Add pulse effect to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.hero-cta, .contact-btn');
    
    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.boxShadow = '0 0 0 0 rgba(117, 41, 149, 0.7)';
            button.style.animation = 'pulse 2s infinite';
        }, 5000);
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(117, 41, 149, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(117, 41, 149, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(117, 41, 149, 0);
        }
    }
`;
document.head.appendChild(style);