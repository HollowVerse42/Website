// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu') && !event.target.closest('.nav-links')) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Update active menu item on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Add box shadow to header on scroll
        const header = document.querySelector('header');
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active menu item based on scroll position
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Simple validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('#newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email.trim()) {
                alert('Please enter your email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }
    
    // Initialize particles
    initParticles();
    
    // Add scroll listener for particles
    window.addEventListener('scroll', updateParticlesOnScroll);
    
    // Initialize GSAP animations
    initAnimations();
    
    // Initialize chatbot
    initChatbot();
});

// Create particle background
function initParticles() {
    // Create a particles container for the entire page if it doesn't exist
    let particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles';
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
    }
    
    const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(212, 66, 255, 0.3)', 'rgba(255, 51, 102, 0.2)'];
    const particleCount = 80; // Increased particle count for more coverage
    
    // Get document height to distribute particles vertically
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 30px with more variation
        const size = Math.random() * 25 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position throughout the document
        particle.style.left = `${Math.random() * 100}%`;
        
        // Distribute particles throughout the document height
        // Use percentage for top position to ensure they're visible in viewport
        if (i < particleCount / 2) {
            // Half the particles in the initial viewport
            particle.style.top = `${Math.random() * 100}%`;
        } else {
            // Half the particles distributed throughout the document
            particle.style.top = `${Math.random() * docHeight}px`;
        }
        
        // Random color
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.6 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Update particles on scroll to ensure they appear throughout the page
function updateParticlesOnScroll() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Only add new particles occasionally when scrolling
    if (Math.random() > 0.1) return;
    
    const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(212, 66, 255, 0.3)', 'rgba(255, 51, 102, 0.2)'];
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Create 1-3 new particles
    const newParticleCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < newParticleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 25 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position near the current viewport
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${scrollY + Math.random() * viewportHeight * 1.5}px`;
        
        // Random color
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.6 + 0.1;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation completes to prevent too many particles
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 30000);
    }
}

// Initialize GSAP animations
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger plugin
    if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Hero section fade in
    gsap.from('.hero-content', { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        ease: 'power2.out' 
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power2.out'
        });
    });

    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    gsap.from(serviceCards, {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    gsap.from(testimonialCards, {
        scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// Initialize chatbot
function initChatbot() {
    const chatbotBtn = document.querySelector('.chatbot-button');
    if (!chatbotBtn) return;
    
    chatbotBtn.addEventListener('click', function() {
        alert('AI Chatbot: Hello! How can I assist you today with your AI project needs? Welcome to Panterberry!');
    });
} 