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


     // PARTE 2: CÓDIGO DE PROTEÇÃO
    // Bloqueia o clique com o botão direito do mouse
    document.addEventListener('contextmenu', e => e.preventDefault());
    // Bloqueia atalhos comuns e a tecla F12
    document.onkeydown = function (e) {
        if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) {
            return false;
        }
        if (e.key === 'F12') {
            return false;
        }
    };
    // Bloqueia eventos de seleção e arrastar
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

});

    // Inicializa a biblioteca de animações ao rolar a página
    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Animação acontece apenas uma vez
        offset: 50,    // "Gatilho" da animação um pouco antes do elemento aparecer
    });

    // Inicializa o carrossel de depoimentos
    const swiper = new Swiper('.testimonials-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        
        // Navegação por paginação (bolinhas)
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // Autoplay para girar sozinho
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        
        // Adaptação para diferentes tamanhos de tela
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });

});