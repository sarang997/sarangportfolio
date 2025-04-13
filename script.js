document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if the menu is open and the click is outside the menu and burger button
        if (nav.classList.contains('nav-active') && 
            !nav.contains(e.target) && 
            !burger.contains(e.target)) {
            
            // Close the menu
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            // Reset animations
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
    
    // Highlight current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href*="${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href*="${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    // Add active class styling
    window.addEventListener('scroll', highlightNavigation);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Create data visualization in hero section
    createDataVisualization();
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => group.style.display = 'none');
            
            const submitBtn = document.querySelector('.contact-form button');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                formGroups.forEach(group => group.style.display = 'flex');
                submitBtn.style.display = 'block';
                successMessage.remove();
                contactForm.reset();
            }, 5000);
        });
    }
    
    // Scroll animations - simplified for more professional appearance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Just make elements visible without elaborate animations
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        // Set initial opacity
        section.style.opacity = 0;
        section.style.transition = 'opacity 0.5s ease';
        observer.observe(section);
    });
    
    // Skills tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all tab content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the selected tab content
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // View More functionality for timeline items
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the parent timeline content
            const timelineContent = this.closest('.timeline-content');
            
            // Toggle the hidden class on the details
            const details = timelineContent.querySelector('.timeline-details');
            details.classList.toggle('hidden');
            
            // Toggle the active class on the button
            this.classList.toggle('active');
            
            // Change button text based on state
            if (this.classList.contains('active')) {
                this.textContent = 'View Less';
            } else {
                this.textContent = 'View Details';
            }
        });
    });
    
    // Projects Carousel functionality
    initProjectsCarousel();
});

// Initialize the projects carousel
function initProjectsCarousel() {
    const carousel = document.getElementById('projects-carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || !dotsContainer) return;
    
    const cards = carousel.querySelectorAll('.project-card');
    const cardWidth = cards[0]?.offsetWidth || 300;
    const cardMargin = 24; // This should match the gap in CSS
    const totalWidth = cardWidth + cardMargin;
    
    // Create dots based on number of cards
    const visibleCards = Math.floor(carousel.offsetWidth / totalWidth);
    const numDots = Math.ceil(cards.length / visibleCards);
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToPosition(i));
        dotsContainer.appendChild(dot);
    }
    
    // Set up button listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const activeDot = dotsContainer.querySelector('.carousel-dot.active');
            const index = Array.from(dotsContainer.children).indexOf(activeDot);
            if (index > 0) {
                scrollToPosition(index - 1);
            } else {
                // Loop to the end
                scrollToPosition(numDots - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const activeDot = dotsContainer.querySelector('.carousel-dot.active');
            const index = Array.from(dotsContainer.children).indexOf(activeDot);
            if (index < numDots - 1) {
                scrollToPosition(index + 1);
            } else {
                // Loop to the beginning
                scrollToPosition(0);
            }
        });
    }
    
    // Scroll to a specific position in the carousel
    function scrollToPosition(index) {
        const scrollPosition = index * (totalWidth * visibleCards);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }
    
    // Update dots when scrolling
    carousel.addEventListener('scroll', () => {
        const scrollPosition = carousel.scrollLeft;
        const activeIndex = Math.round(scrollPosition / (totalWidth * visibleCards));
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Update the carousel when window is resized
            dotsContainer.innerHTML = '';
            initProjectsCarousel();
        }, 250);
    });
}

// Create interactive data visualization
function createDataVisualization() {
    // Simplified data visualization without particles
    console.log("Data visualization simplified for a professional look");
}

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-content p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
}); 