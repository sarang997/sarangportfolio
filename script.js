document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4a6cf7"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4a6cf7",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
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
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
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
    
    // Experience "View More" functionality
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');
    
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle the 'active' class on the button
            this.classList.toggle('active');
            
            // Find the details section
            const details = this.previousElementSibling;
            
            // Toggle the 'hidden' class
            details.classList.toggle('hidden');
            
            // Update button text
            if (this.classList.contains('active')) {
                this.textContent = 'View Less';
            } else {
                this.textContent = 'View More';
            }
            
            // Add the arrow icon back
            const span = document.createElement('span');
            span.className = 'arrow-icon';
            this.appendChild(span);
        });
    });
});

// Create interactive data visualization
function createDataVisualization() {
    const container = document.querySelector('.data-points');
    if (!container) return;
    
    // Clear any existing points
    container.innerHTML = '';
    
    // Create random data points
    const numPoints = 30;
    const colors = ['#4a6cf7', '#6c757d', '#28a745', '#dc3545'];
    
    for (let i = 0; i < numPoints; i++) {
        const point = document.createElement('div');
        point.className = 'data-point';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 20 + 5;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay
        const delay = Math.random() * 2;
        
        // Set styles
        point.style.left = `${left}%`;
        point.style.top = `${top}%`;
        point.style.width = `${size}px`;
        point.style.height = `${size}px`;
        point.style.backgroundColor = color;
        point.style.animationDelay = `${delay}s`;
        
        container.appendChild(point);
    }
    
    // Add interactivity - points follow cursor
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const points = document.querySelectorAll('.data-point');
        points.forEach(point => {
            const pointRect = point.getBoundingClientRect();
            const pointX = pointRect.left - rect.left + pointRect.width / 2;
            const pointY = pointRect.top - rect.top + pointRect.height / 2;
            
            const distX = mouseX - pointX;
            const distY = mouseY - pointY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < 100) {
                const moveX = distX * 0.1;
                const moveY = distY * 0.1;
                point.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                point.style.transform = '';
            }
        });
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
        const points = document.querySelectorAll('.data-point');
        points.forEach(point => {
            point.style.transform = '';
        });
    });
}

// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-content p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});

function createParticles() {
    particlesArray = [];
    let numberOfParticles = 100; // Reducing the number of particles
    
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1; // Increasing particle size
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = 'rgba(255, 255, 255, 0.5)'; // Increasing opacity
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    update() {
        this.x += this.directionX * 1.5; // Increasing speed
        this.y += this.directionY * 1.5; // Increasing speed
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
} 