document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DAS FUNCIONALIDADES DO SITE ---

    // --- SMOOTH SCROLL SEM ALTERAR A URL (NOVA PARTE ADICIONADA) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializa a biblioteca de animações ao rolar a página
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Inicializa o carrossel de depoimentos
    const swiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });

    // Código do menu hambúrguer (mobile)
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNavToggle.querySelector('i').classList.remove('fa-times');
                mobileNavToggle.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // --- SCRIPT DE PROTEÇÃO DE CONTEÚDO (PC) ---
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.onkeydown = function (e) {
        if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) {
            return false;
        }
        if (e.key === 'F12') {
            return false;
        }
    };
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

});