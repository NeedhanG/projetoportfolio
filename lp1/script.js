document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navIcon = mobileNavToggle.querySelector('i');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        if (navLinks.classList.contains('nav-active')) {
            navIcon.classList.remove('fa-bars');
            navIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; 
        } else {
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Scroll-triggered Fade-in Animation ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    fadeElements.forEach(element => observer.observe(element));

    // --- Swiper.js Initialization for Testimonials ---
    const swiper = new Swiper('.testimonials-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        }
    });


    // --- SCRIPT DE PROTEÇÃO (NÃO RECOMENDADO) ---

    // Bloqueia o clique com o botão direito do mouse
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Bloqueia atalhos comuns e a tecla F12
    document.onkeydown = function (e) {
        // Bloqueia Ctrl + U (ver código-fonte), S (salvar), C (copiar), P (imprimir)
        if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) {
            return false;
        }

        // Bloqueia a tecla F12 para abrir o DevTools
        if (e.key === 'F12') {
            return false;
        }
    };

    // Bloqueia a seleção de texto e o ato de arrastar elementos
    // ATENÇÃO: Isso impede que os usuários copiem seu endereço ou telefone.
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

});