document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuContents = document.querySelectorAll('.menu-content');
    const reviews = document.querySelectorAll('.review-card');

    // --- 1. Scroll Effect ---
    // Adds a 'scrolled' class when scrolling past 50px [cite: 1, 2]
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Logic ---
    const toggleMenu = () => {
    // 1. Toggle the mobile menu overlay
    navLinksContainer.classList.toggle('nav-active');

    // 2. ONLY ON MOBILE: Toggle the 'scrolled' class when burger is clicked
    if (window.innerWidth <= 768) {
        if (navLinksContainer.classList.contains('nav-active')) {
            nav.classList.add('scrolled');
        } else {
            // Only remove it if the user is actually at the top of the page
            if (window.scrollY <= 50) {
                nav.classList.remove('scrolled');
            }
        }
    }

    // 3. Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // 4. Burger Icon Animation
    burger.classList.toggle('toggle');
};

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked [cite: 6]
    navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinksItems.forEach(item => item.style.animation = '');
        
        // Ensure background behaves correctly after clicking a link
        if (window.scrollY <= 50) {
            nav.classList.remove('scrolled');
        }
    });
});

    // --- 3. Menu Tabs Logic ---
    // Switches between categories like Food and Drinks [cite: 7, 8]
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
    // Cycles through reviews every 4 seconds [cite: 9, 12]
    if (reviews.length > 0) {
        let currentIndex = 0;
        reviews[0].classList.add('active'); // Show first review [cite: 10]

        const showNextReview = () => {
            reviews[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % reviews.length;
            reviews[currentIndex].classList.add('active');
        };

        setInterval(showNextReview, 4000);
    }
});