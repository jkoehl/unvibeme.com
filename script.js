// UnVibeMe Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Random hero description rotation
    const heroDescriptions = [
        'Somewhere in your organization, a critical system exists because someone typed "build me a payment portal" into a chatbot and pressed enter. That person is now in marketing. The chatbot has no memory of the conversation. You have questions. Let\'s talk.',
        '"It\'s just a demo," they said. "We\'ll rebuild it properly later," they said. That was 18 months ago. The demo now has 50,000 users, a mobile app, and a database schema that appears to be held together by prayers and string concatenation. Let\'s talk.',
        'Someone asked an AI to write "a quick prototype." The AI delivered 12,000 lines of enterprise-grade architecture for a todo list. Somehow this is now running your HR system. The original prompt has been lost to time. Let\'s talk.'
    ];

    const heroDescriptionEl = document.getElementById('hero-description');
    if (heroDescriptionEl) {
        const randomIndex = Math.floor(Math.random() * heroDescriptions.length);
        heroDescriptionEl.textContent = heroDescriptions[randomIndex];
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');

                // Scroll to target
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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // For now, just show a message (in production, this would send to a backend)
            const severity = data.severity;
            let message = '';

            switch(severity) {
                case 'existential':
                    message = "We've received your cry for help. Our emergency team has been notified. Stay calm and step away from the deployment button.";
                    break;
                case 'critical':
                    message = "Your request has been flagged as critical. We'll be in touch within the hour. In the meantime, please resist the urge to 'just try one more thing.'";
                    break;
                case 'urgent':
                    message = "We understand board meetings wait for no one. We'll reach out within 24 hours to discuss your situation.";
                    break;
                case 'concerned':
                    message = "Thank you for reaching out before things got weird-er. We'll be in touch within 2 business days.";
                    break;
                default:
                    message = "Thank you for your inquiry. We'll be in touch soon to discuss how we can help.";
            }

            // Create and show modal
            showModal('Request Received', message);

            // Reset form
            contactForm.reset();
        });
    }

    // Modal functionality
    function showModal(title, message) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Got It</button>
            </div>
        `;

        // Add modal styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'modal-styles';
            styles.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    padding: 1rem;
                }
                .modal-content {
                    background: var(--color-primary);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    padding: 2rem;
                    max-width: 500px;
                    text-align: center;
                }
                .modal-content h3 {
                    margin-bottom: 1rem;
                    color: var(--color-accent);
                }
                .modal-content p {
                    margin-bottom: 1.5rem;
                    color: var(--color-text-muted);
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .process-step, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .nav-links.active {
            display: flex;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(15, 15, 26, 0.98);
            padding: 1rem;
            border-bottom: 1px solid var(--color-border);
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        .navbar.scrolled {
            background: rgba(15, 15, 26, 0.98);
        }
    `;
    document.head.appendChild(animationStyles);

    // Easter egg: Konami code reveals a message
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showModal('Achievement Unlocked', 'You found the easter egg! Clearly you have the debugging skills we\'re looking for. Perhaps you\'d like to join our team of Code Archaeologists?');
        }
    });
});
