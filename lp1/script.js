document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DAS FUNCIONALIDADES DO SITE ---

    // Inicializa a biblioteca de animações ao rolar a página
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- CÓDIGO CORRIGIDO DO CARROSSEL DE DEPOIMENTOS ---
    const swiper = new Swiper('.testimonials-slider', {
        // Configuração base (para celular)
        slidesPerView: 1, // <<< AQUI ESTÁ A CORREÇÃO PRINCIPAL
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
        
        // Breakpoints (para telas maiores)
        breakpoints: {
            // Quando a tela for 768px ou maior
            768: {
                slidesPerView: 2, // Mostra 2 slides
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

    // Bloqueia eventos de seleção e arrastar (reforço para alguns navegadores)
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());

});