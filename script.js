// DOM Elements
const nameElement = document.querySelector('.name');
const typingText = document.querySelector('.typing-text');
const skillItems = document.querySelectorAll('.skill-item');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-menu a');

// Text scramble effect for name
function randomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*';
    return chars[Math.floor(Math.random() * chars.length)];
}

function scrambleText(element) {
    const originalText = element.textContent;
    let i = 0;
    const interval = setInterval(() => {
        element.textContent = originalText.split('').map((char, index) => {
            if (index < i) {
                return originalText[index];
            }
            return randomChar();
        }).join('');

        if (i >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
        i += 1 / 5;
    }, 50);
}

// Typing animation for subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Parallax effect for floating elements
function parallaxEffect() {
    const elements = document.querySelectorAll('.element');
    const scrolled = window.pageYOffset;
    
    elements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Skill item hover effects
function initSkillEffects() {
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(5deg)';
            item.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
            
            // Add glitch effect
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.animation = 'glitch 0.3s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 300);
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
            item.style.boxShadow = '';
        });
    });
}

// Project card animations
function initProjectEffects() {
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });
}

// Contact form handling
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! 🚀', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 0, 255, 0.9)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        border: 1px solid ${type === 'success' ? '#00ff00' : '#ff00ff'};
        box-shadow: 0 0 20px ${type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 255, 0.5)'};
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Orbitron', monospace;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for different sections
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.style.animation = 'slideInFromBottom 0.6s ease-out';
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animation = 'slideInFromLeft 0.8s ease-out';
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.animation = 'slideInFromRight 0.8s ease-out';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-category, .timeline-item, .project-card, .section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Particle system for background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? '#00ffff' : '#ff00ff'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        particlesContainer.appendChild(particle);
    }
}

// Audio visualizer effect (optional)
function initAudioVisualizer() {
    const visualizer = document.createElement('div');
    visualizer.className = 'audio-visualizer';
    visualizer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        display: flex;
        gap: 2px;
        z-index: 1000;
    `;
    
    for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 3px;
            background: linear-gradient(to top, #ff00ff, #00ffff);
            border-radius: 2px;
            animation: audioBar ${0.5 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        visualizer.appendChild(bar);
    }
    
    document.body.appendChild(visualizer);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes audioBar {
        0%, 100% { height: 10px; }
        50% { height: 40px; }
    }
    
    .notification {
        backdrop-filter: blur(10px);
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    setTimeout(() => {
        scrambleText(nameElement);
    }, 1000);
    
    setTimeout(() => {
        typeWriter(typingText, 'Building the future, one line of code at a time');
    }, 2000);
    
    // Initialize effects
    initSkillEffects();
    initProjectEffects();
    initContactForm();
    initScrollAnimations();
    createParticles();
    initAudioVisualizer();
    
    // Navigation event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        parallaxEffect();
    });
    
    // Add some interactive elements
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('skill-item')) {
            const skill = e.target.getAttribute('data-skill');
            showNotification(`Selected: ${skill} ⚡`, 'info');
        }
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('Synthwave mode activated! 🎵', 'success');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
            konamiCode = [];
        }
    });
});

// Add some random glitch effects
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 5 seconds
        const randomElement = document.querySelector('.skill-item, .project-card');
        if (randomElement) {
            randomElement.style.animation = 'glitch 0.2s ease-in-out';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 200);
        }
    }
}, 5000);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(parallaxEffect, 16)); // ~60fps