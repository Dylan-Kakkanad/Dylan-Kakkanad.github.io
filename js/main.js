/*
   Dylan J Kakkanad Portfolio
   Modern Portfolio Website with Animations
   JavaScript Functionality
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('cursor-active');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('cursor-active');
    });

    // Add hover effect to links and buttons
    const links = document.querySelectorAll('a, button');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav'); // Select the <nav> element directly

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active'); // Check if navMenu exists before removing class
        });
    });

    // Smooth Scroll for Navigation Links using GSAP ScrollToPlugin
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') { // Handle edge case for links like href="#"
                 gsap.to(window, { duration: 0.8, scrollTo: 0, ease: "power2.inOut" });
                 return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset dynamically, considering potential header height changes
                let offset = 80; // Default offset
                const header = document.querySelector('header');
                if (header) {
                    offset = header.offsetHeight + 10; // Add a little extra space
                }

                gsap.to(window, {
                    duration: 0.8, // Adjust duration as needed
                    scrollTo: {
                        y: targetId, // Use the ID selector directly
                        offsetY: offset // Offset from the top
                    },
                    ease: "power2.inOut" // Smooth easing function
                });
            }
        });
    });

    // Typing Animation for Profession Text
    class TxtRotate {
        constructor(el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 2000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        }
        
        tick() {
            const i = this.loopNum % this.toRotate.length;
            const fullTxt = this.toRotate[i];
            
            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
            
            let delta = 200 - Math.random() * 100;
            
            if (this.isDeleting) { delta /= 2; }
            
            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }
            
            setTimeout(() => {
                this.tick();
            }, delta);
        }
    }

    const txtElements = document.getElementsByClassName('txt-rotate');
    
    for (let i = 0; i < txtElements.length; i++) {
        const toRotate = txtElements[i].getAttribute('data-rotate');
        const period = txtElements[i].getAttribute('data-period');
        
        if (toRotate) {
            new TxtRotate(txtElements[i], JSON.parse(toRotate), period);
        }
    }

    // Hero Text Animation
    const textWrapper = document.querySelector('.animate-text .letters');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: false})
            .add({
                targets: '.animate-text .letter',
                translateY: ["1.1em", 0],
                translateX: ["0.55em", 0],
                translateZ: 0,
                rotateZ: [180, 0],
                duration: 750,
                easing: "easeOutExpo",
                delay: (el, i) => 50 * i
            });
    }

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Register ScrollToPlugin

    // Hero section animations
    gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.5
    });

    gsap.from('.cta-buttons', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.8
    });

    gsap.from('.social-icons', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 2
    });

    // About section animations
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        opacity: 0,
        y: 100,
        duration: 1
    });

    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.3
    });

    // Skills section animations
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2
    });

    // Animate skill progress bars when they come into view
    const animateSkills = () => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress-bar');
                    const percentage = progressBar.getAttribute('data-percentage');
                    progressBar.style.width = `${percentage}%`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        skillCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            observer.observe(card);
        });
    };

    animateSkills();

    // Projects section animations
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Project Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Make sure "All" filter is active by default
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }

    // Horizontal scrolling for 'My Projects' section
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projectsHorizontal = document.querySelector('.projects-horizontal');

    // Calculate the total width of the horizontal scroll
    const totalScrollWidth = projectsHorizontal.scrollWidth - projectsWrapper.offsetWidth;

    // GSAP ScrollTrigger for horizontal scrolling
    gsap.to(projectsHorizontal, {
        x: () => -totalScrollWidth, // Move horizontally
        ease: 'none',
        scrollTrigger: {
            trigger: '#projects', // Trigger based on the whole section
            pin: '#projects',     // Pin the whole section (title + cards)
            start: 'center center', // Start when the top of the section hits the center
            end: () => `+=${projectsHorizontal.scrollWidth}`, // Scroll distance based on card width
            scrub: 1, // Add smoothing (1 second delay) to the scrub effect
            anticipatePin: 1,
            invalidateOnRefresh: true // Recalculate on resize/refresh
        },
    });

    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        opacity: 0,
        x: -50,
        duration: 1
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        opacity: 0,
        x: 50,
        duration: 1
    });

    // Simple form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }

    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const toggleIcon = themeToggle.querySelector('i'); // Get the icon element

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Apply saved theme on initial load
    const currentTheme = localStorage.getItem('theme');
    // Default to dark theme if no preference is saved
    setTheme(currentTheme === 'light' ? 'light' : 'dark');

    // Add click listener to the toggle button
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

});
