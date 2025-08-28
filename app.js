// DOM elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const hamburger = navToggle.querySelector('.hamburger');
    if (navMenu.classList.contains('active')) {
        hamburger.style.transform = 'rotate(45deg)';
        hamburger.style.background = 'var(--asimov-purple)';
    } else {
        hamburger.style.transform = 'rotate(0deg)';
        hamburger.style.background = 'var(--asimov-purple)';
    }
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
        // Only prevent default for internal links (starting with #)
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        // For external links, let them work normally
    });
});

// Smooth scrolling for hero CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            const href = heroCTA.getAttribute('href');
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
        });
    }
});

// Active navigation state based on scroll position
window.addEventListener('scroll', () => {
    const currentPos = window.scrollY + 120;
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
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
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
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add appropriate animation class
            if (element.classList.contains('timeline-item')) {
                if (Array.from(element.parentElement.children).indexOf(element) % 2 === 0) {
                    element.classList.add('slide-in-left');
                } else {
                    element.classList.add('slide-in-right');
                }
            } else {
                element.classList.add('fade-in-up');
            }
            
            // Animate counters for number elements
            if (element.classList.contains('numero')) {
                const target = parseInt(element.getAttribute('data-target'));
                animateCounter(element, 0, target, 2000);
            }
            
            // Animate cards with staggered delay
            if (element.classList.contains('valor-card') || 
                element.classList.contains('inovacao-card') || 
                element.classList.contains('objetivo-card') ||
                element.classList.contains('numero-card')) {
                const cards = element.parentElement.children;
                const index = Array.from(cards).indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Timeline specific animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const timeline = element.closest('.timeline-container');
            const items = timeline.querySelectorAll('.timeline-item');
            const index = Array.from(items).indexOf(element);
            
            // Animate timeline marker
            const marker = element.querySelector('.timeline-marker');
            marker.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
            marker.style.opacity = '0';
            
            // Animate content
            const content = element.querySelector('.timeline-content');
            if (index % 2 === 0) {
                content.classList.add('slide-in-left');
            } else {
                content.classList.add('slide-in-right');
            }
            content.style.animationDelay = `${index * 0.2 + 0.3}s`;
            
            timelineObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // General animations
    const animatedElements = document.querySelectorAll(
        '.valor-card, .inovacao-card, .objetivo-card, .numero-card, .projeto-card, .pilar, .numero, .roadmap-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Timeline specific animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.circuit-pattern');
    
    if (parallax) {
        const speed = 0.3;
        parallax.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.01}deg)`;
    }
});

// Enhanced hover effects for cards
document.addEventListener('DOMContentLoaded', () => {
    // Project cards
    const projectCards = document.querySelectorAll('.projeto-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(117, 41, 149, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Value cards
    const valueCards = document.querySelectorAll('.valor-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
    
    // Innovation cards
    const innovationCards = document.querySelectorAll('.inovacao-card');
    innovationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.inovacao-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.inovacao-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Button interactions with enhanced effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            // Don't interfere with actual link functionality
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Timeline marker animations on scroll
window.addEventListener('scroll', () => {
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    const scrollTop = window.pageYOffset;
    
    timelineMarkers.forEach((marker, index) => {
        const rect = marker.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (scrollTop > elementTop - windowHeight + elementHeight / 2) {
            marker.style.transform = `scale(1.1) rotate(${Math.sin(scrollTop * 0.01) * 5}deg)`;
            marker.style.boxShadow = `0 0 0 8px var(--asimov-white), 0 0 0 12px var(--asimov-purple), 0 0 30px rgba(117, 41, 149, 0.5)`;
        } else {
            marker.style.transform = 'scale(1) rotate(0deg)';
            marker.style.boxShadow = '0 0 0 8px var(--asimov-white), 0 0 0 12px rgba(117, 41, 149, 0.1)';
        }
    });
});

// Typing effect for hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }
});

// Progress sections reveal
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const section = entry.target;
            
            // Add staggered animations to child elements
            const children = section.querySelectorAll('.pilar, .timeline-item, .valor-card, .projeto-card, .inovacao-card, .objetivo-card');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(30px)';
                child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            progressObserver.unobserve(section);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        progressObserver.observe(section);
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
        height: 4px;
        background: linear-gradient(90deg, #752995, #000000);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(117, 41, 149, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Enhanced loading animation
window.addEventListener('load', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #752995, #000000);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.8s ease, visibility 0.8s ease;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.innerHTML = `
        <div style="color: white; font-size: 24px; font-weight: 700; text-align: center;">
            <div style="margin-bottom: 20px;">ASIMOV #21081</div>
            <div style="width: 60px; height: 4px; background: white; margin: 0 auto; border-radius: 2px; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: #752995; animation: loading 2s ease-in-out infinite;"></div>
            </div>
        </div>
    `;
    
    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);
    
    // Add loading animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
        
        setTimeout(() => {
            loadingOverlay.remove();
        }, 800);
    }, 2000);
});

// Contact interactions - Enhanced to work properly
document.addEventListener('DOMContentLoaded', () => {
    // Handle mailto links
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
    mailtoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Let the mailto link work naturally, just add visual feedback
            link.style.transform = 'scale(0.95)';
            link.style.boxShadow = '0 0 20px rgba(117, 41, 149, 0.6)';
            
            setTimeout(() => {
                link.style.transform = 'scale(1)';
                link.style.boxShadow = link.classList.contains('btn-primary') 
                    ? '0 4px 20px rgba(117, 41, 149, 0.3)' 
                    : 'none';
            }, 200);
            
            // Create success feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Abrindo cliente de email...';
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--asimov-purple);
                color: white;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => feedback.remove(), 300);
            }, 2000);
        });
    });

    // Handle external links (like back to main page)
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Visual feedback for external links
            link.style.transform = 'scale(0.95)';
            link.style.boxShadow = '0 0 20px rgba(117, 41, 149, 0.6)';
            
            setTimeout(() => {
                link.style.transform = 'scale(1)';
                link.style.boxShadow = link.classList.contains('btn-primary') 
                    ? '0 4px 20px rgba(117, 41, 149, 0.3)' 
                    : 'none';
            }, 200);
        });
    });
});

// Add pulse effect to CTA buttons periodically
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.hero-cta, .contact-btn');
    
    const addPulse = () => {
        ctaButtons.forEach(button => {
            button.style.animation = 'pulse 2s ease-in-out';
            
            setTimeout(() => {
                button.style.animation = '';
            }, 2000);
        });
    };
    
    // Add pulse every 8 seconds
    setInterval(addPulse, 8000);
    
    // Initial pulse after page load
    setTimeout(addPulse, 3000);
});

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(117, 41, 149, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(117, 41, 149, 0); }
        100% { box-shadow: 0 0 0 0 rgba(117, 41, 149, 0); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    /* Smooth transitions for all interactive elements */
    .pilar, .valor-card, .inovacao-card, .objetivo-card, .projeto-card, .numero-card, .roadmap-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced focus styles for accessibility */
    .btn:focus-visible {
        outline: 3px solid rgba(117, 41, 149, 0.5);
        outline-offset: 2px;
    }
    
    .nav-link:focus-visible {
        outline: 2px solid var(--asimov-purple);
        outline-offset: 4px;
        border-radius: 4px;
    }
`;
document.head.appendChild(additionalStyles);

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        const hamburger = navToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.style.transform = 'rotate(0deg)';
        }
    }
});

// Smooth section transitions
const sectionTransitionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionTransitionObserver.observe(section);
        }
    });
});