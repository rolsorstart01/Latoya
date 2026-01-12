document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');
    const reviews = document.querySelectorAll('.review-card');

    // --- 1. Page & Scroll Logic ---
    // Check if the current page is the Home Page
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/Latoya/'; // Adjust based on your folder structure

    // Initial State: If not home page, always show as scrolled
    const setInitialNavState = () => {
        if (!isHomePage) {
            nav.classList.add('scrolled');
        } else if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        }
    };

    setInitialNavState();

    // Handle Scrolling
    window.addEventListener('scroll', () => {
        if (isHomePage) {
            // On home page, toggle based on scroll position
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                // Only remove if the mobile menu isn't open
                if (!navLinksContainer.classList.contains('nav-active')) {
                    nav.classList.remove('scrolled');
                }
            }
        } else {
            // On other pages, keep it scrolled regardless
            nav.classList.add('scrolled');
        }
    });

    // --- 2. Mobile Menu Logic ---
    const toggleMenu = () => {
        // Toggle the mobile menu overlay
        navLinksContainer.classList.toggle('nav-active');

        // Animation for Links
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Icon Animation
        burger.classList.toggle('toggle');

        // Manage nav background when menu is open on Home Page
        if (isHomePage && window.scrollY <= 50) {
            if (navLinksContainer.classList.contains('nav-active')) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinksItems.forEach(item => item.style.animation = '');
            
            if (isHomePage && window.scrollY <= 50) {
                nav.classList.remove('scrolled');
            }
        });
    });

    // --- 3. Menu Tabs Logic ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.target);
            if (target) target.classList.add('active');
        });
    });

    // --- 4. Auto-Rotate Reviews Script ---
    if (reviews.length > 0) {
        let currentIndex = 0;
        reviews[0].classList.add('active'); 

        const showNextReview = () => {
            reviews[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % reviews.length;
            reviews[currentIndex].classList.add('active');
        };

        setInterval(showNextReview, 4000);
    }
});